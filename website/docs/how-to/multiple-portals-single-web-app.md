---
title: Multiple Portals and Single Page Applications
sidebar_label: Multi Portal & Single Page Apps
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some cases, it break down a large Single Page Application (SPA) into multiple Portals to create a better User Experience. The below example is similar to the [Multi Portals with Multiple Web Applications](./multiple-portals-multiple-web-apps) example, but it is a SPA rather than multiple applications.

## Declaring Multiple Portals

Setting up multiple Portals is as easy as declaring another Portal in the PortalManager. Each Portal will function independently of one another and will be a separate instance of the SPA.

<Tabs 
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(["route": "/maps"])
    .create()

PortalManager.newPortal("shopping")
    .setStartDir("web")
    .setInitialContext(["route": "/shopping"])
    .create()
```

</TabItem>

<TabItem value="kt">

```kotlin
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(mapOf("route" to "/maps"))
    .create()

PortalManager.newPortal("shopping")
    .setStartDir("web")
    .setInitialContext(mapOf("route" to "/shopping"))
    .create()
```

</TabItem>

<TabItem value="java">

```java
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(Map.of("route", "/maps"))
    .create();

PortalManager.newPortal("shopping")
    .setStartDir("web")
    .setInitialContext(Map.of("route", "/shopping"))
    .create();
```

</TabItem>

</Tabs>

The _"Maps & Geolocation"_ Portal will be an instance of the SPA in the `web` folder in the Assets directory with an _"initialContext"_ of the following.

```json
{
    "route": "/map"
}
```

Similarly, the "Shopping & Checkout" Portal will be a separate instance of the SPA in the  `web` folder in the Assets directory with an _"initialContext"_ of the following.

```json
{
    "route": "/shopping"
}
```

## Injecting the Initial Context Into the Web Application

With this _initialContext_ value set, you can use this to properly navigate to the correct route within your Portal. The [Portals E-commerce example](../examples/ecommerce-app) uses this method. You can see how we [inject the context here on Github](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/web/src/index.tsx) using the `Portal.getInitialContext()` function TODO: <-- Link to Web API Reference

## Project Structure

In your project, you'll need to a single folder in your Assets directory that contains the built output for your SPA. For more information on how to setup web bundles in your native project, see [our how-to guide](./pull-in-web-bundle).
