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

### React Native Usage

In order to use a Capacitor Core Plugin, you need to install the plugin as a dependency in your `Podfile` and as a dependency in your `build.gradle` file. 

<Tabs>
  <TabItem value="podfile" label="Podfile">
   <CodeBlock className="language-ruby" title="Podfile">
{
`pod 'IonicPortals', '~> ${getPortalsVersionIos()}'
pod 'CapacitorPreferences', '~> ${getCapacitorVersion()}'
`.trim()
}
    </CodeBlock>
  </TabItem>
  <TabItem value="build.gradle" label="build.gradle">
    <CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
    implementation 'com.capacitorjs:preferences:${getCapacitorVersion()}'
}`.trim()
}
    </CodeBlock>
  </TabItem>
</Tabs>

:::caution
To avoid errors, make sure that the versions in your `build.gradle`, `Podfile`, and `package.json` match!
:::


When creating your portal, you will need to specify the Android classpath and the iOS Objective-C class name for the plugin you intend to use:

```jsx
import { PortalView } from "@ionic/portals-react-native";

const cameraPortal = {
  name: "cameraFeature",
  plugins: [
    {
      androidClassPath: "com.capacitorjs.plugins.camera.CameraPlugin",
      iosClassName: "CAPCameraPlugin"
    }
  ]
};

<PortalView portal={cameraPortal} />
```

### Published Plugins



**[Action Sheet](https://capacitorjs.com/docs/apis/action-sheet)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorActionSheet`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:action-sheet`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.actionsheet.ActionSheetPlugin",
  iosClassName: "ActionSheetPlugin"
}
```

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

**[App](https://capacitorjs.com/docs/apis/app)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorApp`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:app`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.app.AppPlugin",
  iosClassName: "AppPlugin"
}
```

The App API handles high level App state and events. For example, this API emits events when the app enters and leaves the foreground, handles deeplinks, opens other apps, and manages persisted plugin state.

**[App Launcher](https://capacitorjs.com/docs/apis/app-launcher)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorAppLauncher`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:app-launcher`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.applauncher.AppLauncherPlugin",
  iosClassName: "AppLauncherPlugin"
}
```

The AppLauncher API allows the opening of other apps.

**[Browser](https://capacitorjs.com/docs/apis/browser)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorBrowser`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:browser`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.browser.BrowserPlugin",
  iosClassName: "CAPBrowserPlugin"
}
```

The Browser API provides the capability to open an in-app browser and subscribe to browser events.

**[Camera](https://capacitorjs.com/docs/apis/camera)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorCamera`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:camera`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.camera.CameraPlugin",
  iosClassName: "CAPCameraPlugin"
}
```

The Camera API provides the capability to take a photo with the camera or to choose photos from the photo album.

**[Clipboard](https://capacitorjs.com/docs/apis/clipboard)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorClipboard`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:clipboard`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.clipboard.ClipboardPlugin",
  iosClassName: "ClipboardPlugin"
}
```

The Clipboard API enables copy and pasting to/from the system clipboard.

**[Device](https://capacitorjs.com/docs/apis/device)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorDevice`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:device`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.device.DevicePlugin",
  iosClassName: "DevicePlugin"
}
```

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

**[Dialog](https://capacitorjs.com/docs/apis/dialog)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorDialog`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:dialog`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.dialog.DialogPlugin",
  iosClassName: "DialogPlugin"
}
```

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts.

**[Filesystem](https://capacitorjs.com/docs/apis/filesystem)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorFilesystem`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:filesystem`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.filesystem.FilesystemPlugin",
  iosClassName: "FilesystemPlugin"
}
```

The Filesystem API provides a NodeJS-like API for working with files on the device.

**[Geolocation](https://capacitorjs.com/docs/apis/geolocation)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorGeolocation`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:geolocation`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.geolocation.GeolocationPlugin",
  iosClassName: "GeolocationPlugin"
}
```

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

**[Haptics](https://capacitorjs.com/docs/apis/haptics)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorHaptics`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:haptics`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.haptics.HapticsPlugin",
  iosClassName: "HapticsPlugin"
}
```

The Haptics API provides physical feedback to the user through touch or vibration.

**[Keyboard](https://capacitorjs.com/docs/apis/keyboard)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorKeyboard`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:keyboard`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.keyboard.KeyboardPlugin",
  iosClassName: "KeyboardPlugin"
}
```

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

**[Local Notifications](https://capacitorjs.com/docs/apis/local-notifications)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorLocalNotifications`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:local-notifications`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.localnotifications.LocalNotificationsPlugin",
  iosClassName: "LocalNotificationsPlugin"
}
```

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

