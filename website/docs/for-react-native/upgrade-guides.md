---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## @ionic/portals-react-native 0.4.0 -> 0.5.0

`@ionic/protals-react-native` version 0.5.0 updates the underlying native IonicPortals libraries to ^0.8.0. This update includes breaking changes to the API. Please read the following carefully to ensure a smooth upgrade.

### API Changes

#### Breaking

##### Pub/Sub

The pub/sub functionality has been overhauled to lean on React Native's existing event system. To that end, the `subscribe`
method been updated to return an `EmitterSubscription` and the `unsubscribe` method has been removed. To stop receiving events,
call the `remove()` method on the `EmitterSubscription` returned from `subscribe`.

## @ionic/portals-react-native 0.3.0 -> 0.4.0

### API Changes

#### Breaking

##### Live Updates

Updated return values for Live Updates related methods to include more metadata to include the snapshot metadata,
the source of the live update (local cache or download), and whether or not the active application path has changed.
Affected methods:

- `syncOne`
- `syncSome`
- `syncAll`

##### Capacitor Plugins

Capacitor Plugin registration now requires including the iOS Objective-C class name. See [How to Use a Capacitor Plugin](../for-react-native/how-to/using-a-capacitor-plugin#react-native-usage) for the updated API requirements

#### New

##### Shared Assets

You can now share assets between portals by exposing a location on the
device to pull assets from. See [Sharing Assets](../for-react-native/how-to/sharing-assets) for more information.

##### Web Vitals

It is now possible to measure a number of web vitals metrics from your
portals in React Native. See [Web Vitals](../for-web/web-vitals#react-native) for more information.

## @ionic/portals-react-native 0.2.0 -> 0.3.0

The iOS, Android, and web libraries have all been updated to depend on Capacitor 4. There are no React Native specific code changes needed to adopt these features. However, it will be necessary to follow the [iOS](../for-ios/upgrade-guides#ionicportals-06x---070) and [Android](../for-android/upgrade-guides#ionicportals-06x---070) upgrade guides to ensure a successful migration.

## @ionic/portals-react-native 0.1.x -> 0.2.0

### API Changes

#### Breaking

Updated function signatures to be `async` for the following functions:

- `register`
- `addPortal`
- `syncOne`
- `syncSome`
- `syncAll`

Due to being native calls, these functions were already asynchronous. However, synchronizing these calls via `await` was impossible due the lack of exposing `async` via the API. This made all calls to these methods that didn't return a `Promise` to be fire-and-forget. These API updates allow the user to make that choice at the call-site for themselves.

#### New

- `addPortals` - enables adding all `Portal`s in a single call instead of having to make N calls to `addPortal` for each `Portal` to register.
- `getPortal` - enables retrieving a `Portal` by name
- `enableSecureLiveUpdates` - Enables secure live updates for applications if available in App Flow. You must call **and** await this method before adding any `Portal`s through
  `addPortal` or `addPortals`. If you don't await `enableSecureLiveUpdates`, you will be unable to sync `LiveUpdate`s in the application.

### Static Portal Configuration

An additional configuration method is now included to support a JSON configuration file to configure Portals on application start. The JSON file must be named `portals.config.json` and be placed in the application root on iOS and `assets` root on Android.

#### JSON Schema

This Typescript schema is for illustration purposes only.

```typescript
type PortalConfig = {
  liveUpdatesKey?: string; // The name of the public key file for secure live updates. Must be located in the Bundle.main root on iOS and assets root on Android
  registrationKey?: string; // The portals registration key normally passed to `register`
  portals: []Portal;
}

type Portal = {
  name: string;
  startDir?: string;
  initialContext?: {
    [key: string]: any;
  };
  index?: string;
  liveUpdate?: LiveUpdate
};

type LiveUpdate = {
  appId: string;
  channel: string;
  syncOnAdd: boolean;
};
```

At a minimum, when including a `portals.config.json` it must at least have the `portals` key defined with at least one valid `Portal` definition in the array. If you are using Live Updates, you must include a `LiveUpdate` configuration. If you are using Secure Live Updates, you must include the `liveUpdatesKey` in the configuration.

## @ionic/portals 0.0.x -> 0.6.0

### `Portals.publish()`

The method signature of `Portals.publish()` now allows generic typing over `PortalMessage` instead of restricting generic typing to the `data` parameter of `PortalMessage`. The `message` parameter must be of type `string` but can be predefined to prevent typos, invalid topic names, etc.

Before:

```typescript
Portals.publish<string>({ topic: "foo", data: "bar" });
```

After:

```typescript
type ValidMessage = { topic: "foo"; data: string };

// TypeScript will reject the following statement:
Portals.publish<ValidMessage>({ topic: "food", data: 1 });
```

### `Portals.getInitialContext()`

`Portals.getInitialContext()` is no longer asynchronous and has been moved out of the `Portals` class.

Before:

```typescript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Portals from "@ionic/portals";
import { Capacitor } from "@capacitor/core";

if (!Capacitor.isNativePlatform()) {
  // do something
  (window as any).portalInitialContext = {
    value: { startingRoute: "/" },
  };
}

Portals.getInitialContext<{ startingRoute: string }>().then((context) => {
  ReactDOM.render(
    <React.StrictMode>
      <App context={context.value} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
```

After:

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Portals, { getInitialContext } from '@ionic/portals';
import { Capacitor } from '@capacitor/core';

const initialContext = getInitialContext<{ startingRoute: string }>;
const startingRoute = initialContext?.value ?? { startingRoute: '/' };

ReactDOM.render(
  <React.StrictMode>
    <App context={startingRoute} />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

## @ionic/portals-react-native 0.0.x -> 0.1.0

The props on `PortalView` have changed from having individual props of `name` and `initialContext` to a single prop named `portal`.

Before:

```javascript
<PortalView name="foo" initialContext={{ bar: "baz" }} />
```

After:

```javascript
<PortalView
  portal={{
    name: "foo",
    initialContext: {
      bar: "baz",
    },
  }}
/>
```
