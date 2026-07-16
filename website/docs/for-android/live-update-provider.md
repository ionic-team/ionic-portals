---
title: Using a Live Update Provider
sidebar_label: Live Update Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Portal's live update source isn't limited to Ionic Appflow. A **Live Update Provider** lets a Portal sync its web assets from any other update service that supports it, whether that's a third-party update service or infrastructure your own organization runs.

:::note
This is for syncing Portal web assets from an update service other than Appflow. If you're using Appflow, see [Adding Live Updates](./live-updates.md) instead.
:::

## Install

Add your update service's SDK to your project, following that SDK's own installation instructions. It will hand you an object you can pass straight to `setLiveUpdateProviderManager(...)` when configuring a Portal below. There's nothing else to install.

:::tip
Building your own Live Update Provider integration instead of using an existing update service's SDK? See the [Live Update Provider SDK](https://github.com/ionic-team/live-update-provider-sdk) documentation.
:::

## Configure

Use `PortalBuilder.setLiveUpdateProviderManager(manager)` in place of `setLiveUpdateConfig(...)`, passing the object your update service's SDK gave you:

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin title=MyApplication.kt
import android.app.Application
import io.ionic.portals.PortalManager

class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()

        PortalManager.newPortal("portal1")
            .setLiveUpdateProviderManager(MyUpdateService.providerManager)
            .create()
    }
}
```

</TabItem>
<TabItem value="java">

```java title=MyApplication.java
import android.app.Application;
import io.ionic.portals.PortalManager;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        PortalManager.newPortal("portal1")
            .setLiveUpdateProviderManager(MyUpdateService.getProviderManager())
            .create();
    }
}
```

</TabItem>
</Tabs>

A Portal can only have one live update source: configuring a provider manager this way replaces any Appflow config set via `setLiveUpdateConfig(...)`.

:::caution
An Appflow source syncs automatically the first time a Portal is created or loaded, via the `updateOnAppLoad` flag on `setLiveUpdateConfig(...)`. There's no equivalent flag for a provider source: Portals never calls into a provider manager on its own, so nothing happens until your app calls `syncProvider()`/`syncProviderAsync()`, as shown below. Consult your update service's SDK documentation, since it may already sync in the background on its own schedule.
:::

## Syncing

Call `syncProvider()` (Kotlin) or `syncProviderAsync()` (Java) to trigger a sync manually:

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val portal = PortalManager.getPortal("portal1")
val result = portal.syncProvider()
```

</TabItem>
<TabItem value="java">

```java
Portal portal = PortalManager.getPortal("portal1");
portal.syncProviderAsync().thenAccept(result -> {
    // do something with result
});
```

</TabItem>
</Tabs>

## Reloading After a Sync

Reload a provider-backed Portal the same way you'd reload an Appflow-backed one. See [Reload Portals with Live Updates](./how-to/reloading-with-live-updates.md) for the pattern, substituting the `syncProvider()`/`syncProviderAsync()` call shown above wherever that guide calls `LiveUpdateManager.sync(...)`.
