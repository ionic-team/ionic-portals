---
title: Create View Via XML
sidebar_label: Create View Via XML
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The easiest way to get started with Ionic Portals is to bootstrap the Portals in your base [Application](https://developer.android.com/reference/android/app/Application) class using the [PortalManager](../api-reference/portal-manager) and [PortalView](../api-reference/portal-view) classes. You can do this by using the [PortalManager.newPortal()](../api-reference/portal-manager#newportal) function in the [Application.onCreate()](https://developer.android.com/reference/android/app/Application#onCreate()) function as shown below.

## Bootstraping the Portal instances

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
        PortalManager.newPortal("foo") // matches `app:portalId`
            .create()
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
        PortalManager.newPortal("foo") // matches `app:portalId`
            .create();
    }
}
``` 

</TabItem>
</Tabs>

If the `MyApplication` class did not exist before, be sure to add it to your `AndroidManifest.xml` file. This tells Android to use this class as your base application class rather than the built in class.

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

## Connect via XML

After bootstraping the Portal instances via the `Application` class, you can use XML to define the Portals in a View by using the `portalId` attribute to link the XML to the instance.

```xml
<?xml version="1.0" encoding="utf-8"?>
<io.ionic.portals.PortalView
    app:portalId="foo"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```
