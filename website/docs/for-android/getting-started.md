---
title: Using Portals in Android
sidebar_label: Using Portals in Android
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you [obtain an API key](./guide#signup) and [install Ionic Portals](./guide#install), you can start creating Portals for your application.

## Creating a Custom Application Class

In Android, you will have to register your Portals instance via the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html). To do this, a custom [Application](https://developer.android.com/reference/android/app/Application) class is recommended. In this Application class, you can override `Application#onCreate()` to register and create Portals. We recommend placing this register call inside the custom `Application` class so that it is handled immediately when your app is launched, but you can place it anywhere in an app as long as it is called before any Portals are loaded.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin title=MyApplication.kt
class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("YOUR_PORTALS_KEY")
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
        PortalManager.register("YOUR_PORTALS_KEY");
        // setup portals
    }
}
```

</TabItem>
</Tabs>

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
On Android, you can use the [Secrets Gradle Plugin](https://github.com/google/secrets-gradle-plugin) to keep it out of a public repository.
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

The [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) provides convenience functions to handle the storing and retrieving of information about Portals used in your app. When using it, we recommend creating your portals in the custom `Application` class in the same place where Portals is registered so that all the required information for Portals to function is available immediately to the SDK every time the app is launched. If you prefer to have more granular control over the creation and storing of Portals data, and where it occurs in your app, we recommend creating Portals using the [PortalBuilder](./getting-started#creating-a-portal-via-portalbuilder).

After registering via the [PortalManager.register()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html#-1847662668%2FFunctions%2F-149544105) function, you can create Portals. Use the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) to quickly create a [Portal](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) and link it to an XML layout.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("YOUR_PORTALS_KEY")

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
        PortalManager.register("YOUR_PORTALS_KEY");

        String portalId = "MY_FIRST_PORTAL";
        PortalManager.newPortal(portalId).create();
    }
}
```

</TabItem>
</Tabs>

Now, the [Portal](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) is successfully created and managed by the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html).

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

Another way to use Portals in Android is to inflate a [PortalFragment](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-fragment/index.html) with a Portal into a view. This method may be preferred if using a Portal in a [ViewPager](https://developer.android.com/training/animation/screen-slide-2) or a more dynamic UI structure. The following trivial example shows how to inflate a [PortalFragment](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-fragment/index.html) into an existing FrameLayout.

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
]}>
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

## Jetpack Compose

Portals can be used with [Jetpack Compose](https://developer.android.com/jetpack/compose). Make sure that Activities containing Portals extend `AppCompatActivity()` so that the AppCompat Fragment APIs are available to them.

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyThemeName {
                Surface(
                    modifier = Modifier.fillMaxSize()
                ) {
                    loadPortal("myPortalName")
                }
            }
        }
    }
}

@Composable
fun loadPortal(portalId: String) {
    AndroidView(factory = {
        PortalView(it, portalId)
    })
}
```

:::note
Jetpack Compose support is new. If you encounter any issues, please [open an issue](https://github.com/ionic-team/ionic-portals-android) in our repository.
:::

## Creating a Portal via PortalBuilder

The [PortalBuilder](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-builder/index.html) provides a way to create Portal objects without relying on the `PortalManager` class convenience functions. This might be useful if you want to use Portals in a custom library, or need a more advanced way to have granular control around how Portals works with your applicaion lifecycle.

Create a Portal in your app code using `PortalBuilder`:

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val portal: Portal = PortalBuilder("myPortal")
    .addPlugin(MyCapacitorPlugin::class.java)
    .setPortalFragmentType(MyFadeInOutPortalFragment::class.java)
    .setInitialContext(mapOf("myVariableFromAndroid" to 42))
    .setStartDir("web_app")
    .create()
```

</TabItem>
<TabItem value="java">

```java
Portal portal = new PortalBuilder("myPortal")
    .addPlugin(MyCapacitorPlugin.class)
    .setPortalFragmentType(MyFadeInOutPortalFragment.class)
    .setInitialContext(Map.of("myVariableFromAndroid", 42))
    .setStartDir("web_app")
    .create();
```

</TabItem>
</Tabs>

Once created, you may use your Portal object to create views:

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
// Make a PortalFragment with your Portal
val myPortalFragment = PortalFragment(portal)

// Make a PortalView with your Portal
val myPortalView = PortalView(context, portal)
```

</TabItem>
<TabItem value="java">

```java
// Make a PortalFragment with your Portal
PortalFragment myPortalFragment = new PortalFragment(portal);

// Make a PortalView with your Portal
PortalView myPortalView = new PortalView(context, portal);
```

</TabItem>
</Tabs>

Since the `PortalManager` is not used with these objects, make sure to retain them to be used in a way that suits your needs.

:::warning
Do not retain **view** objects outside of the Activity lifecycle.
:::

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

Now that your Portal is successfully registered, created, and linked, you need to add the web assets to your application. The web code lives in folders under `src/main/assets`. You can use either many web applications or one "Single Page Application" (SPA) and dynamically link to the route you want to use. By default, the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) will look in the folder named the same as the `portalId` used. You can use the [setStartDir()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-builder/index.html#-1989968072%2FFunctions%2F-149544105) function to set the web application's directory.

For more information on how to setup your web bundle, see our how-to guide on [how to pull in a web bundle](./how-to/pull-in-web-bundle).
