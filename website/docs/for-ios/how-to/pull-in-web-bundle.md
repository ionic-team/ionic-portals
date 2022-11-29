---
title: How to Use a Web App in a Portal
sidebar_label: Use a Web App in a Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to use web applications in your native applications, you'll need to properly setup your project to be able to include a web bundle.

## Setup the Web Asset Directory

Your web application needs to be copied into your native application. On iOS, put your web assets in a directory at the same level that contains your main source and the `info.plist` file:

![iOS Web Asset Directory](/img/how-to/ios-web-asset-folder.png)

:::info
You must ensure that you add your web application root folder as a folder reference and not as a group in Xcode. Otherwise, your directory structure will be ignored and the Portal will not render. If you have completed this step successfully, the folder icon in Xcode will be **blue**.

![iOS Add folder as reference](/img/how-to/ios-create-folder-references.png)
:::

```swift
let portal = Portal(name: "myPortalWebApp")
// or...using a different portalId and starting directory
let helpPortal = Portal(name: "help", startDir: "myPortalWebApp")
```

## Automating the Process

Once you have your web code and native code linked up, you will need a process to continually copy in new versions of the web application into your mobile projects.

We recommend having some type of automation set up so the mobile developer doesn't have to manually copy over the web code every time there is a new change. We have a few guides for ideas to do so in a [monorepo](../tutorials/monorepo-example) or [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
