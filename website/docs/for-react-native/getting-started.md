---
title: Using Portals in React Native
sidebar_label: Using Portals in React Native
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you [obtain an API key](./guide.md#signup) and [install Ionic Portals](./guide.md#install), you can start creating Portals for your application.

## Registering with your Portals Key

```javascript
import { register } from '@ionic/portals-react-native';

await register('YOUR_PORTAL_KEY_HERE');
```

## Creating a Portal and Rendering It

Create a PortalView in your view hierarchy:

```javascript
import { PortalView } from '@ionic/portals-react-native';

const helloPortal = {
  // A unique name to reference later
  name: 'hello',
  // This is the location of your web bundle relative to the asset directory in Android and Bundle.main in iOS
  // This will default to the name of the portal
  startDir: 'portals/hello',
  // Any initial state to be provided to a Portal if needed
  initialContext: {
    greeting: 'Hello, world!',
  },
};

<PortalView
  portal={helloPortal}
  // Setting a size is required
  style={{ flex: 1, height: 300 }}
/>;
```

## iOS Specific Configuration

### AppDelegate

Both Capacitor and React Native have classes named `AppDelegate`. To prevent a clash that can prevent your React Native application from launching,
you will need to rename `AppDelegate` to something else:

```objc
// AppDelegate.h
@interface RNAppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
```

```objc
// AppDelegate.m
@implementation RNAppDelegate
@end
```

```objc
// main.m
#import <UIKit/UIKit.h>

#import "AppDelegate.h"

int main(int argc, char *argv[])
{
  @autoreleasepool {
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([RNAppDelegate class]));
  }
}
```

### Podfile

There are two methods you may use to ensure Portals can integrate into your React Native application: a custom `pre_install` hook or adding `use_frameworks!` to your Podfile. Only one of these approaches is needed to ensure that Capacitor is compiled as a dynamic framework.

#### pre_install

Using the `pre_install` hook allows you to keep all the other React Native dependencies as static frameworks:

```ruby
# These frameworks are required to be dynamic.
dynamic_frameworks = ['Capacitor', 'CapacitorCordova']

pre_install do |installer|
  installer.pod_targets.each do |pod|
    if dynamic_frameworks.include?(pod.name)
      def pod.static_framework?
        false
      end
      def pod.build_type
        Pod::BuildType.dynamic_framework
      end
    end
  end
end
```

#### use_frameworks

Alternative to the `pre_install` hook, you can add `use_frameworks!` to your Podfile application target. This forces all dependencies to be dynamic frameworks. Using this approach requires removing `use_flipper!()` from the Podfile.

## Communicating between React Native and Web

One of the key features of Ionic Portals for React Native is facilitating communication between the web and React Native layers of your application.
Publishing a message to the web:

```javascript
import { publish } from '@ionic/portals-react-native';

publish('topic', { number: 1 });
```

Subscribe to messages from the web:

```javascript
import { subscribe } from '@ionic/portals-react-native';

// The subscribe function returns an EmitterSubscription that can be used to unsubscribe from events
let emitterSubscription = subscribe('topic', (message) => {
  // Here you have access to:
  // message.data - Any data sent from the web
  // message.topic - The topic the message was published on
});

// To unsubscribe
emitterSubscription.remove();
```

To see an example of Portals Pub/Sub in action that manages the lifecycle of a subscription with the lifecycle of a React Native component, refer to the [`PubSubLabel`](https://github.com/ionic-team/ionic-portals-react-native/blob/bbc42ccf364e7aef71519dedbc8ada38b0a45f75/example/App.tsx#L53df39127/example/App.tsx#L53) implementation in the example project of the `@ionic/portals-react-native` source repo.

## Using Capacitor Plugins

If you need to use any Capacitor plugins, the classpath of the Android plugins and the Objective-C class name will have to be provided to the `Portal` `plugins` property.

```javascript
const helloPortal = {
  name: 'hello',
  startDir: 'portals/hello',
  plugins: [
    {
      androidClassPath: 'com.capacitorjs.plugins.camera.CameraPlugin',
      iosClassName: 'CAPCameraPlugin',
    },
  ],
  initialContext: {
    greeting: 'Hello, world!',
  },
};
```

## Bundling Your Web Apps

Currently there is no tooling for bundling your web apps directly as part of @ionic/portals-react-native. Please follow the [native guides](./how-to/pull-in-web-bundle.md#setup-the-web-asset-directory) to manage this as part of the native build process.
