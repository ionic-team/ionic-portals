---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Signup

## Install

Ionic Portals is publicly available on both Maven Central and Cocoapods. To add it to your project, you just need to add the following line to your `Podfile` on iOS or your app level `build.gradle` file for Android.

<Tabs
defaultValue="ios"
values={[
{ label: 'iOS', value: 'ios', },
{ label: 'Android', value: 'android', },
]}>
<TabItem value="ios">

```ruby title=Podfile
pod 'IonicPortals', '~> 0.2.0'
```

</TabItem>
<TabItem value="android">

```java title=build.gradle
implementation 'io.ionic:portals:0.2.0'
```

</TabItem>
</Tabs>

## Configure

After installing the depenency you need to register your copy of Ionic Portals at runtime. This will work both offline and in production. You'll need to call [PortalManager.register(myApiKey)](../reference/android/portal-manager#register) before creating any Portals in your app. Below is a simple example of how to bootstrap Ionic Portals before loading any Portal instances in your app. To get an API Key, refer to the [Sign Up](#signup) section.

<Tabs
defaultValue="ios"
values={[
{ label: 'iOS', value: 'ios', },
{ label: 'Android', value: 'android', },
]}>
<TabItem value="ios">

```swift title=AppDelegate.swift
import SwiftUI
import IonicPortals

@main
class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        PortalManager.register("MY_API_KEY")
        // setup portals...
        return true
    }
}
```

</TabItem>
<TabItem value="android">

```kotlin title=MyApplication.kt
import android.app.Application
import io.ionic.portals.PortalManager

class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")
        // setup portals...
    }}
}
```

</TabItem>
</Tabs>
