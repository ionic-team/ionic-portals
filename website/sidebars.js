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
      label: "Getting Started",
      collapsed: false,
      items: ["overview", "install"],
    },
    {
      type: "category",
      label: "iOS",
      collapsed: false,
      items: [
        "ios-overview",
        "ios-tutorials",
        {
          type: "category",
          label: "API Reference",
          collapsed: true,
          items: [
            "ios/api-reference/portal",
            "ios/api-reference/portal-builder",
          ],
        }
      ],
    },
    {
      type: "category",
      label: "Android",
      collapsed: false,
      items: [
        "android-overview",
        {
          type: "category",
          label: "Tutorials",
          collapsed: true,
          items: [
            "android/tutorials/create-view-via-xml",
          ],
        },
        {
          type: "category",
          label: "API Reference",
          collapsed: true,
          items: [
            "android/api-reference/portal",
            "android/api-reference/portal-builder",
            "android/api-reference/portal-fragment",
            "android/api-reference/portal-manager",
            "android/api-reference/portal-view",
            "android/api-reference/portal-listener",
            "android/api-reference/portal-method",
            "android/api-reference/portals-plugin",
          ],
        }
      ],
    },
    {
      type: "category",
      label: "Plugins",
      collapsed: false,
      items: ["overview"],
    },
  ],
};
