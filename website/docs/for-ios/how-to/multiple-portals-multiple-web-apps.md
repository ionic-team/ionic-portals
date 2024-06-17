---
title: Multiple Portals and Multiple Web Applications
sidebar_label: Multi Portal & Multiple Web Apps
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some cases, it makes sense to have different teams handle different portals in bigger applications. For example, one team may maintain a _"Maps & Geolocation"_ Portal while another might handle a _"Shopping & Checkout"_ Portal.

## Declaring Multiple Portals

Setting up multiple Portals is as easy as initializing another Portal.

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift', },
{ label: 'Objective-C', value: 'objc', },
]}>
<TabItem value="swift">

```swift
let maps = Portal(name: "maps")
let shopping = Portal(name: "shopping")
```

This can be made even simpler using the `ExpressibleByStringLiteral` conformance of Portal:

```swift
let maps: Portal = "maps"
let shopping: Portal = "shopping"
```

</TabItem>

<TabItem value="objc">

```objectivec
IONPortal *mapsPortal = [[IONPortal alloc] initWithName:@"maps" startDir:nil initialContext:nil];
IONPortal *shoppingPortal = [[IONPortal alloc] initWithName:@"shopping" startDir:nil initialContext:nil];
```

</TabItem>

</Tabs>

Now, the _"Maps & Geolocation"_ Portal will read from the `maps` directory in your assets folder and the _"Shopping & Checkout"_ Portal will read from the `shopping` directory in your assets folder.

## Project Structure

In your project, you'll need to setup multiple folders in your Assets directory if your web applications are discrete apps. For more information on how to setup web bundles in your native project, see [our how-to guide](./pull-in-web-bundle.md).
