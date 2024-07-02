---
title: How to Use a Web App in a Portal
sidebar_label: Use a Web App in a Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to use web applications in your native applications, you'll need to properly setup your project to be able to include a web bundle.

## Setup the Web Asset Directory

Follow the [Android instructions](../../for-android/how-to/pull-in-web-bundle.md) and [iOS instructions](../../for-ios/how-to/pull-in-web-bundle.md) in your native applications. You should make the start directories the same between both platforms to avoid issues rendering a Portal.

```javascript
const help = {
  name: "myPortalWebApp",
};
// or...using a different portalId and starting directory
const help = {
  name: "help",
  startDir: "myPortalWebApp",
};
```

## Automating the Process

Once you have your web code and native code linked up, you will need a process to continually copy in new versions of the web application into your mobile projects.

We recommend having some type of automation set up so the mobile developer doesn't have to manually copy over the web code every time there is a new change. We have a few guides for ideas to do so in a [monorepo](../tutorials/monorepo-example.md) or [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
