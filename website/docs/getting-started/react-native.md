---
title: Using Portals in React Native
sidebar_label: Using Portals in React Native
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you [obtain an API key](./guide#signup) and [install Ionic Portals](./guide#install), you can start creating Portals for your application.

## Registering with your Portals Key
```javascript
import { register } from '@ionic/portals-react-native';

register('YOUR_PORTAL_KEY_HERE');
```

## Creating a Portal and Rendering It
Create a Portal and add it to the portal registry:
```javascript
import { addPortal } from '@ionic/portals-react-native';
const helloPortal = {
  // A unique name to reference later
  name: 'hello',
  // This is the location of your web bundle relative to the asset directory in Android and Bundle.main in iOS
  // This will default to the name of the portal
  startDir: 'portals/hello', 
  // Any initial state to be provided to a Portal if needed
  initialContext: {
    greeting: 'Hello, world!'
  }
};

addPortal(helloPortal);
```

Create a PortalView in your view hierarchy:
```javascript
import { PortalView } from '@ionic/portals-react-native';

<PortalView 
  // The name of the portal to be used in the view
  name='hello' 

  // Set any initial context you may want to override.
  initialContext={{ greeting: 'Goodbye!' }}

  // Setting a size is required
  style={{ flex: 1, height: 300 }} 
  />
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
Because many of the Ionic Portals dependencies are comprised of Swift code and have custom module maps, you will need to add `use_frameworks!` to your iOS Podfile and remove `use_flipper!()`

## Communicating between React Native and Web
One of the key features of Ionic Portals for React Native is facilitating communication between the web and React Native layers of your application.
Publishing a message to the web:
```javascript
import { publish } from '@ionic/portals-react-native';

publish('topic', { number: 1 })
```

Subscribe to messages from the web:
```javascript
import { subscribe } from '@ionic/portals-react-native';

let subscriptionReference = await subscribe('topic', message => {
  // Here you have access to:
  // message.data - Any data sent from the web
  // message.subscriptionRef - The subscription reference used to manage the lifecycle of the subscription
  // message.topic - The topic the message was published on
})
```

When you no longer need to receive events, unsubscribe:
```javascript
import { unsubscribe } from '@ionic/portals-react-native';

unsubscribe('channel:topic', subscriptionReference)
```

To see an example of Portals Pub/Sub in action that manages the lifecycle of a subscription with the lifecycle of a React Native component, refer to the [`PubSubLabel`](https://github.com/ionic-team/react-native-ionic-portals/blob/af19df0d66059d85ab8dde493504368c3bf39127/example/App.tsx#L53) implementation in the example project of the `@ionic/portals-react-native` source repo.

## Using Capacitor Plugins
If you need to use any Capacitor plugins, the classpath of the Android plugins will have to be provided to the `Portal` `androidPlugins` property. 

```javascript
const helloPortal = {
  name: 'hello',
  startDir: 'portals/hello', 
  androidPlugins: ['com.capacitorjs.plugins.camera.CameraPlugin'],
  initialContext: {
    greeting: 'Hello, world!'
  }
};
```

No configuration for iOS is needed since plugins are automatically registered when the Capacitor bridge initializes on iOS.

## Bundling Your Web Apps
Currently there is no tooling for bundling your web apps directly as part of @ionic/portals-react-native. Please follow the [native guides](../how-to/pull-in-web-bundle#setup-the-web-asset-directory) to manage this as part of the native build process.

