/** @type {import('@docusaurus/types').DocusaurusConfig} */

const lernaConfig = require('../lerna.json');

module.exports = {
  title: "Ionic Portals",
  tagline: "Portals tagline",
  url: "https://ionic.io",
  trailingSlash: false,
  baseUrl: "/docs/portals/",
  baseUrlIssueBanner: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "ionic-team",
  projectName: "portals-docs",
  titleDelimiter: "-",
  themeConfig: {
    navbar: {
      title: "Portals",
      logo: {
        alt: "Portals Logo",
        src: "img/logo.svg",
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    tagManager: {
      trackingID: "GTM-TKMGCBC",
    },
    prism: {
      theme: { plain: {}, styles: [] },
      additionalLanguages: [
        "shell-session",
        "kotlin",
        "groovy",
        "java",
        "swift",
        "ruby",
      ],
    },
  },
  plugins: [
    "@ionic-internal/docusaurus-plugin-tag-manager",
    "docusaurus-plugin-sass",
  ],
  themes: ["@ionic-internal/docusaurus-theme"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        pages: false,
        theme: {
          customCss: [
            "prismjs/themes/prism-tomorrow.css",
            require.resolve('./src/styles/custom.css'),
          ],
        },
      },
    ],
  ],
  customFields: {
    portalsVersion: lernaConfig.version,
    portalsVersionIos: lernaConfig.iosVersion,
    portalsVersionAndroid: lernaConfig.androidVersion,
    portalsVersionRN: lernaConfig.rnVersion,
    capacitorVersion: lernaConfig.capacitorVersion,
    iosMinVersion: lernaConfig.iosMinVersion,
    androidMinSdk: lernaConfig.androidMinSdk,
    rnMinVersion: lernaConfig.rnMinVersion
  }
};