**[Network](https://capacitorjs.com/docs/apis/network)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorNetwork`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:network`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.network.NetworkPlugin",
  iosClassName: "CAPNetworkPlugin"
}
```

The Network API provides network and connectivity information.

**[Preferences](https://capacitorjs.com/docs/apis/preferences)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorPreferences`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:preferences`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.preferences.PreferencesPlugin",
  iosClassName: "PreferencesPlugin"
}
```

The Preferences API provides a simple key/value persistent store for lightweight data.

**[Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorPushNotifications`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:push-notifications`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin",
  iosClassName: "PushNotificationsPlugin"
}
```

The Push Notifications API provides access to native push notifications.

**[Screen Reader](https://capacitorjs.com/docs/apis/screen-reader)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorScreenReader`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:screen-reader`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.screenreader.ScreenReaderPlugin",
  iosClassName: "ScreenReaderPlugin"
}
```

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

**[Share](https://capacitorjs.com/docs/apis/share)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorShare`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:share`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.share.SharePlugin",
  iosClassName: "SharePlugin"
}
```

The Share API provides methods for sharing content to any sharing-enabled apps that the user may have installed.

**[Splash Screen](https://capacitorjs.com/docs/apis/splash-screen)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorSplashScreen`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:splash-screen`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.splashscreen.SplashScreenPlugin",
  iosClassName: "SplashScreenPlugin"
}
```

The Splash Screen API provides methods for showing or hiding a Splash image.

**[Status Bar](https://capacitorjs.com/docs/apis/status-bar)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorStatusBar`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:status-bar`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.statusbar.StatusBarPlugin",
  iosClassName: "StatusBarPlugin"
}
```

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

**[Text Zoom](https://capacitorjs.com/docs/apis/text-zoom)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorTextZoom`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:text-zoom`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.textzoom.TextZoomPlugin",
  iosClassName: "TextZoomPlugin"
}
```

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**[Toast](https://capacitorjs.com/docs/apis/toast)**

<table>
  <tbody>
    <tr>
      <td>**Pod**</td><td>`CapacitorToast`</td>
    </tr>
    <tr>
      <td>**Maven**</td><td>`com.capacitorjs:toast`</td>
    </tr>
  </tbody>
</table>


```javascript
{
  androidClassPath: "com.capacitorjs.plugins.toast.ToastPlugin",
  iosClassName: "ToastPlugin"
}
```

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!

### Web Usage

Web Developers need to install the web dependencies of the plugins from `npm`. The packages are listed under the `@capacitor` scope. To install a plugin, run `npm i @capacitor/<plugin_name>` from the root of your web project.

:::warning
To avoid errors, make sure that the versions in your `Podfile`, `build.gradle`, and `package.json` all match!
:::

For more information on how to use Capacitor Plugins in your web application, [check out the Capacitor Plugin docs](https://capacitorjs.com/docs/apis).

## Other Plugins

Any plugin built for Capacitor can be linked in to a project using Portals even if it is not available through public native repositories like the core plugins are.

#### Download the Plugin

Get the source code for the plugin and integrate it into your web app. If it is a Capacitor plugin, it is likely that it will be available through NPM.

```shell
npm i @capacitor-community/stripe
```

#### Link the Plugin Natively

The native code from the plugin needs to be made available to each native project using Portals.

<Tabs
defaultValue="ios"
values={[
{ label: 'iOS', value: 'ios', },
{ label: 'Android', value: 'android', },
]}>
<TabItem value="ios">

In your project `Podfile`, define the path to the folder containing the plugin's Podspec file.

```ruby
pod 'CapacitorPluginName', :path => '../../webapp/node_modules/@custom-capacitor/plugin'
```

The path to the Podspec file is typically the source root of the plugin project, not in the platform specific subfolder.

</TabItem>
<TabItem value="android">

In your project `settings.gradle` file, define a path to the plugin android native project code.

```groovy
include ':capacitor-plugin-name'
project(':capacitor-plugin-name').projectDir = new File('../../webapp/node_modules/@custom-capacitor/plugin/android')
```

Then in your project module level `build.gradle` file, add the project to the dependencies.

```groovy
dependencies {
    implementation project(':capacitor-plugin-name')
    implementation 'io.ionic:portals:0.5.0'

    //...
}
```

If successful, you should now see a section in the Android Studio project browser for your plugin, be able to browse its source code, and reference classes in the plugin within your native application source code.

</TabItem>
</Tabs>

#### Register the Plugin

<Tabs
defaultValue="ios"
values={[
{ label: 'iOS', value: 'ios', },
{ label: 'Android', value: 'android', },
]}>
<TabItem value="ios">

Plugins are automatically registered on iOS.

</TabItem>
<TabItem value="android">

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

</TabItem>
</Tabs>
