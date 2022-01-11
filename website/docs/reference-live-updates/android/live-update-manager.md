---
title: LiveUpdateManager
sidebar_label: Live Update Manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [LiveUpdateManager](./live-update-manager) object is used to manage instances of web apps used with Live Updates. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access from anywhere in the application. [LiveUpdateManager](./live-update-manager) can be used in situations where you want to manually sync a web app, check the status of an active sync, and get the file path of the latest web assets on the device.

## Methods

### getLastSync
_static_

Check when an app was last synced. If no appId is passed in, returns the oldest sync time from all registered apps.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val lastSync = LiveUpdateManager.getLastSync(context)
```

</TabItem>
<TabItem value="java">

```java
Long lastSync = LiveUpdateManager.getLastSync(context);
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | true | String | The ID of the app registered with Live Updates

**Returns:** <span class="return-code">*Long*</span>

### sync
_static_

Checks a single app with live updates to see if any new builds are available. If they are, attempt to download, unzip, and update the saved data to reference the latest build.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Sync all apps
LiveUpdateManager.sync(context)

// Sync a specific app
LiveUpdateManager.sync(context, "appId")

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
// Sync all apps
LiveUpdateManager.sync(context);

// Sync a specific app
LiveUpdateManager.sync(context, "appId");

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

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | true | String | The ID of the app registered with Live Updates
`appIds` | true | Array of Strings | An array of app IDs of apps registered with Live Updates
`async` | true | Boolean | If true, multiple apps registered with Live Updates will sync in paralell. If false, Live Update sync operations will run one app at a time. Default is true
`callback` | true | [SyncCallback](./sync-callback) | A callback to notify on each app sync complete and when entire sync is complete

### cancelSync
_static_

Attempts to cancel a running sync job. If no app ID is provided it will attempt to cancel all running sync jobs.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Cancel all syncing apps
LiveUpdateManager.cancelSync()

// Cancel a specific syncing app
LiveUpdateManager.cancelSync("appId")
```

</TabItem>
<TabItem value="java">

```java
// Cancel all syncing apps
LiveUpdateManager.cancelSync();

// Cancel a specific syncing app
LiveUpdateManager.cancelSync("appId");
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | true | String | The ID of the app registered with Live Updates

### getLatestAppDirectory
_static_

Get the latest directory for the updated app resources, if available. If the app has not been updated through Live Updates, null will be returned.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
LiveUpdateManager.getLatestAppDirectory(context, "appId")
```

</TabItem>
<TabItem value="java">

```java
LiveUpdateManager.getLatestAppDirectory(context, "appId");
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | Context | An Android context
`appId` | String | The ID of the app registered with Live Updates

**Returns:** <span class="return-code">File?</span>

### initialize
_static_

Initializes the file directory and shared preferences used to save update data.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
LiveUpdateManager.initialize(context)
```

</TabItem>
<TabItem value="java">

```java
LiveUpdateManager.initialize(context);
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | Context | An Android context

### reset
_static_

Clears the live updates directory and saved update data. Provided for maintenance/troubleshooting purposes.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Reset all apps
LiveUpdateManager.reset(context)

// Reset but retain downloaded app files
LiveUpdateManager.reset(context, true)
```

</TabItem>
<TabItem value="java">

```java
// Reset all apps
LiveUpdateManager.reset(context);

// Reset but retain downloaded app files
LiveUpdateManager.reset(context, true);
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`retainCache` | true | Boolean | If true, will persist downloaded web asset files through reset. Default is false

### addLiveUpdateInstance
_static_

Adds an app to the LiveUpdateManager.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val liveUpdateConfig = LiveUpdate("appId", "production")
LiveUpdateManager.addLiveUpdateInstance(context, liveUpdateConfig)
```

</TabItem>
<TabItem value="java">

```java
LiveUpdate liveUpdateConfig = new LiveUpdate("appId", "production");
LiveUpdateManager.addLiveUpdateInstance(context, liveUpdateConfig);
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | Context | An Android context
`liveUpdate` | [LiveUpdate](./live-update) | An instance of an app to register with Live Updates

### cleanStaleVersions
_static_

Clean stale versions of an app updated with Live Updates. Stale versions are any app snapshot files built for previous versions of the app binary and not currently used by any app channel.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Clean all stale app versions
LiveUpdateManager.cleanStaleVersions(context)

// Clean app versions for a specific app
LiveUpdateManager.cleanStaleVersions(context, "appId")
```

</TabItem>
<TabItem value="java">

```java
// Clean all stale app versions
LiveUpdateManager.cleanStaleVersions(context);

// Clean app versions for a specific app
LiveUpdateManager.cleanStaleVersions(context, "appId");
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | Context | An Android context
`appId` | String | The ID of the app registered with Live Updates

