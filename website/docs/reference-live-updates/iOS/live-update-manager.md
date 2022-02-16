---
title: LiveUpdateManager
sidebar_label: Live Update Manager
---

The [LiveUpdateManager](./live-update-manager) is used to manage instances of web apps used with Live Updates. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access from anywhere in the application. [LiveUpdateManager](./live-update-manager) can be used in situations where you want to manually sync a web app, check the status of an active sync, and get the file path of the latest web assets on the device.

## Methods

### getLastSync
_static_

Check when an app was last synced. If no appId is passed in, returns the oldest sync time from all registered apps.

```swift
let lastSync = LiveUpdateManager.getLastSync(context)
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | true | String | The ID of the app registered with Live Updates

**Returns:** <span class="return-code">*Date*</span>

### sync
_static_

Checks a single app with live updates to see if any new builds are available. If they are, attempt to download, unzip, and update the saved data to reference the latest build.

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

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | true | String | The ID of the app registered with Live Updates
`appIds` | true | String[] | An array of app IDs of apps registered with Live Updates
`isParallel` | true | Boolean | If true, multiple apps registered with Live Updates will sync in paralell. If false, Live Update sync operations will run one app at a time. Default is true
`callback` | true | [ISyncCallback](./i-sync-callback) | A callback object to notify on each app sync complete and when entire sync is complete

### cancelSync
_static_

Attempts to cancel a running sync job. If no app ID is provided it will attempt to cancel all running sync jobs. This function exists on iOS, but is currently unimplemented. It will be implemented in a future release

```swift
// Cancel all syncing apps
LiveUpdateManager.cancelSync()

// Cancel a specific syncing app
LiveUpdateManager.cancelSync("appId")
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | true | String | The ID of the app registered with Live Updates

### getLatestAppDirectory
_static_

Get the latest directory for the updated app resources, if available. If the app has not been updated through Live Updates, null will be returned.

```swift
LiveUpdateManager.getLatestAppDirectory("appId")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates

**Returns:** <span class="return-code">URL?</span>

### reset
_static_

Clears the live updates directory and saved update data. Provided for maintenance/troubleshooting purposes.

#### Usage

```swift
// Reset all apps
LiveUpdateManager.reset(context)

// Reset but retain downloaded app files
LiveUpdateManager.reset(retainCache: true)
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`retainCache` | true | Boolean | If true, will persist downloaded web asset files through reset. Default is `false`

### addLiveUpdateInstance
_static_

Adds an app to the LiveUpdateManager.

#### Usage
```swift
let liveUpdateConfig = LiveUpdate(appId: "appId", channel: "production")
LiveUpdateManager.addLiveUpdateInstance(liveUpdateConfig)
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`liveUpdate` | [LiveUpdate](./live-update) | An instance of an app to register with Live Updates

### cleanStaleVersions
_static_

Clean stale versions of an app updated with Live Updates. Stale versions are any app snapshot files built for previous versions of the app binary and not currently used by any app channel.

#### Usage
```swift
// Clean all stale app versions
LiveUpdateManager.cleanStaleVersions()

// Clean app versions for a specific app
LiveUpdateManager.cleanStaleVersions("appId")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates

### cleanVersions
_static_

Clean up unused/old app versions. If an app ID is provided the clean up will be restricted to that app.

#### Usage

```swift
// Clean all app versions
LiveUpdateManager.cleanVersions()

// Clean app versions for a specific app
LiveUpdateManager.cleanVersions("appId")
```


#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | true | String | The ID of the app registered with Live Updates

### checkForUpdate
_static_

Check for an update for an app. If optional callback is provided, will run async.

```swift
LiveUpdateManager.checkForUpdate(appId, channel) { checkResponse in
  // Do something with the checked response
}
```


#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`channel` | false | String | The channel of the app registered with Live Updates
`callback` | true | [ICheckCallback](./i-check-callback) | A callback to handle the response from the update check request

### downloadUpdate
_static_

Download an update for an app. If optional callback is provided, will run async.

#### Usage

```swift
LiveUpdateManager.downloadUpdate(appId, snapshotId) { downloadResponse in
  // do something with the downloadResponse
}
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`snapshotId` | false | String | The ID of an app snapshot to download
`callback` | true | [IDownloadCallback](./i-download-callback) | A callback to handle the response from the download request

### extractUpdate
_static_

Extract an update for an app. If optional callback is provided, will run async.

#### Usage

```swift
LiveUpdateManager.extractUpdate(appId, snapshotId) { url in
  // do something with the url path
}
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`snapshotId` | false | String |  The snapshot ID of the current Live Update object
`callback` | true | [IExtractCallback](./i-extract-callback) | A callback to handle the response from the extract request

### applyUpdate
_static_

Apply a downloaded and extracted Live Update snapshot to the app as the latest path.

#### Usage

```swift
LiveUpdateManager.applyUpdate("appId", "snapshotId", "buildId")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates
`snapshotId` | String | The ID of an app snapshot to apply
`buildId` | String | The ID of the build to apply

### getApps
_static_

Get the map of all registered apps using Live Updates.

#### Usage

```swift
let apps = LiveUpdateManager.getApps()
```

**Returns:** <span class="return-code">[[String: LiveUpdate]](./live-update)</span>
