/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
module.exports = {
  sidebar: [
    "overview",
    "what-is-a-portal",
    "what-are-live-updates",
    "getting-started",
    "choosing-a-communication",
    {
      type: "category",
      label: "iOS",
      collapsed: true,
      items: [
        "for-ios/quick-start",
        "for-ios/live-updates",
        "for-ios/getting-started",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-ios/how-to/pull-in-web-bundle",
            "for-ios/how-to/using-the-portals-plugin",
            "for-ios/how-to/using-a-capacitor-plugin",
            "for-ios/how-to/define-api-in-typescript",
            "for-ios/how-to/multiple-portals-single-web-app",
            "for-ios/how-to/multiple-portals-multiple-web-apps",
            "for-ios/how-to/use-portals-in-an-ios-library",
            "for-ios/how-to/advanced-configuration",
            "for-ios/how-to/sync-with-live-updates",
            "for-ios/how-to/reloading-with-live-updates",
          ],
        },
        {
          type: "category",
          label: "Tutorials",
          collapsed: true,
          items: [
            "for-ios/tutorials/auth-token-example",
            "for-ios/tutorials/monorepo-example",
          ],
        },
        {
          type: "category",
          label: "Examples",
          collapsed: true,
          items: [
            "for-ios/examples/ecommerce-app",
            "for-ios/examples/ecommerce-app-live-updates",
          ],
        },
        {
          type: "category",
          label: "Reference",
          collapsed: true,
          items: [
            {
              type: "link",
              label: "API", // The link label
              href: "https://ionic-portals-ios.vercel.app/documentation/ionicportals", // The external URL
            },
            {
              type: "link",
              label: "LiveUpdates API", // The link label
              href: "https://live-updates-sdk-ios.vercel.app/documentation/ionicliveupdates", // The external URL,
            },
          ],
        },
        "for-ios/upgrade-guides",
        "for-ios/known-issues",
      ],
    },
    {
      type: "category",
      label: "Android",
      collapsed: true,
      items: [
        "for-android/getting-started",
        "for-android/guide",
        "for-android/live-updates",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-android/how-to/pull-in-web-bundle",
            "for-android/how-to/using-the-portals-plugin",
            "for-android/how-to/using-a-capacitor-plugin",
            "for-android/how-to/define-api-in-typescript",
            "for-android/how-to/multiple-portals-single-web-app",
            "for-android/how-to/multiple-portals-multiple-web-apps",
            "for-android/how-to/use-portals-in-an-android-library",
            "for-android/how-to/advanced-configuration",
            "for-android/how-to/sync-with-live-updates",
            "for-android/how-to/reloading-with-live-updates",
          ],
        },
        {
          type: "category",
          label: "Tutorials",
          collapsed: true,
          items: [
            "for-android/tutorials/auth-token-example",
            "for-android/tutorials/monorepo-example",
          ],
        },
        {
          type: "category",
          label: "Examples",
          collapsed: true,
          items: [
            "for-android/examples/ecommerce-app",
            "for-android/examples/ecommerce-app-live-updates",
          ],
        },
        {
          type: "category",
          label: "Reference",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "API",
              collapsed: true,
              items: [
                "for-android/reference/api/portal",
                "for-android/reference/api/portal-builder",
                "for-android/reference/api/portal-fragment",
                "for-android/reference/api/portal-manager",
                "for-android/reference/api/portal-view",
                "for-android/reference/api/portal-method",
                "for-android/reference/api/portals-plugin",
              ],
            },
            {
              type: "category",
              label: "Live Updates API",
              collapsed: true,
              items: [
                "for-android/reference/live-updates/live-update-manager",
                "for-android/reference/live-updates/live-update",
                "for-android/reference/live-updates/sync-callback",
                "for-android/reference/live-updates/check-callback",
                "for-android/reference/live-updates/download-callback",
                "for-android/reference/live-updates/extract-callback",
                "for-android/reference/live-updates/check-response",
                "for-android/reference/live-updates/download-response",
                "for-android/reference/live-updates/error-response",
              ],
            },
          ],
        },
        "for-android/upgrade-guides",
      ],
    },
    {
      type: "category",
      label: "React Native",
      collapsed: true,
      items: [
        "for-react-native/getting-started",
        "for-react-native/guide",
        "for-react-native/live-updates",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-react-native/how-to/pull-in-web-bundle",
            "for-react-native/how-to/using-the-portals-plugin",
            "for-react-native/how-to/using-a-capacitor-plugin",
            "for-react-native/how-to/define-api-in-typescript",
          ],
        },
        {
          type: "category",
          label: "Tutorials",
          collapsed: true,
          items: [
            "for-react-native/tutorials/auth-token-example",
            "for-react-native/tutorials/monorepo-example",
          ],
        },
        {
          type: "category",
          label: "Examples",
          collapsed: true,
          items: ["for-react-native/examples/ecommerce"],
        },
        {
          type: "category",
          label: "Reference",
          collapsed: true,
          items: [
            {
              type: "link",
              label: "API",
              href: "https://react-native-ionic-portals.vercel.app",
            },
          ],
        },
        "for-react-native/upgrade-guides",
        "for-react-native/known-issues",
      ],
    },
    "portals-plugin",
    {
      type: "category",
      label: "Portals for Capacitor",
      collapsed: true,
      items: [
        "for-capacitor/overview",
        "for-capacitor/module-federation",
        "for-capacitor/live-updates",
        "for-capacitor/reference",
        "for-capacitor/example",
      ],
    },
  ],
};
