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

Capacitor [Core Plugins](https://capacitorjs.com/docs/apis) are plugins built by the Capacitor team and provided for you to use conveniently through public repositories.

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

After installing the dependency, Capacitor Plugins are automatically registered on initialization of the Capacitor runtime.

### Published Plugins

In CocoaPods, the Capacitor plugins are prepended with `Capacitor`. For example, the `@capacitor/storage` plugin on npm is named `CapacitorStorage` on CocoaPods. The following Plugins are available in CocoaPods.

**CapacitorActionSheet**

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

**CapacitorAppLauncher**

The AppLauncher API allows to open other apps

**CapacitorBrowser**

The Browser API provides the capability to open an in-app browser and subscribe to browser events.

**CapacitorCamera**

The Camera API provides the capability to take a photo with the camera or to choose photos from the photo album.

**CapacitorClipboard**

The Clipboard API enables copy and pasting to/from the system clipboard.

**CapacitorDevice**

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

**CapacitorDialog**

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts.

**CapacitorFilesystem**

The Filesystem API provides a NodeJS-like API for working with files on the device.

**CapacitorGeolocation**

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

**CapacitorHaptics**

The Haptics API provides physical feedback to the user through touch or vibration.

**CapacitorKeyboard**

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

**CapacitorLocalNotifications**

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

**CapacitorNetwork**

The Network API provides network and connectivity information.

**CapacitorPushNotifications**

The Push Notifications API provides access to native push notifications.

**CapacitorScreenReader**

The Screen Reader API provides access to TalkBack/VoiceOver/etc. and provides simple text-to-speech capabilities for visual accessibility.

**CapacitorShare**

The Share API provides methods for sharing content to any sharing-enabled apps that the user may have installed.

**CapacitorSplashScreen**

The Splash Screen API provides methods for showing or hiding a Splash image.

**CapacitorStatusBar**

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

**CapacitorStorage**

The Storage API provides a simple key/value persistent store for lightweight data.

**CapacitorTextZoom**

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**CapacitorToast**

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

In your project `Podfile`, define the path to the folder containing the plugin's Podspec file.

```ruby
pod 'CapacitorPluginName', :path => '../../webapp/node_modules/@custom-capacitor/plugin'
```

The path to the Podspec file is typically the source root of the plugin project, not in the platform specific subfolder.

### Register the Plugin

Plugins are automatically registered on iOS.
