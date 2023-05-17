---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## @ionic/portals 0.7.x -> 0.8.0

`@ionic/portals@0.8.0` is compatible with IonicPortals Android and iOS versions 0.8.x.


:::caution
@ionic/portals 0.8.0 is a notable update that requires Capacitor 5.
Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 5 Update Guide](https://capacitorjs.com/docs/updating/5-0) for an overview of necessary changes.
Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Breaking Changes

The `Portals` default export is no longer exposed. All methods are made available as individual module exports. 
If you wish to still use a `Portals` namespace to call, simply `import * as Portals from '@ionic/portals';`

The `subscribe` function now returns a `Promise<PluginListenerHandle>` instead of a number representing a "subscription reference".
`PluginListenerHandle` has a `remove` method that can be used for unsubscribing from events.
Since `PluginListenerHandle` is able to manage unsubscribing from events, the `unsubscribe` function has been removed from the API. 


## @ionic/portals 0.6.x -> 0.7.0

:::caution
Ionic Portals 0.7.0 is a notable update that upgrades the Capacitor dependency to version 4. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Updating Web Content

Update the Portals Plugin in your web content to `0.7.0`. Then, follow the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0#using-the-cli-to-migrate) CLI migration steps to update your web content that uses Capacitor.

### Update Native Projects

#### Dependency Version Alignment

The only necessary steps to use Portals version 0.7.0 should be to update dependencies. IonicPortals for iOS version 0.7.0 is compatible with Live Updates 0.2.2 and Official Capacitor Plugins over version 4.0.

### InitialContext Update

A default InitialContext is now always passed to the web content running in a Portal context such that the Portal name will always be accessible.

Before:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T;
}
```

After:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T | undefined;
}
```

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

