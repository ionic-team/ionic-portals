---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

## IonicPortals iOS 0.6.0 -> 0.6.1

IonicPortals iOS version 0.6.1 is compatible with '@ionic/portals' version 0.5.x

### Swift Package Manager Support

Add https://github.com/ionic-team/ionic-portals-ios in the Xcode "Swift Package Dependencies" tab in the project configuration. The suggested version range
is "Up to Next Minor Version" to prevent auto-updating to a breaking version before Ionic Portals iOS reaches version 1.0

### iOS 13.0 Support

The 0.5.x versions of Ionic Portals iOS required iOS 14.0. In this release we have included support for iOS 13.0 and up. To support iOS 13.0 in your app,
you should update your target to support the OS.
