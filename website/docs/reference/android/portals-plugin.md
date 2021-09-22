---
title: PortalsPlugin
sidebar_label: Portals Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalsPlugin](./portals-plugin) class is a special Capacitor Plugin within the Portals library that allows for bi-directional communication between Android code and Web code. It is added to every Portal automatically.

## Methods

### publish

### subscribe

### unsubscribe

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
