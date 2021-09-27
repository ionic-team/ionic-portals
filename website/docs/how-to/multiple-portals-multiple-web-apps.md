---
title: Multiple Portals and Multiple Web Applications
sidebar_label: Multi Portal & Multiple Web Apps
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some cases, it makes sense to have different teams handle different portals in bigger applications. For example, one team may maintain a _"Maps & Geolocation"_ Portal while another might handle a _"Shopping & Checkout"_ Portal.

## Declaring Multiple Portals

Setting up multiple Portals is as easy as declaring another Portal in the PortalManager. No further code is neccessary and each Portal will function independently.

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
PortalManager.newPortal("maps").create()
PortalManager.newPortal("shopping").create()
```

</TabItem>

<TabItem value="kt">

```kotlin
PortalManager.newPortal("maps").create()
PortalManager.newPortal("shopping").create()
```

</TabItem>

<TabItem value="java">

```java
PortalManager.newPortal("maps").create();
PortalManager.newPortal("shopping").create();
```

</TabItem>

</Tabs>

Now, the _"Maps & Geolocation"_ Portal will read from the `maps` directory in your assets folder and the _"Shopping & Checkout"_ Portal will read from the `shopping` directory in your assets folder.

## Project Structure

In your project, you'll need to setup multiple folders in your Assets directory if your web applications are discrete apps. For more information on how to setup web bundles in your native project, see [our how-to guide](./pull-in-web-bundle).
