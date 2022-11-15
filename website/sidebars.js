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
    "live-updates",
    {
      type: "category",
      label: "iOS",
      collapsed: true,
      items: [
        "for-iOS/what-is-a-portal",
        "for-iOS/choosing-a-communication",
        "for-iOS/all-in-one",
        "for-iOS/getting-started",
        "for-iOS/live-updates-getting-started",
        "for-iOS/guide",
        "for-iOS/known-issues",
        "for-iOS/live-updates",
        "for-iOS/plugin-overview",
        "for-iOS/upgrade-guides",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-iOS/how-to/advanced-configuration",
            "for-iOS/how-to/define-api-in-typescript",
            "for-iOS/how-to/get-a-product-key",
            "for-iOS/how-to/multiple-portals-multiple-web-apps",
            "for-iOS/how-to/multiple-portals-single-web-app",
            "for-iOS/how-to/pull-in-web-bundle",
            "for-iOS/how-to/reloading-with-live-updates",
            "for-iOS/how-to/sync-with-live-updates",
            "for-iOS/how-to/use-portals-in-an-ios-library",
            "for-iOS/how-to/using-a-capacitor-plugin",
            "for-iOS/how-to/using-the-portals-plugin",
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
            "for-iOS/examples/ecommerce-app",
            "for-iOS/examples/ecommerce-app-live-updates",
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
      ],
    },
    {
      type: "category",
      label: "Android",
      collapsed: true,
      items: [
        "for-android/getting-started",
        "for-android/live-updates-getting-started",
        "for-android/what-is-a-portal",
        "for-android/choosing-a-communication",
        "for-android/guide",
        "for-android/known-issues",
        "for-android/live-updates",
        "for-android/plugin-overview",
        "for-android/upgrade-guides",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-android/how-to/advanced-configuration",
            "for-android/how-to/define-api-in-typescript",
            "for-android/how-to/get-a-product-key",
            "for-android/how-to/multiple-portals-multiple-web-apps",
            "for-android/how-to/multiple-portals-single-web-app",
            "for-android/how-to/pull-in-web-bundle",
            "for-android/how-to/reloading-with-live-updates",
            "for-android/how-to/sync-with-live-updates",
            "for-android/how-to/using-a-capacitor-plugin",
            "for-android/how-to/using-the-portals-plugin",
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
      ],
    },
    {
      type: "category",
      label: "React Native",
      collapsed: true,
      items: [
        "for-react-native/getting-started",
        "for-react-native/live-updates-getting-started",
        "for-react-native/what-is-a-portal",
        "for-react-native/choosing-a-communication",
        "for-react-native/guide",
        "for-react-native/known-issues",
        "for-react-native/live-updates",
        "for-react-native/plugin-overview",
        "for-react-native/upgrade-guides",
        {
          type: "category",
          label: "How To",
          collapsed: true,
          items: [
            "for-react-native/how-to/advanced-configuration",
            "for-react-native/how-to/define-api-in-typescript",
            "for-react-native/how-to/get-a-product-key",
            "for-react-native/how-to/multiple-portals-multiple-web-apps",
            "for-react-native/how-to/multiple-portals-single-web-app",
            "for-react-native/how-to/pull-in-web-bundle",
            "for-react-native/how-to/reloading-with-live-updates",
            "for-react-native/how-to/sync-with-live-updates",
            "for-react-native/how-to/use-portals-in-an-ios-library",
            "for-react-native/how-to/using-a-capacitor-plugin",
            "for-react-native/how-to/using-the-portals-plugin",
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
      ],
    },
    {
      type: "category",
      label: "Capacitor",
      collapsed: true,
      items: [
        "for-capacitor/overview",
        "for-capacitor/example",
        "for-capacitor/live-updates",
        "for-capacitor/module-federation",
        "for-capacitor/reference",
      ],
    },
  ],
};
