---
title: Syncing a Portal with Live Updates
sidebar_label: Syncing with Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The sync operation checks Appflow for a new version of a web app used in a Portal. If an update is available, the files are downloaded and the Portal is updated to use those new files the next time it loads. The Live Updates SDK will perform a sync when the Live Update Config is added to a Portal by default. This is typically done when an app is initially launched, and requires a full restart of an app to trigger subsequent syncs. We recommend performing a sync in other situations to provide more chances for Portals to update.

## Triggering a Sync

A sync can be triggered by calling the `sync` function in the Live Update Manager.

```swift
// Sync all apps
LiveUpdateManager.shared.sync()

// Sync a specific app
LiveUpdateManager.shared.sync(appId: "appId")

// Sync all apps not in parallel and with a callback
LiveUpdateManager.shared.sync(
    isParallel: false,
    syncComplete: { print("Sync completed!") },
    appComplete: { _ in print("App update complete") }
)
```

## When to Sync

Deciding when to sync is at your discretion.

:::tip
Depending on the size of your web app assets, a sync operation could be expensive. Keep in mind that mobile users may be on a cellular network data connection or may be opening the app from a mininized or background state to use it.
:::

The following example performs a sync when an app resumes as long as six hours has elapsed since the previous sync. This ensures a check is performed every time a user opens the app whether it is opened for the first time or opened from a minimized state.

```swift title="ViewController.swift"
override func viewDidLoad() {
  // If it has been more than 6 hours since last update check, sync now.
  if let lastUpdate = LiveUpdateManager.shared.lastSync(for: "appId"),
      let hoursSinceLastUpdate = Calendar.current
          .dateComponents([.hour], from: lastUpdate, to: Date()).hour,
      hours > 6 {

        LiveUpdateManager.shared.sync(appId: "appId")
  }
}
```
