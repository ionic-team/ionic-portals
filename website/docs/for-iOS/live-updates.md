---
title: Adding Live Updates
sidebar_label: Adding Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN } from '@site/src/util';

Getting started with Live Updates in your Portals app.

## Appflow

Create an app for your Portal in the [Ionic Dashboard](https://dashboard.ionicframework.com). For more information, see our documentation on [using Appflow](https://ionic.io/docs/appflow/quickstart/connect).

:::info
Take note of the **appId** of your app in Appflow, this will be used by the Live Updates sdk.
:::

To test Live Updates, create a new build of your app in Appflow and create a deployment to Live Updates from that build. Take note of the **channel** name as this is also used in the Live Updates sdk.

![Deployments](https://i.imgur.com/73detdm.png)

Deployments in Appflow will be downloaded as new Live Updates.

## Configure

After installing the dependency you need to configure Live Updates as part of the Portal creation process. Add a LiveUpdate config where your Portal is created. Provide the **appId** that corresponds with the app in Appflow, and the **channel** name to subscribe to for updates.

```swift {17,21-29} title=AppDelegate.swift
import UIKit
import IonicPortals

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions
  launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    PortalsRegistrationManager.shared.register(key: "YOUR_PORTALS_KEY")
    return true
  }
}

extension Portal {
  static let featuredProducts = Portal(
    name: "featured_products",
    liveUpdateConfig: .webapp
  )
}

extension LiveUpdate {
  private static let activeChannel = "production"

  static let webapp = Self(
    appId: "11a0971f",
    channel: activeChannel,
    syncOnAdd: false
  )
}
```

By default, when the app loads for the first time and the portal is created, a sync will occur. A sync operation checks the Appflow servers for a new version of the app. If a new version is available, the app files are downloaded to the device and setup with the Portal. The next time the Portal is loaded, the new version will load automatically.
