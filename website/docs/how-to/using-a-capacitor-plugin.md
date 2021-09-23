---
title: How To Use a Capacitor Plugin
sidebar_label: Use a Capacitor Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ionic Portals uses Capacitor under the hood, meaning that you can use existing Capacitor Plugins in your Portals. These plugins allow Portals to use native functionality without much setup on either the native or web developers part.

<Tabs 
    defaultValue="ios" 
    values={[
        { label: 'iOS', value: 'ios', },
        { label: 'Android', value: 'android', },
    ]}
>
<TabItem value="ios">

## Native Usage
In order to use a Capacitor Plugin, you need to install the plugin as a dependency in your `Podfile`.

```ruby
# Podfile
pod 'IonicPortals', '~> 0.2.0'
pod 'CapacitorStorage', '~> 1.2.0'
```

:::caution
Make sure that the versions in your `Podfile` and `package.json` match! Otherwise you could run into errors.
:::

After installing the dependency inject the Plugin to the Portal's [bridge](https://capacitorjs.com/blog/how-capacitor-works#native-bridge). You can do this in the [viewDidLoad](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload) function.

```swift
override func viewDidLoad() {
    // Inject the plugin into the native bridge
    apiPlugin = bridge?.plugin(withName: "MyPlugin") as? MyPlugin
    
    // now call super which will start the initial load
    super.viewDidLoad()
}
```

## Published Plugins

In CocoaPods, the Capacitor plugins are prepended with `Capacitor`. For example, the `@capacitor/storage` plugin on npm is named `CapacitorStorage` on CocoaPods. The following Plugins are available in CocoaPods.

### CapacitorActionSheet

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

### CapacitorAppLauncher

The AppLauncher API allows to open other apps

### CapacitorBrowser

The Browser API provides the ability to open an in-app browser and subscribe to browser events.

### CapacitorCamera

The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.

### CapacitorClipboard

The Clipboard API enables copy and pasting to/from the system clipboard.

### CapacitorDevice

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

### CapacitorDialog

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts

### CapacitorFilesystem

The Filesystem API provides a NodeJS-like API for working with files on the device.

### CapacitorGeolocation

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

### CapacitorHaptics

The Haptics API provides physical feedback to the user through touch or vibration.

### CapacitorKeyboard

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

### CapacitorLocalNotifications

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

### CapacitorNetwork

The Network API provides network and connectivity information.

### CapacitorPushNotifications

The Push Notifications API provides access to native push notifications.

### CapacitorScreenReader

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.
### CapacitorShare

The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed.

### CapacitorSplashScreen

The Splash Screen API provides methods for showing or hiding a Splash image.

### CapacitorStatusBar

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

### CapacitorStorage

The Storage API provides a simple key/value persistent store for lightweight data.

### CapacitorTextZoom

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

### CapacitorToast

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!

</TabItem>
<TabItem value="android">

## Usage 
In order to use a Capacitor Plugin, you need to install the plugin as a dependency in your `build.gradle` file.

```groovy
dependencies {
    implementation 'io.ionic:portals:0.2.0'
    implementation 'com.capacitorjs.storage:1.2.0'
}
```

:::caution
Make sure that the versions in your `build.gradle` and `package.json` match! Otherwise you could run into errors.
:::

Next, include it via the [PortalBuilder.setPlugins()](../reference/android/portal-builder#setplugins) or [PortalBuilder.addPlugin()](../reference/android/portal-builder#addplugin) functions.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

## Published Plugins

In MavenCentral, the Capacitor plugins are prepended with `com.capacitorjs`. For example, the `@capacitor/storage` plugin on npm is named `com.capacitorjs.storage` on Maven. The following Plugins are available in MavenCentral.

### com.capacitorjs.action-sheet

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

### com.capacitorjs.app-launcher

The AppLauncher API allows to open other apps

### com.capacitorjs.browser

The Browser API provides the ability to open an in-app browser and subscribe to browser events.

### com.capacitorjs.camera

The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.

### com.capacitorjs.clipboard

The Clipboard API enables copy and pasting to/from the system clipboard.

### com.capacitorjs.device

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

### com.capacitorjs.dialog

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts

### com.capacitorjs.filesystem

The Filesystem API provides a NodeJS-like API for working with files on the device.

### com.capacitorjs.geolocation

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

### com.capacitorjs.haptics

The Haptics API provides physical feedback to the user through touch or vibration.

### com.capacitorjs.keyboard

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

### com.capacitorjs.local-notifications

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

### com.capacitorjs.network

The Network API provides network and connectivity information.

### com.capacitorjs.push-notifications

The Push Notifications API provides access to native push notifications.

### com.capacitorjs.screen-reader

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

### com.capacitorjs.share

The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed.

### com.capacitorjs.splash-screen

The Splash Screen API provides methods for showing or hiding a Splash image.

### com.capacitorjs.status-bar

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

### com.capacitorjs.storage

The Storage API provides a simple key/value persistent store for lightweight data.

### com.capacitorjs.text-zoom

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

### com.capacitorjs.toast

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!


</TabItem>
</Tabs>

## Web Usage
Web Developers need to install the web dependency of the plugins from `npm`. The packages are listed under the `@capacitor` scope. To install a plugin, run `npm i @capacitor/<plugin_name>` at the root of your web project.

:::warning
Make sure that the versions in your `Podfile`, `build.gradle`, and `package.json` all match! Otherwise you will run into errors
:::

For more information on how to use Capacitor Plugins in your web application, [check out the Capacitor Plugin docs](https://capacitorjs.com/docs/apis).
