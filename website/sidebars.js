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
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/guide",
        "getting-started/iOS",
        "getting-started/android",
      ],
    },
    {
      type: "category",
      label: "How To",
      collapsed: false,
      items: [
        "how-to/pull-in-web-bundle",
        "how-to/using-the-portals-plugin",
        "how-to/using-a-capacitor-plugin",
        "how-to/define-api-in-typescript",
        "how-to/multiple-portals-single-web-app",
        "how-to/multiple-portals-multiple-web-apps",
        "how-to/get-a-product-key",
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
            "reference/iOS/portal",
            "reference/iOS/portal-builder",
            "reference/iOS/portal-manager",
            "reference/iOS/portal-webview",
            "reference/iOS/portals-plugin",
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
      label: "Examples",
      collapsed: true,
      items: ["examples/ecommerce-app"],
    },
    "plugin-overview",
  ],
};
