/** @type {import('@docusaurus/types').DocusaurusConfig} */

const lernaConfig = require("../lerna.json");

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
    logo: {
      alt: "Portals Logo",
      src: "img/logo-light.png",
      srcDark: "img/logo-dark.png",
      href: "/docs/portals",
      height: 24,
      width: 84,
    },
    navbar: {
      items: [
        {
          type: "search",
          position: "left",
        },
      ],
    },
    sidebar: {
      productDropdown: {
        title: "Portals Docs",
        logo: {
          width: 20,
          height: 20,
          alt: "Portals Logo",
          src: "img/components/product-dropdown/logo.png",
        },
        textLinks: [
          {
            url: {
              href: "https://forum.ionicframework.com/c/portals/31",
              target: "_blank",
              rel: "noopener nofollow",
            },
            label: "Forum",
          },
        ],
        iconLinks: [
          {
            key: "github",
            url: {
              href: "https://github.com/ionic-team/ionic-portals",
              target: "_blank",
              rel: "noopener nofollow",
            },
          },
        ],
      },
      backButton: {
        url: {
          href: "/docs",
        },
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
    zoom: {
      selector: ".markdown em > img",
      background: {
        light: "var(--token-background-color)",
        dark: "var(--token-background-color)",
      },
      config: {
        margin: 75,
        scrollOffset: 20,
      },
    },
  },
  plugins: ["docusaurus-plugin-image-zoom"],
  presets: [
    [
      "@ionic-docs/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        pages: false,
        theme: {
          customCss: [require.resolve("./src/styles/custom.css")],
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
    rnMinVersion: lernaConfig.rnMinVersion,
    androidLiveUpdatesVersion: lernaConfig.androidLiveUpdatesVersion,
  },
};
