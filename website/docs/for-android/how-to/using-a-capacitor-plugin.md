---
title: How To Use a Capacitor Plugin
sidebar_label: Use a Capacitor Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getPortalsVersion, getCapacitorVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

<head>
  <title>How to Use Capacitor Plugins: Core & Others | Ionic</title>
  <meta
    name="description"
    content="Learn how to use Capacitor Core Plugins as well as those made by the community. These allow portals to use native functionality with minimal configuration."
  />
</head>

Ionic Portals uses Capacitor under the hood, meaning that you can use [Capacitor Plugins](https://capacitorjs.com/docs/plugins) in your Portals. This means you can take advantage of our suite of [Capacitor Core Plugins](https://capacitorjs.com/docs/apis) in your Portals, as well as any plugins made by the community. These plugins allow Portals to use native functionality with minimal configuration by the native developer or the web developer.

## Core Plugins

Capacitor [Core Plugins](https://capacitorjs.com/docs/apis) are plugins built by the Capacitor team and provided for you to use conveniently through public repositories.

### Android Native Usage

In order to use a Capacitor Core Plugin, you need to install the plugin as a dependency in your `build.gradle` file.

<CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
    implementation 'com.capacitorjs.preferences:${getCapacitorVersion()}'
}`.trim()
}
</CodeBlock>

:::caution
To avoid errors, make sure that the versions in your `build.gradle` and `package.json` match!
:::

Next, include it via the [PortalBuilder.setPlugins()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-builder/index.html#1068344084%2FFunctions%2F-149544105) or [PortalBuilder.addPlugin()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-builder/index.html#-1462066834%2FFunctions%2F-149544105) functions.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
var builder: PortalBuilder = someValue
builder = builder.addPlugin(MyPlugin::class.java)
```

</TabItem>

<TabItem value="java">

```java
PortalBuilder builder = someValue;
builder = builder.addPlugin(MyPlugin.class)
```

</TabItem>

</Tabs>

### Published Plugins

In MavenCentral, the Capacitor plugins are prepended with `com.capacitorjs`. For example, the `@capacitor/preferences` plugin on npm is named `com.capacitorjs:preferences` on Maven. The following Plugins are available in MavenCentral.

**[com.capacitorjs:action-sheet](https://capacitorjs.com/docs/apis/action-sheet)**

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

**[com.capacitorjs:app](https://capacitorjs.com/docs/apis/app)**

The App API handles high level App state and events. For example, this API emits events when the app enters and leaves the foreground, handles deeplinks, opens other apps, and manages persisted plugin state.

**[com.capacitorjs:app-launcher](https://capacitorjs.com/docs/apis/app-launcher)**

The AppLauncher API allows the opening of other apps.

**[com.capacitorjs:browser](https://capacitorjs.com/docs/apis/browser)**

The Browser API provides the capability to open an in-app browser and subscribe to browser events.

**[com.capacitorjs:camera](https://capacitorjs.com/docs/apis/camera)**

The Camera API provides the capability to take a photo with the camera or to choose photos from the photo album.

**[com.capacitorjs:clipboard](https://capacitorjs.com/docs/apis/clipboard)**

The Clipboard API enables copy and pasting to/from the system clipboard.

**[com.capacitorjs:device](https://capacitorjs.com/docs/apis/device)**

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

**[com.capacitorjs:dialog](https://capacitorjs.com/docs/apis/dialog)**

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts.

**[com.capacitorjs:filesystem](https://capacitorjs.com/docs/apis/filesystem)**

The Filesystem API provides a NodeJS-like API for working with files on the device.

**[com.capacitorjs:geolocation](https://capacitorjs.com/docs/apis/geolocation)**

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

**[com.capacitorjs:haptics](https://capacitorjs.com/docs/apis/haptics)**

The Haptics API provides physical feedback to the user through touch or vibration.

**[com.capacitorjs:keyboard](https://capacitorjs.com/docs/apis/keyboard)**

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

**[com.capacitorjs:local-notifications](https://capacitorjs.com/docs/apis/local-notifications)**

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

**[com.capacitorjs:network](https://capacitorjs.com/docs/apis/network)**

The Network API provides network and connectivity information.

**[com.capacitorjs:preferences](https://capacitorjs.com/docs/apis/preferences)**

The Preferences API provides a simple key/value persistent store for lightweight data.

**[com.capacitorjs:push-notifications](https://capacitorjs.com/docs/apis/push-notifications)**

The Push Notifications API provides access to native push notifications.

**[com.capacitorjs:screen-reader](https://capacitorjs.com/docs/apis/screen-reader)**

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

**[com.capacitorjs:share](https://capacitorjs.com/docs/apis/share)**

The Share API provides methods for sharing content to any sharing-enabled apps that the user may have installed.

**[com.capacitorjs:splash-screen](https://capacitorjs.com/docs/apis/splash-screen)**

The Splash Screen API provides methods for showing or hiding a Splash image.

**[com.capacitorjs:status-bar](https://capacitorjs.com/docs/apis/status-bar)**

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

**[com.capacitorjs:text-zoom](https://capacitorjs.com/docs/apis/text-zoom)**

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**[com.capacitorjs:toast](https://capacitorjs.com/docs/apis/toast)**

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!

### Web Usage

Web Developers need to install the web dependencies of the plugins from `npm`. The packages are listed under the `@capacitor` scope. To install a plugin, run `npm i @capacitor/<plugin_name>` from the root of your web project.

:::warning
To avoid errors, make sure that the versions in your `Podfile`, `build.gradle`, and `package.json` all match!
:::

For more information on how to use Capacitor Plugins in your web application, [check out the Capacitor Plugin docs](https://capacitorjs.com/docs/apis).

## Other Plugins

Any plugin built for Capacitor can be linked in to a project using Portals even if it is not available through public native repositories like the core plugins are.

### Download the Plugin

Get the source code for the plugin and integrate it into your web app. If it is a Capacitor plugin, it is likely that it will be available through NPM.

```shell
npm i @capacitor-community/stripe
```

### Link the Plugin Natively

The native code from the plugin needs to be made available to each native project using Portals.

In your project `settings.gradle` file, define a path to the plugin android native project code.

```groovy
include ':capacitor-plugin-name'
project(':capacitor-plugin-name').projectDir = new File('../../webapp/node_modules/@custom-capacitor/plugin/android')
```

Then in your project module level `build.gradle` file, add the project to the dependencies.

<CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation project(':capacitor-plugin-name')
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
    //...
}`.trim()
}
</CodeBlock>

If successful, you should now see a section in the Android Studio project browser for your plugin, be able to browse its source code, and reference classes in the plugin within your native application source code.

### Register the Plugin

Register the plugin with a portal to use it.

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
        PortalManager.newPortal(portalId)
                     .addPlugin(MyCapacitorPlugin::class.java)
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
        PortalManager.register("YOUR_PORTALS_KEY");

        String portalId = "MY_FIRST_PORTAL";
        PortalManager.newPortal(portalId)
                     .addPlugin(MyCapacitorPlugin.class)
                     .create();
    }
}
```

</TabItem>
</Tabs>
