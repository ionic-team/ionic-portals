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
    "portal-communication",
    "choosing-a-communication",
    "live-updates",
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/guide",
        "getting-started/iOS",
        "getting-started/android",
        "getting-started/live-updates",
      ],
    },
    {
      type: "category",
      label: "How To",
      collapsed: false,
      items: [
        "how-to/get-a-product-key",
        "how-to/pull-in-web-bundle",
        "how-to/using-the-portals-plugin",
        "how-to/using-a-capacitor-plugin",
        "how-to/define-api-in-typescript",
        "how-to/multiple-portals-single-web-app",
        "how-to/multiple-portals-multiple-web-apps",
        "how-to/advanced-configuration",
        "how-to/sync-with-live-updates",
        "how-to/reloading-with-live-updates",
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsed: true,
      items: [
        "tutorials/auth-token-example",
        "tutorials/monorepo-example",
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "iOS API",
          collapsed: true,
          items: [
            "reference/iOS/portals-registration-manager",
            "reference/iOS/portal",
            "reference/iOS/portal-uiview",
            "reference/iOS/portal-view",
            "reference/iOS/portals-pubsub",
            "reference/iOS/portals-publisher"
          ],
        },
        {
          type: "category",
          label: "Android API",
          collapsed: true,
          items: [
            "reference/android/portal",
            "reference/android/portal-builder",
            "reference/android/portal-fragment",
            "reference/android/portal-manager",
            "reference/android/portal-view",
            "reference/android/portal-method",
            "reference/android/portals-plugin",
          ],
        },
        {
          type: "category",
          label: "Web API",
          collapsed: true,
          items: [
            "reference/web/portals-plugin"
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Reference - Live Updates",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "iOS API",
          collapsed: true,
          items: [
            "reference-live-updates/iOS/live-update-manager",
            "reference-live-updates/iOS/live-update",
            "reference-live-updates/iOS/i-sync-callback",
            "reference-live-updates/iOS/i-check-callback",
            "reference-live-updates/iOS/i-download-callback",
            "reference-live-updates/iOS/i-extract-callback",
            {
              type: "category",
              label: "iOS Data Classes",
              collapsed: true,
              items: [
                "reference-live-updates/iOS/data-classes/channel",
                "reference-live-updates/iOS/data-classes/details",
                "reference-live-updates/iOS/data-classes/error",
                "reference-live-updates/iOS/data-classes/ion-data",
                "reference-live-updates/iOS/data-classes/ion-webapp",
                "reference-live-updates/iOS/data-classes/meta",
                "reference-live-updates/iOS/data-classes/snapshot",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Android API",
          collapsed: true,
          items: [
            "reference-live-updates/android/live-update-manager",
            "reference-live-updates/android/live-update",
            "reference-live-updates/android/sync-callback",
            "reference-live-updates/android/check-callback",
            "reference-live-updates/android/download-callback",
            "reference-live-updates/android/extract-callback",
            "reference-live-updates/android/check-response",
            "reference-live-updates/android/download-response",
            "reference-live-updates/android/error-response",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Examples",
      collapsed: true,
      items: [
        "examples/ecommerce-app",
        "examples/ecommerce-app-live-updates",
      ],
    },
    "plugin-overview",
  ],
};
