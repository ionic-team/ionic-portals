---
title: Multiple Portals and Single Page Applications
sidebar_label: Multi Portal & Single Page Apps
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some cases, it break down a large Single Page Application (SPA) into multiple Portals to create a better User Experience. The below example is similar to the [Multi Portals with Multiple Web Applications](./multiple-portals-multiple-web-apps.md) example, but it is a SPA rather than multiple applications.

## Declaring Multiple Portals

Setting up multiple Portals is as simple as initializing them. Each Portal will function independently of one another and will be a separate instance of the SPA.

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift', },
{ label: 'Objective-C', value: 'objc' }
]}>
<TabItem value="swift">

```swift
let mapsPortal = Portal(
    name: "maps",
    startDir: "web",
    initialContext: ["route": "/maps"]
)

let shoppingPortal = Portal(
    name: "shopping",
    startDir: "web",
    initialContext: ["route": "/shopping"]
)
```

If you find yourself needing these Portals in multiple locations in your application, you may find it convenient to extend `Portal`:

```swift title=Portal+SPAPortals.swift
extension Portal {
    static let maps = Portal(
        name: "maps",
        startDir: "web",
        initialContext: ["route": "/maps"]
    )

    static let shopping = Portal(
        name: "shopping",
        startDir: "web",
        initialContext: ["route": "/shopping"]
    )
}
```

Then you can use them throughout your application:

```swift
PortalUIView(portal: .maps)
PortalUIView(portal: .shopping)
```

</TabItem>

<TabItem value="objc">

```objectivec
IONPortal *mapsPortal = [[IONPortal alloc] initWithName:@"maps" startDir:@"web" initialContext:@{ @"route": @"/map" }];
IONPortal *shoppingPortal = [[IONPortal alloc] initWithName:@"maps" startDir:@"web" initialContext:@{ @"route": @"map" }];
```

</TabItem>

</Tabs>

The _"Maps & Geolocation"_ Portal will be an instance of the SPA in the `web` folder in the Assets directory with an _"initialContext"_ of the following.

```json
{
  "route": "/map"
}
```

Similarly, the "Shopping & Checkout" Portal will be a separate instance of the SPA in the `web` folder in the Assets directory with an _"initialContext"_ of the following.

```json
{
  "route": "/shopping"
}
```

## Injecting the Initial Context Into the Web Application

With this _initialContext_ value set, you can use this to properly navigate to the correct route within your Portal. The [Portals E-commerce example](../examples/ecommerce-app.md) uses this method. You can see how we [inject the context here on Github](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/web/src/index.tsx) using the [Portal.getInitialContext() function](../../for-web/portals-plugin.md#getinitialcontext).

## Project Structure

In your project, you'll need to a single folder in your Assets directory that contains the built output for your SPA. For more information on how to setup web bundles in your native project, see [our how-to guide](./pull-in-web-bundle.md).
