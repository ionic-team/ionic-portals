---
title: Using a Live Update Provider
sidebar_label: Live Update Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Portal's live update source isn't limited to Ionic Appflow. A **Live Update Provider** lets a Portal instead sync its web assets from any external update service, by wiring up an implementation of that service's `ProviderManager` protocol.

:::note
This is for teams who want to sync Portal web assets from their own update infrastructure instead of Appflow. If you're using Appflow, see [Adding Live Updates](./live-updates.md) instead.
:::

## Install

Add the `live-update-provider-sdk` package, which defines the `ProviderManager`/`ProviderSyncResult` contracts a provider implements:

<Tabs
defaultValue="spm"
values={[
{ label: 'Swift Package Manager', value: 'spm', },
{ label: 'CocoaPods', value: 'cocoapods', },
]}>
<TabItem value="spm">

```swift title=Package.swift
.package(url: "https://github.com/ionic-team/live-update-provider-sdk", from: "1.0.0")
```

</TabItem>
<TabItem value="cocoapods">

```ruby title=Podfile
pod 'LiveUpdateProvider', '~> 1.0.0'
```

</TabItem>
</Tabs>

Your update service's own SDK will depend on this package and supply a concrete `ProviderManager` implementation &mdash; consult that SDK's documentation for how to construct one.

## Configure

Set a Portal's `liveUpdateSource` to `.provider(manager:)`, passing your provider's `ProviderManager` instance:

```swift title=AppDelegate.swift
import UIKit
import IonicPortals
import LiveUpdateProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions
  launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    return true
  }
}

extension Portal {
  static let featuredProducts = Portal(
    name: "featured_products",
    liveUpdateSource: .provider(manager: MyUpdateProviderManager())
  )
}
```

:::caution
Unlike `.ionic` sources, `.provider` sources are **not synced automatically** when a Portal is created. Your app must explicitly trigger a sync, as shown below.
:::

If a Portal's live update source is already set to `.provider`, calling the Objective-C `setLiveUpdateConfiguration(appId:channel:syncImmediately:)` bridge on it is a no-op (it logs a warning) &mdash; an Appflow configuration can't override an existing provider source.

## Syncing

### Individual Portal Sync

Call `syncProvider()` on a `Portal` to trigger a sync manually:

```swift
let portal = Portal.featuredProducts
let result = try await portal.syncProvider()
```

`syncProvider()` returns an optional `any ProviderSyncResult` &mdash; the shape of this value is defined by your provider's SDK, since providers can attach their own sync metadata. If the Portal isn't configured with a `.provider` source, `syncProvider()` throws `LiveUpdateNotConfigured`.

### Multiple Portal Sync

Just like the existing `sync` API for Appflow-backed Portals, provider-backed Portals can be synced in parallel using the static `syncProvider` method on `Portal`, or the equivalent extension on `Array`:

```swift
let portals: [Portal] = [/* ... */]
for await result in Portal.syncProvider(portals) {
    // do something with result
}
```

```swift
let portals: [Portal] = [/* ... */]
for await result in portals.syncProvider() {
    // do something with result
}
```

Both return a `ParallelLiveUpdateProviderSyncGroup`, syncing every Portal in parallel and yielding each result as it completes.

## Reloading After a Sync

`Portal.latestAppDirectory` resolves the latest synced asset directory regardless of whether the Portal is configured with an `.ionic` or `.provider` source, so you can reload a Portal's view the same way once a sync completes:

```swift title="ViewController.swift"
override func viewDidLoad() {
  Task {
    do {
      _ = try await portal.syncProvider()
      self.portalView.reload()
    } catch {
      // handle error
      print("Sync failed with error: \(error)")
    }
  }

  super.viewDidLoad()
}
```
