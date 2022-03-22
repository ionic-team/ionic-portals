---
title: Using Portals in Android
sidebar_label: Using Portals in Android
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you [obtain an API key](./guide#signup) and [install Ionic Portals](./guide#install), you can start creating Portals for your application.

## Creating a Custom Application Class

In Android, you will have to register your Portals instance and start creating Portals via the [PortalManager](../reference/android/portal-manager). To do this, a custom [Application](https://developer.android.com/reference/android/app/Application) class is recommended. In this Application class, you can override `Application#onCreate()` to register and create Portals.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">


```kotlin title=MyApplication.kt
class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")
        // setup portals
    }
}
```

</TabItem>
<TabItem value="java">

```java title=MyApplication.java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PortalManager.register("MY_API_KEY");
        // setup portals
    }
}
``` 

</TabItem>
</Tabs>

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
:::

After creating a custom Application class, be sure to add the `android:name` attribute to your `application` tag in the `AndroidManifest.xml`.

```xml title=AndroidManifest.xml {7}
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
class MyApplication : Application() {
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

## Linking the Portal in a Layout File

One way to use Portals in android is directly in an XML layout file. Use the `portalId` attribute in the XML tag as shown below to link it to the Portal you created.

```xml
<?xml version="1.0" encoding="utf-8"?>
<io.ionic.portals.PortalView
    app:portalId="MY_FIRST_PORTAL"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

The `strings.xml` resources file can be used to ensure the Portal ids match up, but it isn't necessary to do so.

## Using a Portal in Code

Another way to use Portals in Android is to inflate a [PortalFragment](../reference/android/portal-fragment) with a Portal into a view. This method may be preferred if using a Portal in a [ViewPager](https://developer.android.com/training/animation/screen-slide-2) or a more dynamic UI structure. The following trivial example shows how to inflate a [PortalFragment](../reference/android/portal-fragment) into an existing FrameLayout.

```xml title=fragment_container.xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:id="@+id/my_portal_space"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</RelativeLayout>
```

<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
class MyContainerFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_container, container, false)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val myFirstPortal = getPortal("MY_FIRST_PORTAL")
        val portalFragment = PortalFragment(myFirstPortal)

        val fragmentManager: FragmentManager = childFragmentManager
        fragmentManager.beginTransaction().replace(R.id.my_portal_space, portalFragment).commit()
    }
}
```

</TabItem>
<TabItem value="java">

```java
public class MyContainerFragment extends Fragment {

    @Override
    public View onCreateView(@NonNull @NotNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_container, container, false);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Portal myFirstPortal = PortalManager.getPortal("MY_FIRST_PORTAL");
        PortalFragment portalFragment = new PortalFragment(myFirstPortal);

        final FragmentManager fragmentManager = getChildFragmentManager();
        fragmentManager.beginTransaction().replace(R.id.my_portal_space, portalFragment).commit();
    }
}
```

</TabItem>
</Tabs>

## Preparing the Containing Activity

Configuration changes in Android can cause WebViews to restart within an Activity. We recommend adding the following line of code in your application `AndroidManifest.xml` file for any Activity that will contain a Portal.

`android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"`

For example:

```xml
<activity
    android:name=".MainActivity"
    android:label="MyExampleApp"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

## Preparing the Gradle Build File

Some web assets can contain directories that start with special characters like an underscore, but by default Android will omit these from your built app. Override the default Android settings by adding the following snippet in the `defaultConfig` section of your module `build.gradle` file.

```groovy
aaptOptions {
    // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
    // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
    ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
}
```

For example:

```groovy
android {
    compileSdkVersion rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "com.myawesomecompany"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }

    ...
}
```

## Adding Web Code

Now that your Portal is successfully registered, created, and linked, you need to add the web assets to your application. The web code lives in folders under `src/main/assets`. You can use either many web applications or one "Single Page Application" (SPA) and dynamically link to the route you want to use. By default, the [PortalManager](../reference/android/portal-manager) will look in the folder named the same as the `portalId` used. You can use the [setStartDir()](../reference/android/portal-builder#setStartDir) function to set the web application's directory.

For more information on how to setup your web bundle, see our how-to guide on [how to pull in a web bundle](../how-to/pull-in-web-bundle).
