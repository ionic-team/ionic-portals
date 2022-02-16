---
title: Syncing a Portal with Live Updates
sidebar_label: Syncing with Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The sync operation checks Appflow for a new version of a web app used in a Portal. If an update is available, the files are downloaded and the Portal is updated to use those new files the next time it loads. The Live Updates SDK will perform a sync when the Live Update Config is added to a Portal by default. This is typically done when an app is initially launched, and requires a full restart of an app to trigger subsequent syncs. We recommend performing a sync in other situations to provide more chances for Portals to update.

## Triggering a Sync

A sync can be triggered by calling the `sync` function in the Live Update Manager.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
// Sync all apps
LiveUpdateManager.sync()

// Sync a specific app
LiveUpdateManager.sync(appId: "appId")

// Sync all apps not in parallel and with a callback
private class MyLiveUpdateCallbacks: ISyncCallback {
    func onAppComplete(_ liveUpdate: LiveUpdate) { print("Single Sync completed!") }
    func onSyncComplete() { print("Sync completed!") }
}

LiveUpdateManager.sync(isParallel = false, callbacks = MyLiveUpdateCallbacks())
```

</TabItem>

<TabItem value="kt">

```kotlin
// Sync all configured apps
LiveUpdateManager.sync(context)

// Sync a specific app
PortalManager.sync(context, "appId")

// Sync specific apps
PortalManager.sync(context, arrayOf("appId1", "appId2"))

// Sync all configured apps and callback
LiveUpdateManager.sync(context, callback = object : SyncCallback {
    override fun onAppComplete(liveUpdate: LiveUpdate, failStep: FailStep?) {
        if(failStep != null) {
            Log.e("LiveUpdate","CALLBACK: Sync failed at step ${failStep.name} for app ${liveUpdate.appId}!")
        } else {
            Log.d("LiveUpdate","CALLBACK: Sync success for app ${liveUpdate.appId}!")
        }
    }

    override fun onSyncComplete() {
        Log.d("LiveUpdate","CALLBACK: Sync finished!")
    }
})
```

</TabItem>

<TabItem value="java">

```java
// Sync all configured apps
LiveUpdateManager.sync(context);

// Sync a specific app
PortalManager.sync(context, "appId");

// Sync specific apps
LiveUpdateManager.sync(this, new String[] {"appId1", "appId2"});

// Sync a specific app and callback
LiveUpdateManager.sync(this, "appId", new SyncCallback() {
    @Override
    public void onAppComplete(LiveUpdate liveUpdate, FailStep failStep) {
        if(failStep != null) {
            Log.e("LiveUpdate","CALLBACK: Sync failed at step " + failStep.name + " for app " + liveUpdate.appId + "!");
        } else {
            Log.d("LiveUpdate","CALLBACK: Sync success for app " + liveUpdate.appId + "!");
        }
    }

    @Override
    public void onSyncComplete() {
        Log.d("LiveUpdate","CALLBACK: Sync finished!")
    }
});
```

</TabItem>

</Tabs>

## When to Sync

Deciding when to sync is at your discretion.

:::tip
Depending on the size of your web app assets, a sync operation could be expensive. Keep in mind that mobile users may be on a cellular network data connection or may be opening the app from a mininized or background state to use it.
:::

The following example performs a sync when an app resumes as long as six hours has elapsed since the previous sync. This ensures a check is performed every time a user opens the app whether it is opened for the first time or opened from a minimized state.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
// Placed in an iOS View Controller
override fun viewDidLoad() {
  // If it has been more than 6 hours since last update check, sync now.
  let lastUpdateTime = LiveUpdateManager.getLastSync(this)
  let sixHoursAgo = Calendar.current.date(byAdding: .hour, value: -6, to: Date())

  if(lastUpdateTime < sixHoursAgo) {
    LiveUpdateManager.sync(this)
  }

  super.viewDidLoad()
}
```

</TabItem>

<TabItem value="kt">

```kotlin
// Placed in an Android Activity
override fun onResume() {
    super.onResume()

    // If it has been more than 6 hours since last update check, sync now.
    val lastUpdateTime = LiveUpdateManager.getLastSync(this)
    val now = System.currentTimeMillis()
    val sixHours = 6 * 60 * 60 * 1000

    if(lastUpdateTime < (now - sixHours)) {
        LiveUpdateManager.sync(this)
    }
}
```

</TabItem>

<TabItem value="java">

```java
// Placed in an Android Activity
@Override
protected void onResume() {
    super.onResume();

    // If it has been more than 6 hours since last update check, sync now.
    long lastUpdateTime = LiveUpdateManager.getLastSync(this);
    long now = System.currentTimeMillis();
    long sixHours = 6 * 60 * 60 * 1000;
    if (lastUpdateTime < (now- sixHours)) {
        LiveUpdateManager.sync(this);
    }
}
```

</TabItem>

</Tabs>
