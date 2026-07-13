---
title: Using a Live Update Provider
sidebar_label: Live Update Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

A Portal's live update source isn't limited to Ionic Appflow. A **Live Update Provider** lets a Portal instead sync its web assets from any external update service, by wiring up an implementation of that service's `ProviderManager` interface.

:::note
This is for teams who want to sync Portal web assets from their own update infrastructure instead of Appflow. If you're using Appflow, see [Adding Live Updates](./live-updates.md) instead.
:::

## Install

`io.ionic:liveupdateprovider` defines the `ProviderManager`/`ProviderSyncResult` contracts a provider implements, and is already pulled in transitively by `io.ionic:portals`. If you need to reference its types directly (for example, to implement a `ProviderManager`), add it explicitly:

<CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation 'io.ionic:liveupdateprovider:1.0.0'
}`.trim()
}
</CodeBlock>

Your update service's own SDK will depend on this library and supply a concrete `ProviderManager` implementation &mdash; consult that SDK's documentation for how to construct one.

## Configure

Use `PortalBuilder.setLiveUpdateProviderManager(manager)` to configure a Portal with a `ProviderManager`, in place of the `setLiveUpdateConfig(...)` call used for Appflow:

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
            .setLiveUpdateProviderManager(MyUpdateProviderManager())
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
            .setLiveUpdateProviderManager(new MyUpdateProviderManager())
            .create();
    }
}
```

</TabItem>
</Tabs>

This sets the Portal's `liveUpdateSource` to `LiveUpdateSource.Provider(manager)`. A Portal can only have one live update source configured &mdash; either `LiveUpdateSource.Ionic(liveUpdateConfig)` from `setLiveUpdateConfig(...)`, or `LiveUpdateSource.Provider(manager)` from `setLiveUpdateProviderManager(...)`.

:::caution
Unlike an Ionic (Appflow) source, a Provider source is **not synced automatically** when a Portal is created or loaded, regardless of the provider's own internal behavior. Your app must explicitly trigger a sync through the Portals API, as shown below.
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

The returned `ProviderSyncResult?` is defined by your provider's SDK, since providers can attach their own sync metadata. If the Portal isn't configured with a `LiveUpdateSource.Provider`, both methods throw `Portal.LiveUpdateNotConfigured`.

## Reloading After a Sync

`Portal.latestAppDirectory(context)` resolves the latest synced asset directory regardless of whether the Portal is configured with an `Ionic` or `Provider` source, so a Portal can be reloaded the same way once a sync completes. See [Reload Portals with Live Updates](./how-to/reloading-with-live-updates.md) for the reload pattern &mdash; substitute the `syncProvider()`/`syncProviderAsync()` call shown above wherever that guide calls `LiveUpdateManager.sync(...)`.
