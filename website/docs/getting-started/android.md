---
title: Using Portals in Android
sidebar_label: Using Portals in Android
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once the [API Key has been obtained](./guide#signup) and [Ionic Portals library is installed](./guide#install), you can start creating Portals for your application.

## Creating a custom Application class

In Android, you will have to register your Portals instance and start creating Portals via the [PortalManager](../reference/android/portal-manager). To do this, a custom [Application](https://developer.android.com/reference/android/app/Application) class is recommended. In this Application class, you can override `Application#onCreate()` to register and create Portals.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
class MyApplication : Application {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")
        // ...
    }
}
```

</TabItem>
<TabItem value="java">

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PortalManager.register("MY_API_KEY");
        // ...
    }
}
``` 

</TabItem>
</Tabs>

After creating a custom Application class, be sure to add the `android:name` attribute to your `application` tag in the `AndroidManifest.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.example.my.app">

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name">
        /* ... */
        /* other manifest code here */
        /* ... */
    </application>
</manifest>  
```

## Creating a Portal via PortalManager

After registering via the [PortalManager.register()](../reference/android/portal-manager#register) function, you can create Portals. Use the [PortalManager](../reference/android/portal-manager) to quickly create a [Portal](../reference/android/portal) and link it to an XML layout.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
class MyApplication : Application {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")

        val portalId = "MY_FIRST_PORTAL"
        PortalManager.newPortal(portalId).create()
    }
}
```

</TabItem>
<TabItem value="java">

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PortalManager.register("MY_API_KEY");

        String portalId = "MY_FIRST_PORTAL";
        PortalManager.newPortal(portalId).create();
    }
}
``` 

</TabItem>
</Tabs>

Now, the [Portal](../reference/android/portal) is successfully created and managed by the [PortalManager](../reference/android/portal-manager).

## Linking the Portal in a Layout file

In order to link the Portal to an XML layout file, you need to add a `portalId` attribute to the XML tag as shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<io.ionic.portals.PortalView
    app:portalId="MY_FIRST_PORTAL"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

You can use the `strings.xml` resources file to make sure the Portal ids match up, but it isn't neccessary to do so.

## Adding Web Code

Now that your Portal is successfully registered, created, and linked, you need to add the web code to your application. The web code lives in folders under `src/main/assets`. You can use either many web applications or one "Single Page Application" (SPA) and dynamically link to the route you want to use. By default, the [PortalManager](../reference/android/portal-manager) will look in the folder named the same as the `portalId` used. You can use the [setStartDir()](../reference/android/portal-builder#setStartDir) function to set the web application's directory.

For more information on how to setup your web bundle, see our how to guide on [how to pull in a web bundle](../how-to/pull-in-web-bundle).
