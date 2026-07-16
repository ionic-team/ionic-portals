---
title: Using a Live Update Provider
sidebar_label: Live Update Provider
---

A Portal's live update source isn't limited to Ionic Appflow. A **Live Update Provider** lets a Portal sync its web assets from any other update service that supports it &mdash; whether that's a third-party update service or infrastructure your own organization runs.

:::note
This is for syncing Portal web assets from an update service other than Appflow. If you're using Appflow, see [Adding Live Updates](./live-updates.md) instead.
:::

## Install

Add your update service's SDK to your project, following that SDK's own installation instructions. It will hand you an object you can pass straight to Portals when configuring a Portal below &mdash; there's nothing else to install.

:::tip
Building your own Live Update Provider integration instead of using an existing update service's SDK? See the [Live Update Provider SDK](https://github.com/ionic-team/live-update-provider-sdk) documentation.
:::

## Configure

Set a Portal's `liveUpdateSource` to `.provider(manager:)`, passing the object your update service's SDK gave you:

```swift
import IonicPortals

extension Portal {
  static let featuredProducts = Portal(
    name: "featured_products",
    liveUpdateSource: .provider(manager: MyUpdateService.providerManager)
  )
}
```

:::caution
An `.ionic` source syncs automatically the first time a Portal is created, via the `syncOnAdd` flag on `LiveUpdate`. There's no equivalent flag for a `.provider` source &mdash; Portals never calls into a `ProviderManager` on its own, so nothing happens until your app calls `syncProvider()`, as shown below. Consult your update service's SDK documentation &mdash; it may already sync in the background on its own schedule.
:::

## Syncing

Call `syncProvider()` on a `Portal` to trigger a sync manually:

```swift
let portal = Portal.featuredProducts
let result = try await portal.syncProvider()
```

Multiple Portals can be synced in parallel the same way Appflow-backed Portals are, using the static `Portal.syncProvider(_:)` method or the equivalent `Array` extension:

```swift
let portals: [Portal] = [/* ... */]
for await result in Portal.syncProvider(portals) {
    // do something with result
}
```

## Reloading After a Sync

Reload a provider-backed Portal the same way you'd reload an Appflow-backed one &mdash; see [Reload Portals with Live Updates](./how-to/reloading-with-live-updates.md) for the pattern, substituting the `syncProvider()` call shown above wherever that guide calls `LiveUpdateManager.shared.sync(...)`.
