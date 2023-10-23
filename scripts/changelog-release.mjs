/**
 * @typedef {import("./definitions").GithubRelease} GithubRelease
 * @typedef {import("./definitions").Release} Release
 * */
import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { URL, fileURLToPath } from "url";

import semver from "semver";
import fetch from "node-fetch";
import { unified } from "unified";
import markdown from "remark-parse";
import html from "remark-html";
import { postUpdatesToSlack } from "./send-to-slack.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERSION_FILE = resolve(__dirname, "../lerna.json");

const repos = [
  {
    productTitle: "Portals Web Plugin",
    repo: "ionic-team/ionic-portals",
    outputFile: "../website/src/components/page/changelog/web.json",
    pageUrl: "https://ionic.io/docs/portals/for-web/changelog",
    versionFileKey: "version",
  },
  {
    productTitle: "Portals iOS",
    repo: "ionic-team/ionic-portals-ios",
    outputFile: "../website/src/components/page/changelog/ios.json",
    pageUrl: "https://ionic.io/docs/portals/for-ios/changelog",
    versionFileKey: "iosVersion",
  },
  {
    productTitle: "Portals Android",
    repo: "ionic-team/ionic-portals-android",
    outputFile: "../website/src/components/page/changelog/android.json",
    pageUrl: "https://ionic.io/docs/portals/for-android/changelog",
    versionFileKey: "androidVersion",
  },
  {
    productTitle: "Portals React Native",
    repo: "ionic-team/ionic-portals-react-native",
    outputFile: "../website/src/components/page/changelog/react-native.json",
    pageUrl: "https://ionic.io/docs/portals/for-react-native/changelog",
    versionFileKey: "rnVersion",
  },
];

const processor = unified().use(markdown).use(html);

/**
 *
 * @param {GithubRelease[]} releases
 * @returns {Release[]}
 */
function formatReleases(releases, repo, productTitle, pageUrl) {
  let previousRelease = {
    repo: "",
    version: "0.0.0",
  };

  return (
    releases
      .filter((release) => {
        // All non-prerelease, non-alpha, non-beta, non-rc release
        return semver.prerelease(release.tag_name) == null;
      })
      .filter((release) => {
        // Remove all releases of Portals before 0.7.0 in the ionic-portals repo because
        // at that point we started seperating the releases into seperate repos.
        if (release.url.includes("/ionic-team/ionic-portals-ios/")) {
          return semver.lt("0.5.1", release.tag_name);
        } else if (release.url.includes("/ionic-team/ionic-portals/")) {
          return semver.lt("0.7.0", release.tag_name);
        }
        return true;
      })
      // Reverse the list so that the versions are in chronological order
      .reverse()
      .map((release) => {
        const mdBody = cleanupMarkdown(release.body);
        const body = String(processor.processSync(mdBody));
        const published_at = formatDate(release.published_at);
        const version = semver.clean(release.tag_name);

        // if list has iterated onto a new repository set go back to a zero version
        if (previousRelease.repo !== repo) {
          previousRelease.version = "0.0.0";
        }
        const type = semver.diff(previousRelease.version, release.tag_name);
        const { name, tag_name } = release;

        previousRelease = {
          repo,
          version,
        };

        return {
          productTitle,
          pageUrl,
          repo,
          mdBody,
          body,
          name,
          raw_published_at: release.published_at,
          published_at,
          tag_name,
          type,
          version,
        };
      })
      .sort((a, b) => {
        return -semver.compare(a.tag_name, b.tag_name);
      })
  );
}

/**
 *
 * @param {string} markdown
 */
function cleanupMarkdown(markdown) {
  return (
    markdown
      .replace(/(?:\r\n)+/g, "\n")
      // Change to smaller header
      .replace(/## What's Changed\n/g, "### What's Changed\n")
      // Remove the New Contributors line header
      .replace(/## New Contributors\n(.*)/g, "")
      // Remove new contributor lines
      // bold the change type at the beginning of a commit
      .replace(/\* (\S+):/g, (_, type) => `* **${type}**:`)
      // remove the contributor from the commit line
      .replace(/ by \@(\S+) in /g, "")
      // change the url to be a link
      .replace(
        /https:\/\/github.com\/ionic-team\/.*\/pull\/(\d+)/g,
        (link, commitTag) => {
          return ` ([#${commitTag}](${link}))`;
        }
      )
      .replace(/\*\*Full Changelog\*\*\: (\S+)/g, "")
  );
}

/**
 * Get the GitHub Releases from Ionic
 * -------------------------------------------------------------------------------
 * This requires an environment GITHUB_TOKEN otherwise it may fail
 *
 * To add a GITHUB_TOKEN, follow the steps to create a personal access token:
 * https://docs.github.com/en/enterprise-cloud@latest/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
 * and then authorize it to work with SSO:
 * https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on
 *
 * @param {string} repoPath
 * @return {Promise<GithubRelease[]>}
 */
async function fetchGithubReleases(repoPath) {
  try {
    const request = await fetch(
      new URL(`repos/${repoPath}/releases`, "https://api.github.com"),
      {
        headers: {
          Authorization:
            process.env.GITHUB_TOKEN !== undefined
              ? `token ${process.env.GITHUB_TOKEN}`
              : "",
        },
      }
    );
    const releases = await request.json();

    // Check that the response is an array in case it was
    // successful but returned an object
    if (!Array.isArray(releases)) {
      console.error("There was an issue getting releases:", releases);
      return [];
    }

    return releases;
  } catch (error) {
    return [];
  }
}

// Takes the date in format 2019-04-26T18:24:09Z
// and returns it as April 26 2019
/**
 * @param {string} datetime
 * @return {string}
 */
function formatDate(datetime) {
  const date = new Date(datetime);
  return (
    date.toLocaleString("en-us", { month: "long" }) +
    " " +
    date.getDate() +
    " " +
    date.getFullYear()
  );
}

async function run() {
  // Grab the current contents of the rollup version file so that we can modify it
  // during the repo iteration
  let rollupVersionContents = JSON.parse(await fs.readFile(VERSION_FILE));
  let slackUpdateList = [];

  await Promise.all(
    repos.map(
      async ({ repo, outputFile, versionFileKey, productTitle, pageUrl }) => {
        // Keep a list of the previous release JSON for comparison
        const previousDocReleaseArray = JSON.parse(
          await fs.readFile(outputFile)
        );

        const githubReleaseArray = await fetchGithubReleases(repo);
        const docReleaseArray = formatReleases(
          githubReleaseArray,
          repo,
          productTitle,
          pageUrl
        );
        await fs.writeFile(
          outputFile,
          JSON.stringify(docReleaseArray, null, 2)
        );

        // Set new version into the rollup version contents object
        rollupVersionContents[versionFileKey] = docReleaseArray[0].version;

        // Find all release updates that are new by comparing to the previous release JSON
        slackUpdateList = [
          ...slackUpdateList,
          ...docReleaseArray.filter(({ version }) => {
            return previousDocReleaseArray.find(({ prevVersion }) => {
              return version === prevVersion;
            });
          }),
        ];
      }
    )
  );

  await fs.writeFile(
    VERSION_FILE,
    JSON.stringify(rollupVersionContents, null, 2)
  );

  if (slackUpdateList.length > 0) {
    await postUpdatesToSlack(slackUpdateList);
  }
}

run();
