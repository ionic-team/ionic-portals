---
title: Getting Started with Live Updates
sidebar_label: Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN } from '@site/src/util';

Getting started with Live Updates in your Portals app.

:::info
To use the Live Updates SDK with Ionic Portals, check out the [Getting Started Guide](./guide) for Ionic Portals first.
:::

## Appflow

Create an app for your Portal in the [Ionic Dashboard](https://dashboard.ionicframework.com). For more information, see our documentation on [using Appflow](https://ionic.io/docs/appflow/quickstart/connect).

:::info
Take note of the **appId** of your app in Appflow, this will be used by the Live Updates sdk.
:::

To test Live Updates, create a new build of your app in Appflow and create a deployment to Live Updates from that build. Take note of the **channel** name as this is also used in the Live Updates sdk.

![Deployments](https://i.imgur.com/73detdm.png)

Deployments in Appflow will be downloaded as new Live Updates.

## Install

The Live Updates SDK is publicly available via Maven Central, Cocoapods, and SPM.

To add Live Updates to your Portals Android project, add the dependency to your `build.gradle` file

<CodeBlock className="language-groovy" title="build.gradle">
{
`
// ----------------------------------------------
//  Module-level build.gradle
// ----------------------------------------------
dependencies {
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
    implementation 'io.ionic:liveupdates:0.1.1'
}`.trim()
}
</CodeBlock>

And in the top level `build.gradle` file, be sure that you include `jcenter` and `maven` in your repositories section

```groovy title=build.gradle
// ----------------------------------------------
//  Top-level build.gradle
// ----------------------------------------------
allprojects {
    repositories {
        google()

        // Make sure JCenter and Maven Central are
        // in your project repositories
        jcenter()
        mavenCentral()
    }
}
```

## Configure

After installing the dependency you need to configure Live Updates as part of the Portal creation process. Add a LiveUpdate config where your Portal is created. Provide the **appId** that corresponds with the app in Appflow, and the **channel** name to subscribe to for updates.

```kotlin title=MyApplication.kt
import android.app.Application
import io.ionic.portals.PortalManager

class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")

        // setup portals (example)
        PortalManager.newPortal("portal1")
            .setLiveUpdateConfig(applicationContext, LiveUpdate("ebd6138b", "production"))
            .create()
    }}
}
```

By default, when the app loads for the first time and the portal is created, a sync will occur. A sync operation checks the Appflow servers for a new version of the app. If a new version is available, the app files are downloaded to the device and setup with the Portal. The next time the Portal is loaded, the new version will load automatically.
