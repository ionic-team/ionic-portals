---
title: PortalsPlugin
sidebar_label: Portals Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` class is a Capacitor Plugin that allows for bi-directional communication between Android code and Web code. It is not meant to be used directly. To include it in your `Portal`, add it via the `.setPlugins()` function on the `PortalBuilder`.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
PortalManager.newPortal("my_portal")
    .setPlugins(Arrays.asList(PortalsPlugin::class.java))
    .create()
``` 

</TabItem>
<TabItem value="java">

```java
PortalManager.newPortal("my_portal")
    .setPlugins(Arrays.asList(PortalsPlugin.java))
    .create();
``` 

</TabItem>
</Tabs>

This Plugin comes with two functions: `sendMessage` and `listenForMessage`; that are used in the web application.

Please see the PORTAL PLUGIN TUTORIAL // TODO HERE for an example of how to use this Plugin.
