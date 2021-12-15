# Portals Live Updates Alpha 1

## Getting Started

### Portals

Follow the Portals documentation to setup Portals in your native application.

https://ionic.io/docs/portals

Add the latest Alpha version of Portals and Live Updates to your application

```groovy
implementation 'io.ionic:portals:0.4.0-alpha4'
implementation 'io.ionic:liveupdates:0.0.1-alpha4'

Make sure to [provide the initial web assets](https://ionic.io/docs/portals/how-to/pull-in-web-bundle) for your Portal. This is the web application bundled with the native application that will load in the Portal.

### Appflow

Setup an app for your Portal in the Ionic Dashboard 

https://dashboard.ionicframework.com

See our documentation on [using Appflow](https://ionic.io/docs/appflow/quickstart/connect).

Take note of the **appId** of your app in Appflow, this will be used by the Live Updates sdk.

To test Live Updates, create a new build of your app in Appflow and create a deployment to Live Updates from that build. Take note of the **channel** name as this is also used in the Live Updates sdk.

![Deployments](https://i.imgur.com/73detdm.png)

Deployments in Appflow will be downloaded as new Live Updates.

## Using Live Updates in the Portals native library

Add a LiveUpdate config where your Portal is created. The LiveUpdate object needs an appId that corresponds with an appId in Appflow, and the channel name to subscribe to for updates. 

```kotlin
// Register Portals
PortalManager.register("MY_API_KEY")

// Example appId = ebd6138b, channel = "production"
PortalManager.newPortal("portal1")
    .setLiveUpdateConfig(applicationContext, LiveUpdate("ebd6138b", "production"))
    .create()
```

By default, when the app loads for the first time and the portal is created, a sync will occur. A sync operation checks the Appflow servers for a new version of the app. If a new version is available, the app files are downloaded to the device and setup with the Portal. The next time the Portal is loaded, the new version will load automatically.

If you prefer to not perform an automatic sync when the app is initially loaded, pass `false` in to `setLiveUpdateConfig` as well like so:

```kotlin
.setLiveUpdateConfig(applicationContext, LiveUpdate("ebd6138b", "production"), false)
```


## Functionality

- A sync can be performed manually at any time after a Portal has been setup for Live Updates

```kotlin
// All registered Portals using Live Updates
LiveUpdateManager.sync(context)

// A single Portal using Live Updates
LiveUpdateManager.sync(context, appId)
```

- Example of performing a sync if a day has elapsed since the last sync, on app resume

```kotlin
override fun onResume() {
    super.onResume()

    val lastSync = LiveUpdateManager.getLastSync(context)
    val now = System.currentTimeMillis()
    val day = 60*60*24*1000

    if(lastSync == -1L || now - lastSync > day) {
        LiveUpdateManager.sync(context)
    }
}
```

- A callback can be passed to a sync operation

```kotlin
LiveUpdateManager.sync(requireContext(), async = true, callback = object : SyncCallback {
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

- If you know a Portal is visible when a sync completes you can choose to reload the Portal right away

```kotlin
portalFragment.reload()
```

- The state of an updating Portal can be checked at any time

```kotlin
PortalManager.getPortal("portal1").liveUpdateConfig?.appState
```
