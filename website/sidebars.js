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
    {
      type: "category",
      label: "Overview",
      collapsed: true,
      items: [
        "overview/overview",
        "overview/what-is-a-portal", 
        "overview/what-is-a-portal-plugin",
        "overview/portals-pubsub-vs-plugin",
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Registration Guide",
          collapsed: true,
          items: [
            "getting-started/guide/signup",
            "getting-started/guide/install", 
            "getting-started/guide/configure",
          ],
        },
        "getting-started/iOS", 
        "getting-started/android",
      ],
    },
    {
      type: "category",
      label: "Examples",
      collapsed: true,
      items: [
        "examples/ecommerce-app"
      ],
    },
    {
      type: "category",
      label: "How To",
      collapsed: true,
      items: [
        "how-to/multiple-portals-single-web-app",
        "how-to/multiple-portals-multiple-web-apps",
        "how-to/using-the-portal-plugin",
        "how-to/using-a-capacitor-plugin",
        "how-to/pull-in-web-bundle",
        "how-to/define-api-in-typescript",
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsed: true,
      items: [
        {
          type: "category",
          label: "iOS",
          collapsed: true,
          items: [
            "tutorials/iOS/create-view-via-view-controller",
          ],
        },
        {
          type: "category",
          label: "Android",
          collapsed: true,
          items: [
            "tutorials/android/create-view-via-xml",
          ],
        },
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
          label: "iOS",
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
          label: "Android",
          collapsed: true,
          items: [
            "reference/android/portal",
            "reference/android/portal-builder",
            "reference/android/portal-fragment",
            "reference/android/portal-manager",
            "reference/android/portal-view",
            "reference/android/portal-listener",
            "reference/android/portal-method",
            "reference/android/portals-plugin",
          ],
        },
        {
          type: "category",
          label: "Web",
          collapsed: true,
          items: [
            "reference/web/todo",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Plugins",
      collapsed: true,
      items: ["overview"],
    },
  ],
};