### cleanVersions
_static_

Clean up unused/old app versions. If an app ID is provided the clean up will be restricted to that app.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Clean all app versions
LiveUpdateManager.cleanVersions(context)

// Clean app versions for a specific app
LiveUpdateManager.cleanVersions(context, "appId")
```

</TabItem>
<TabItem value="java">

```java
// Clean all app versions
LiveUpdateManager.cleanVersions(context);

// Clean app versions for a specific app
LiveUpdateManager.cleanVersions(context, "appId");
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | true | String | The ID of the app registered with Live Updates

### checkForUpdate
_static_

Check for an update for an app. If optional callback is provided, will run async.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Synchronous check call in coroutine
val checkScope = CoroutineScope(Dispatchers.IO)
checkScope.launch {
    val response = LiveUpdateManager.checkForUpdate(context, "appId")
    println(response.body.toString())
}

// Async check call
LiveUpdateManager.checkForUpdate(context, "appId", object : CheckCallback {
    override fun onComplete(result: CheckResponse?) {
        // Do something with the result
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Synchronous check call in an executor
Executor executor = Executors.newSingleThreadExecutor();
executor.execute(() -> {
    CheckResponse response = LiveUpdateManager.checkForUpdate(getContext(), "appId");
    // Do something with response
});

// Async check call
LiveUpdateManager.checkForUpdate(context, "appId", checkResponse -> {
    // Do something with response
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | false | String | The ID of the app registered with Live Updates
`callback` | true | [CheckCallback](./check-callback) | A callback to handle the response from the update check request

### downloadUpdate
_static_

Download an update for an app. If optional callback is provided, will run async.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Synchronous download call in coroutine
val checkScope = CoroutineScope(Dispatchers.IO)
checkScope.launch {
    val response = LiveUpdateManager.downloadUpdate(context, "appId", "snapshotId")
    // Do something with result
    println(response.body.toString())
}

// Async download call
LiveUpdateManager.downloadUpdate(applicationContext, "appId", "snapshotId", object : DownloadCallback {
    override fun onComplete(result: DownloadResponse?) {
        // Do something with result
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Synchronous download call in an executor
Executor executor = Executors.newSingleThreadExecutor();
executor.execute(() -> {
    DownloadResponse response = LiveUpdateManager.downloadUpdate(getContext(), "appId", "snapshotId");
});

// Async download call
LiveUpdateManager.downloadUpdate(getContext(), "appId", "snapshotId", downloadResponse -> {
    // Do something with response
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`context` | false | Context | An Android context
`appId` | false | String | The ID of the app registered with Live Updates
`snapshotId` | false | String | The ID of an app snapshot to download
`callback` | true | [DownloadCallback](./download-callback) | A callback to handle the response from the download request

### extractUpdate
_static_

Extract an update for an app. If optional callback is provided, will run async.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Synchronous extract call in coroutine
val checkScope = CoroutineScope(Dispatchers.IO)
checkScope.launch {
    val response = LiveUpdateManager.extractUpdate("appId", zipFile)
    println(response?.path)
}

// Async extract call
LiveUpdateManager.extractUpdate("appId", zipFile, object : ExtractCallback {
    override fun onComplete(result: File?) {
        println(response?.path)
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Synchronous extract call in an extractor
Executor executor = Executors.newSingleThreadExecutor();
executor.execute(() -> {
    File extractedFile = LiveUpdateManager.extractUpdate(getContext(), zipFile);
});

// Async extract call
LiveUpdateManager.extractUpdate(getContext(), zipFile, extractedFile -> {
    // Do something with file
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`zipFile` | false | File | The zip file of the app snapshot to extract
`callback` | true | [ExtractCallback](./extract-callback) | A callback to handle the response from the extract request

### applyUpdate
_static_

Apply a downloaded and extracted Live Update snapshot to the app as the latest path.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
LiveUpdateManager.applyUpdate(context, "appId", "snapshotId", "buildId")
```

</TabItem>
<TabItem value="java">

```java
LiveUpdateManager.applyUpdate(context, "appId", "snapshotId", "buildId");
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`context` | Context | An Android context
`appId` | String | The ID of the app registered with Live Updates
`snapshotId` | String | The ID of an app snapshot to apply
`buildId` | String | The ID of the build to apply

### getApps
_static_

Get the map of all registered apps using Live Updates.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val apps = LiveUpdateManager.getApps()
```

</TabItem>
<TabItem value="java">

```java
Map<String, LiveUpdate> apps = LiveUpdateManager.getApps();
```

</TabItem>
</Tabs>

**Returns:** <span class="return-code">Map<String, [*LiveUpdate*](./live-update)></span>
