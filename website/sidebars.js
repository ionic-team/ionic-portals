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
      items: ["ios-overview", "ios-tutorials", "ios-api-reference"],
    },
    {
      type: "category",
      label: "Android",
      collapsed: false,
      items: [
        "android-overview",
        "android-tutorials",
        "android-api-reference"
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
