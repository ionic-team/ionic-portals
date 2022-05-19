---
title: LiveUpdateManager
sidebar_label: Live Update Manager
---

The [LiveUpdateManager](#) is used to manage instances of web apps used with Live Updates. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access from anywhere in the application. [LiveUpdateManager](#) can be used in situations where you want to manually sync a web app or get the file path of the latest web assets on the device.

## Types

### Error

#### Definition

```swift
struct Error: Swift.Error {
    var failStep: FailStep
    var reason: Reason
}
```

### Error.FailStep

#### Definition

```swift
enum FailStep: String {
  case check, download, unpack, update
}
```

### Error.Reason

#### Definition

```swift
enum Reason {
    case unknownNetworkError(HTTPURLResponse)
    case appflowError(ErrorResponse)
    case fileIOError(reason: String)
    case metadataError(reason: String)
}
```

## Type Aliases

### UpdateAppComplete

`(Result<LiveUpdate, LiveUpdateManager.Error>) -> Void`

Success: [LiveUpdate](./live-update)

Failure: [LiveUpdateManager.Error](#error)

### SyncComplete

`() -> Void`

## Properties

### `shared`
_static_

The native application's default [`LiveUpdateManager`](#)

## Methods

### `add(_:)`

Adds an app to the LiveUpdateManager. Throws an error if file IO fails. 

#### Usage
```swift
let liveUpdateConfig = LiveUpdate(appId: "appId", channel: "production")
LiveUpdateManager.shared.add(liveUpdateConfig)
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`liveUpdate` | [LiveUpdate](./live-update) | An instance of an app to register with Live Updates

### `addLiveUpdateConfig(appId:channel:syncImmediately:)`

Adds an app to the LiveUpdateManager. Throws an error if file IO fails. 

#### Usage
```swift
try? LiveUpdateManager.shared.addLiveUpdateConfig(appId: "appId", channel: "production")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The AppFlow appId of the application to register
`channel` | String | The AppFlow distribution channel to check for updates from
`syncImmediately` | Bool | Whether to sync immediately or not. Defaults to `true`.

### `lastSync(for:)`

Check when an app was last synced. Returns `nil` if the provided `appId` has never been synced. 

```swift
let lastSync: Date? = LiveUpdateManager.shared.lastSync(for: "appId")
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with AppFlow

**Returns:** <span class="return-code">Date?</span>

### `lastSync()`

Check when any app registered with `LiveUpdateManager` has been synced. Returns `nil` if no applications have ever been synced.

```swift
let lastSync: Date? = LiveUpdateManager.shared.lastSync()
```

**Returns:** <span class="return-code">Date?</span>

### `sync(appId:isParallel:appComplete:)`

Checks a single app with live updates to see if any new builds are available. If they are, attempt to download, unzip, and update the saved data to reference the latest build.

```swift
// Sync the specific app
LiveUpdateManager.shared.sync(appId: "appId")

// Sync a specific app and execute code when app sync completes
LiveUpdateManager.shared.sync(appId: "appId") { result in 
    switch result {
    case .failure(let error):
        // handle error case
    case .success(let update):
        // handle success
    }
}

// Sync the app not in parallel
LiveUpdateManager.shared.sync(appId: "appId", isParallel: false)
```

#### Parameters

Name |  Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates
`isParallel` | Boolean | If true, multiple apps registered with Live Updates will sync in parallel. If false, Live Update sync operations will run one app at a time. Default is true.
`appComplete` | [`UpdateAppComplete`](#updateappcomplete) | A callback object to notify the caller of the result of the completed application sync. Defaults to a no-op

### `sync(appIds:isParallel:syncComplete:appComplete:)`

Checks the apps with live updates to see if any new builds are available. If they are, attempt to download, unzip, and update the saved data to reference the latest build.

```swift
// Sync the specific apps
LiveUpdateManager.shared.sync(appIds: ["1234", "5678"])

// Sync the specific apps and execute code when each app sync completes
LiveUpdateManager.shared.sync(appIds: ["1234", "5678"]) { result in 
    switch result {
    case .failure(let error):
        // handle error case
    case .success(let update):
        // handle success
    }
}

// Sync the specific apps and execute code when the overall sync completes and when each individual app sync completes
LiveUpdateManager.shared.sync(
    appIds: ["1234", "5678"],
    syncComplete: { print("Sync completed") }
    appComplete: { result in 
        switch result {
        case .failure(let error):
            // handle error case
        case .success(let update):
            // handle success
        }
    }
)

// Sync all apps not in parallel
LiveUpdateManager.shared.sync(appId: "appId", isParallel: false)
```

#### Parameters

Name |  Type | Description
:------ | :------ | :------
`appIds` | [String] | The ID of the app registered with Live Updates
`isParallel` | Boolean | If true, multiple apps registered with Live Updates will sync in parallel. If false, Live Update sync operations will run one app at a time. Default is true.
`syncComplete` | [`SyncComplete`](#synccomplete) | A callback object to notify the caller of the result of the completed application sync. Defaults to a no-op
`appComplete` | [`UpdateAppComplete`](#updateappcomplete) | A callback object to notify the caller of the result of the completed application sync. Defaults to a no-op

### `sync(isParallel:syncComplete:appComplete:)`

Checks all apps registered with live updates to see if any new builds are available. If they are, attempt to download, unzip, and update the saved data to reference the latest build.

```swift
// Sync all apps
LiveUpdateManager.shared.sync()

// Sync all apps and execute code when each app sync completes
LiveUpdateManager.shared.sync { result in 
    switch result {
    case .failure(let error):
        // handle error case
    case .success(let update):
        // handle success
    }
}

// Sync all apps and execute code when the overall sync completes and when each individual app sync completes
LiveUpdateManager.shared.sync(
    syncComplete: { print("Sync completed") }
    appComplete: { result in 
        switch result {
        case .failure(let error):
            // handle error case
        case .success(let update):
            // handle success
        }
    }
)

// Sync all apps not in parallel 
LiveUpdateManager.shared.sync(isParallel: false)
```

#### Parameters

Name |  Type | Description
:------ | :------ | :------
`isParallel` | Boolean | If true, multiple apps registered with Live Updates will sync in parallel. If false, Live Update sync operations will run one app at a time. Default is true.
`syncComplete` | [`SyncComplete`](#synccomplete) | A callback object to notify the caller of the result of the completed application sync. Defaults to a no-op
`appComplete` | [`UpdateAppComplete`](#updateappcomplete) | A callback object to notify the caller of the result of the completed application sync. Defaults to a no-op

### `cancelSync(for:)`

Attempts to cancel a running sync job.

```swift
// Cancel all syncing apps
LiveUpdateManager.shared.cancelSync(for: "appId")
```

#### Parameters

Name |  Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates

### `latestAppDirectory(for:)`

Get the latest directory for the updated app resources, if available. If the app has not been updated through Live Updates it will return `nil`. Throws an error if a file IO error occurs.

```swift
LiveUpdateManager.shared.latestAppDirectory(for: "appId")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates

**Returns:** <span class="return-code">URL?</span>

### `reset(retainCache:)`

Clears the live updates directory and saved update data. Provided for maintenance/troubleshooting purposes. Throws an error in the event of an IO error.

#### Usage

```swift
// Reset all apps
LiveUpdateManager.shared.reset()

// Reset but retain downloaded app files
LiveUpdateManager.shared.reset(retainCache: true)
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`retainCache` | true | Boolean | If true, will persist downloaded web asset files through reset. Default is `false`


### `cleanStaleVersions(for:)`

Clean stale versions of an app updated with Live Updates. Stale versions are any app snapshot files built for previous versions of the app binary and not currently used by any app channel.

#### Usage
```swift
// Clean app versions for a specific app
LiveUpdateManager.shared.cleanStaleVersions(for: "appId")
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates

### `cleanVersions(for:)`

Clean up unused/old app versions. If an app ID is provided the clean up will be restricted to that app.

#### Usage

```swift
// Clean all app versions
LiveUpdateManager.shared.cleanVersions()

// Clean app versions for a specific app
LiveUpdateManager.shared.cleanVersions(for: "appId")
```


#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String? | The ID of the app registered with Live Updates. Defaults to `nil`.

### `checkForUpdate(appId:callback:)`
Check for an update for an app. 

```swift
LiveUpdateManager.shared.checkForUpdate(appId: "appId") { checkResponse in
  // Do something with the checked response
}
```


#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`callback` | true | `(Result<SuccessResponse, LiveUpdateManager.Error>) -> Void` | A callback to handle the response from the update check request. Defaults to a no-op.

### `downloadUpdate
Download an update for an app. 

#### Usage

```swift
LiveUpdateManager.shared.downloadUpdate(appId: appId, snapshotId: snapshotId) { downloadResponse in
  // do something with the downloadResponse
}
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The ID of the app registered with Live Updates
`snapshotId` | String | The ID of an app snapshot to download
`callback` | `(Result<URL, Error>) -> Void` | A callback to handle the response from the download request

### `extractUpdate(appId:snapshotId)`

Extract an update for an app. 

#### Usage

```swift
let extractedDirectory = LiveUpdateManager.shared
    .extractUpdate(appId: appId, snapshotId: snapshotId)
```

#### Parameters

Name | Optional | Type | Description
:------ | :------ | :------
`appId` | false | String | The ID of the app registered with Live Updates
`snapshotId` | false | String |  The snapshot ID of the current Live Update object
`callback` | true | [IExtractCallback](./i-extract-callback) | A callback to handle the response from the extract request

### `getApps()`
Get the map of all registered apps using Live Updates.

#### Usage

```swift
let apps = LiveUpdateManager.shared.getApps()
```

**Returns:** <span class="return-code">[[String: LiveUpdate]](./live-update)</span>
