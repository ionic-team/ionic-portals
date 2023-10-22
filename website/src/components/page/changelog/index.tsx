import clsx from "clsx";
import React from "react";
import web from "./web.json";
import ios from "./ios.json";
import android from "./android.json";
import reactNative from "./react-native.json";

import styles from "./styles.module.css";

const platforms = {
  web: {
    name: "Portals Web Plugin",
    repo: "ionic-team/ionic-portals",
    releases: web as Release[],
  },
  ios: {
    name: "Portals for iOS",
    repo: "ionic-team/ionic-portals-ios",
    releases: ios,
  },
  android: {
    name: "Portals for Android",
    repo: "ionic-team/ionic-portals-android",
    releases: android,
  },
  "react-native": {
    name: "Portals for React Native",
    repo: "ionic-team/ionic-portals-react-native",
    releases: reactNative,
  },
};

interface Release {
  body: string;
  name: string;
  published_at: string;
  tag_name: string;
  type: string;
  version: string;
}

export default function ReleaseNotes(props: {
  platform: keyof typeof platforms;
}) {
  let repo = platforms[props.platform].repo || "";
  let name = platforms[props.platform].name || "";
  let releases = platforms[props.platform].releases || [];

  if (releases.length === 0) {
    console.warn(`Could not load release notes data. Make sure that you have a valid GITHUB_TOKEN.

Create a personal access token by following the below guide:
https://docs.github.com/en/enterprise-cloud@latest/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

and then authorize it to work with SSO:
https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on`);

    return [
      <p>
        Unable to load Releases. Please see all releases{" "}
        <a href={`https://github.com/${repo}/releases`} target="_blank">
          on GitHub
        </a>
        .
      </p>,
    ];
  }

  return (
    <article>
      <p className={styles.intro}>
        A complete release history for {name} is available{" "}
        <a href={`https://github.com/${repo}/releases`} target="_blank">
          on GitHub
        </a>
        . Documentation for recent releases can also be found below.
      </p>

      <div className={styles["release-notes"]}>
        {releases.map((release: Release, index) => (
          <section
            className={clsx(
              styles["release-note"],
              styles[`release-note-${release.type}`]
            )}
          >
            <div className={styles["release-info"]}>
              <div className={styles["release-header"]}>
                <a
                  className={styles["header-link"]}
                  href={`#release-${release.version}`}
                >
                  <h2 id={`release-${release.version}`}>
                    <span className={styles["release-version"]}>
                      {release.version}
                    </span>
                  </h2>
                </a>
                <span className={styles["release-badge"]}>{release.type}</span>
                {index === 0 ? (
                  <span
                    className={clsx(
                      styles["release-badge"],
                      styles["release-badge-latest"]
                    )}
                  >
                    Latest Production Version
                  </span>
                ) : null}
              </div>
              <div className={styles["release-published"]}>
                <h3>{release.published_at}</h3>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: release.body,
                }}
              ></div>
            </div>
          </section>
        ))}
      </div>
      <blockquote>
        To see more releases, visit{" "}
        <a href={`https://github.com/${repo}/releases/`} target="_blank">
          GitHub
        </a>
        .
      </blockquote>
    </article>
  );
}
