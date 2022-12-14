---
title: How To Define a Portal API
sidebar_label: Define your own Portal APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

One of the biggest benefits of including Ionic Portals in an application is the ability to easily communicate between web and native code using the [PortalsPlugin](../../portals-plugin). 
However, to make the integration between a Portal and your native application more seamless, creating your own Plugins may be necessary.
By creating a [Capacitor Plugin](https://capacitorjs.com/docs/plugins/creating-plugins), you can create your own API to communicate between web and native code.

There are two types of plugins you can create: Instance and Singleton. In the first example, we will create an instance plugin that performs a fade-in animation when a Portal has finished loading.
In the second example, we will create a simple singleton plugin that echoes back its input.

For this example, we will create a Plugin called `EchoPlugin` that has a single function: `echo`.

## Instance Plugin - PortalLoaded

### Creating the API Definition

We strongly recommend using TypeScript to create a type definition file which can be used to define your API.
This way, there is a central source of truth for the API across Android and iOS as well as having type definitions
for web code.

```typescript title=PortalLoadedPlugin/definitions.ts 
export interface PortalLoadedPlugin {
  portalLoaded(): Promise<void>
}
```

On the iOS side, the `PortalLoadedPlugin` class will have to implement a method that matches this type signature.

### Implementing the API

```swift title=PortalLoadedPlugin.swift
@objc(PortalLoadedPlugin)
class PortalLoadedPlugin: CAPInstancePlugin {
  let onPortalLoaded: () -> Void

  init(onPortalLoaded: @escaping () -> Void) {
    self.onPortalLoaded = onPortalLoaded
    super.init()
  }

  @objc func portalLoaded(_ call: CAPPluginCall) {
    onPortalLoaded()
    call.resolve()
  }
}
```

:::info
You'll also need a file called `PortalLoadedPlugin.m` to create Objective-C bindings through helper macros that Capacitor provides.
Below is an example `PortalLoadedPlugin` Objective-C bindings:

```c title=PortalLoadedPlugin.m
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(PortalLoadedPlugin, "PortalLoadedPlugin",
  CAP_PLUGIN_METHOD(portalLoaded, CAPPluginReturnNone);
)
```

:::


### Using the PortalLoadedPlugin

To use the `PortalLoadedPlugin` class, we need to create an instance of it and add it to the portal to be rendered. In our example, we'll fade
the view in over half a second to ease the transition so we don't get an initial page flash when the portal is rendered.

```swift title=PortalViewController.swift
import UIKit
import IonicPortals

class PortalViewController: UIViewController {
  // Create an instance of PortalLoadedPlugin to fade-in the 
  // portal when our method has been called.
  lazy var loadedPlugin = PortalLoadedPlugin { [weak self] in 
    DispatchQueue.main.async {
      UIView.animate(withDuration: 0.5) {
        self?.portalView.alpha = 1.0
      }
    }
  }()

  // Create the PortalUIView by passing in our portal with the 
  // instance of `PortalLoadedPlugin` added
  lazy var portalView: PortalUIView = {
    let portalView = PortalUIView(
      portal: Portal(name: "foo")
        .adding(loadedPlugin)
    )

    portalView.alpha = 0
    return portalView
  }()

  // Add portalView to the view hierarchy
  override func viewDidLoad() {
    super.viewDidLoad()
    portalView.translatesAutoresizingMasksIntoConstraints = false
    view.addSubview(portalView)
    NSLayoutConstraint.activate([
      portalView.topAnchor.constraint(equalTo: view.topAnchor),
      portalView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
      portalView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
      portalView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    ])
  }
}
```

### Calling the Plugin Code from the Web

Once the Plugin has been defied, implemented, and initialized in the native code, it will also need to be registered on the web.

```typescript title=PortalLoadedPlugin/PortalLoadedPlugin.ts
import { registerPlugin } from '@capacitor/core';
import { PortalLoadedPlugin } from '../definitions';

const PortalLoaded = registerPlugin<PortalLoadedPlugin>('PortalLoaded', {
 // We create a no-op on the web for development purposes. This no-op plugin will only be loaded when running the plugin 
 // in a browser during development like Chrome or Safari.
  web: { portalLoaded: () -> {} },
});

export const portalLoaded = () => {
  const onPageLoad = async () => {
    PortalLoaded.portalLoaded();
  };

  // Check if the page has already loaded
  if (document.readyState === 'complete') {
    onPageLoad();
  } else {
    window.addEventListener('load', onPageLoad);
  }
};
```

```typescript title=PortalLoadedPlugin/index.ts
export { portalLoaded } from './PortalLoadedPlugin';
export * from './definitions';
```

:::info

This code is not directly exposing the initialized PortalLoaded class outside of the module.
In this scenario, we don't want the method triggered for any reason other than when the page is loaded, so we guard that
method behind a pure web implementation. If the web code was not needed, we would have just exported this plugin instance directly.

:::

Then, call the method at the start of the web application:

```typescript title=index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { portalLoaded } from './PortalLoadedPlugin'

portalLoaded();

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
```

## Singleton Plugin - EchoPlugin

### Creating API Definitions

We strongly recommend using TypeScript to create a type definition file which can be used to define your API.
This way, there is a central source of truth for the API across Android and iOS as well as having type definitions for the web code.

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
```

On the iOS side, the `EchoPlugin` class will need to match this type signature.

:::info
If you are not using TypeScript, you can skip this step, but you'll need to take steps to make sure that the method signatures across Android and iOS match if you are using reusing Portals across multiple mobile applications.
:::

### Implementing the API

First, you'll need to [install the proper dependencies](../quick-start). You can now start building the plugin. In this example, the `EchoPlugin` will extend the base Capacitor `Plugin` class and implement the API that was defined in the previous step.

```swift title=EchoPlugin.swift
import Capacitor

@objc(MYEchoPlugin)
public class EchoPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value");
    print(value);
  }
}
```

:::info
You'll also need a file called `EchoPlugin.m` to create Objective-C bindings through helper macros that Capacitor provides. Below is an example of `EchoPlugin` Objective-C bindings.

```c title=EchoPlugin.m
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MYEchoPlugin, "EchoPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnNone);
)
```

:::

### Adding the Plugin to the Portal

After creating the Capacitor Plugin, add the Plugin to the Portal to use it.
If your Portal is configured for automatic registration, then you have nothing left to do
and the `EchoPlugin` will be automatically registered with the Capacitor runtime.

If your Portal is configured for manual registration, you will have to add it to the Portal:

```swift
let fooPortal = Portal(name: "foo")
  .adding(EchoPlugin.self)
```

### Calling Your Plugin Code via the Web

Once the Plugin has been defined, implemented, and initialized in the native code, you will need to register the Plugin on the web. To do this, you can use the `Capacitor.registerPlugin()` function. After calling this function, Capacitor will handle communication across native and web code.

```typescript
import { registerPlugin } from "@capacitor/core";
import { EchoPlugin } from "./types";

const Plugin = registerPlugin<EchoPlugin>("EchoPlugin");
export default Plugin;
```

Once the Plugin has been registered in the web code, you can use it anywhere in your codebase without needing to register it again in the web code.

```typescript
import EchoPlugin from "./echo-plugin";

EchoPlugin.echo("Hello World!");
```

**Note**

For more information on how to create Capacitor Plugins, check our [guide for creating Capacitor Plugins](https://capacitorjs.com/docs/plugins/creating-plugins).
