---
title: How To Use a Capacitor Plugin
sidebar_label: Use a Capacitor Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

<head>
  <title>How to Use Capacitor Plugins: Core & Others | Ionic</title>
  <meta
    name="description"
    content="Learn how to use Capacitor Core Plugins as well as those made by the community. These allow portals to use native functionality with minimal configuration."
  />
</head>

Ionic Portals uses Capacitor under the hood, meaning that you can use [Capacitor Plugins](https://capacitorjs.com/docs/plugins) in your Portals. This means you can take advantage of our suite of [Capacitor Core Plugins](https://capacitorjs.com/docs/apis) in your Portals, as well as any plugins made by the community. These plugins allow Portals to use native functionality with minimal configuration by the native developer or the web developer.

## Core Plugins

Capacitor Core Plugins are plugins built by the Capacitor team and provided for you to use conveniently through public repositories.

### iOS Native Usage

In order to use a Capacitor Core Plugin, you need to install the plugin as a dependency in your `Podfile`.

<CodeBlock className="language-ruby" title="Podfile">
{
`pod 'IonicPortals', '~> ${getPortalsVersionIos()}'
pod 'CapacitorStorage', '~> 1.2.0'
`.trim()
}
</CodeBlock>

:::caution
To avoid errors, make sure that the versions in your `Podfile` and `package.json` match!
:::

Next, choose your [PluginRegistrationMode](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/pluginregistrationmode-swift.property).

[Constructor](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/init(name:startdir:index:bundle:initialcontext:pluginregistrationmode:liveupdatemanager:liveupdateconfig:)):

```swift
let portal = Portal(
  name: "foo",
  pluginRegistrationMode: .manual([.type(CameraPlugin.self)])
)

// or

let portal = Portal(
  name: "foo",
  pluginRegistrationMode: .automatic
)
```

[Portal.pluginRegistrationMode](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/pluginregistrationmode-swift.property) property:

```swift
var portal = Portal(name: "foo")
portal.pluginRegistrationMode = .manual([.type(CameraPlugin.self)])

// or

var portal = Portal(name: "foo")
portal.pluginRegistrationMode = .automatic
```

[Portal.adding(_:)](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/adding(_:)-72o29) methods:

```swift
let portal = Portal(name: "foo")
  .adding(CameraPlugin.self)
```


The Portal constructor defaults the `pluginRegistrationMode` to `PluginRegistrationMode.automatic`.
If you want all plugins to be automatically registered, then leaving the default should suffice. However if you have any plugins that inherit from `CAPInstancePlugin` (see [Defining your own Portal APIs](./define-api-in-typescript)) that need to be registered, all plugins will need to be manually registered.


### Published Plugins

In CocoaPods, the Capacitor plugins are prepended with `Capacitor`. For example, the `@capacitor/storage` plugin on npm is named `CapacitorStorage` on CocoaPods. The following Plugins are available in CocoaPods.

**[CapacitorActionSheet](https://capacitorjs.com/docs/apis/action-sheet)**

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

**[CappacitorApp](https://capacitorjs.com/docs/apis/app)**

The App API handles high level App state and events. For example, this API emits events when the app enters and leaves the foreground, handles deeplinks, opens other apps, and manages persisted plugin state.

**[CapacitorAppLauncher](https://capacitorjs.com/docs/apis/app-launcher)**

The AppLauncher API allows to open other apps

**[CapacitorBrowser](https://capacitorjs.com/docs/apis/browser)**

The Browser API provides the capability to open an in-app browser and subscribe to browser events.

**[CapacitorCamera](https://capacitorjs.com/docs/apis/camera)**

The Camera API provides the capability to take a photo with the camera or to choose photos from the photo album.

**[CapacitorClipboard](https://capacitorjs.com/docs/apis/clipboard)**

The Clipboard API enables copy and pasting to/from the system clipboard.

**[CapacitorDevice](https://capacitorjs.com/docs/apis/device)**

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

**[CapacitorDialog](https://capacitorjs.com/docs/apis/dialog)**

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts.

**[CapacitorFilesystem](https://capacitorjs.com/docs/apis/filesystem)**

The Filesystem API provides a NodeJS-like API for working with files on the device.

**[CapacitorGeolocation](https://capacitorjs.com/docs/apis/geolocation)**

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

**[CapacitorHaptics](https://capacitorjs.com/docs/apis/haptics)**

The Haptics API provides physical feedback to the user through touch or vibration.

**[CapacitorKeyboard](https://capacitorjs.com/docs/apis/keyboard)**

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

**[CapacitorLocalNotifications](https://capacitorjs.com/docs/apis/local-notifications)**

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

**[CapacitorMotion](https://capacitorjs.com/docs/apis/motion)**

The Motion API tracks accelerometer and device orientation (compass heading, etc.)

**[CapacitorNetwork](https://capacitorjs.com/docs/apis/network)**

The Network API provides network and connectivity information.

**[CapacitorPushNotifications](https://capacitorjs.com/docs/apis/push-notifications)**

The Push Notifications API provides access to native push notifications.

**[CapacitorScreenReader](https://capacitorjs.com/docs/apis/screen-reader)**

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

**[CapacitorShare](https://capacitorjs.com/docs/apis/share)**

The Share API provides methods for sharing content to any sharing-enabled apps that the user may have installed.

**[CapacitorSplashScreen](https://capacitorjs.com/docs/apis/splash-screen)**

The Splash Screen API provides methods for showing or hiding a Splash image.

**[CapacitorStatusBar](https://capacitorjs.com/docs/apis/status-bar)**

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

**[CapacitorStorage](https://capacitorjs.com/docs/apis/storage)**

The Storage API provides a simple key/value persistent store for lightweight data.

**[CapacitorTextZoom](https://capacitorjs.com/docs/apis/text-zoom)**

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**[CapacitorToast](https://capacitorjs.com/docs/apis/toast)**

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

In your project `Podfile`, define the path to the folder containing the plugin's Podspec file.

```ruby
pod 'CapacitorPluginName', :path => '../../webapp/node_modules/@custom-capacitor/plugin'
```

The path to the Podspec file is typically the source root of the plugin project, not in the platform specific subfolder.

#### Register the Plugin

Plugins are automatically registered on iOS.
