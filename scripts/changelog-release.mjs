/**
 * @typedef {import("./definitions").Release} Release
 * @typedef {import("./definitions").GithubRelease} GithubRelease
 * */
import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { URL, fileURLToPath } from "url";

import semver from "semver";
import fetch from "node-fetch";
import { unified } from "unified";
import markdown from "remark-parse";
import html from "remark-html";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_PATH = resolve(
  __dirname,
  "../website/src/components/page/changelog/release-notes.json"
);
const processor = unified().use(markdown).use(html);
const repos = [
  {
    repo: "ionic-team/ionic-portals",
    outputFile: "../website/src/components/page/changelog/web.json",
  },
  {
    repo: "ionic-team/ionic-portals-ios",
    outputFile: "../website/src/components/page/changelog/ios.json",
  },
  {
    repo: "ionic-team/ionic-portals-android",
    outputFile: "../website/src/components/page/changelog/android.json",
  },
  {
    repo: "ionic-team/ionic-portals-react-native",
    outputFile: "../website/src/components/page/changelog/react-native.json",
  },
];

/**
 *
 * @param {GithubRelease[]} releases
 * @returns {Release[]}
 */
const formatReleases = (releases) => {
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
        const mdBody = cleanup(release.body);
        const body = String(processor.processSync(mdBody));
        const published_at = formatDate(release.published_at);
        const version = semver.clean(release.tag_name);
        const [, repo] = /.*\/repos\/(.*)\/releases\/.*/.exec(release.url);

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
          repo,
          body,
          name,
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
};

/**
 *
 * @param {string} markdown
 */
function cleanup(markdown) {
  return (
    markdown
      // Change to smaller header
      .replace(/^## What's Changed/, "### What's Changed")
      .replace(/^## New Contributors/, "### New Contributors")
      // bold the change type at the beginning of a commit
      .replace(/\* (.\S+):/g, (_, type) => `* **${type}**:`)
      // remove the contributor from the commit line
      .replace(/ by \@(\S+) in /g, "")
      // change the url to be a link
      .replace(
        /https:\/\/github.com\/ionic-team\/.*\/pull\/(.\d+)/g,
        (link, commitTag) => {
          return ` ([#${commitTag}](${link}))`;
        }
      )
      .replace(/\*\*Full Changelog\*\*\: (.\S+)/g, "")
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
 * @return {Promise<any[]>}
 */
const fetchGithubReleases = async (repoPath) => {
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
};

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
  await Promise.all(
    repos.map(async ({ repo, outputFile }) => {
      const githubReleaseArray = await fetchGithubReleases(repo);
      await fs.writeFile(
        outputFile,
        JSON.stringify(formatReleases(githubReleaseArray), null, 2)
      );
    })
  );
}

run();
