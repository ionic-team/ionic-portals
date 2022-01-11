---
title: SyncCallback
sidebar_label: "SyncCallback"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Sync Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.sync()](./live-update-manager#sync) method.

## Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Sync all apps not in parallel and with a callback
LiveUpdateManager.sync(context, async = false, callback = object : SyncCallback {
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
// Sync specific apps with a callback
LiveUpdateManager.sync(context, new String[] {"appId1", "appId2"} ,true, new SyncCallback() {
    @Override
    public void onAppComplete(LiveUpdate liveUpdate, FailStep failStep) {
        if (failStep != null) {
            Log.d("LiveUpdates", "App " + liveUpdate.getAppId() + " failed syncing at step " + failStep.name());
        } else {
            Log.d("LiveUpdates", "App " + liveUpdate.getAppId() + " finished syncing");
        }
    }

    @Override
    public void onSyncComplete() {
        settingsViewModel.setResetProfile(true);
    }
});
```

</TabItem>
</Tabs>

## Methods

### onAppComplete
_static_

Called when the [LiveUpdateManager.sync()](./live-update-manager#sync) method has finished syncing each app in the sync process.

#### Parameters

Name | Type | Description
:------ | :------ | :------
`liveUpdate` | [LiveUpdate](./live-update) | Information about the app synced.
`failStep` | FailStep | Contains information about the step the sync failed on if an error occurred when syncing an app.

### onSyncComplete
_static_

Called once when the [LiveUpdateManager.sync()](./live-update-manager#sync) method has finished syncing all apps.
