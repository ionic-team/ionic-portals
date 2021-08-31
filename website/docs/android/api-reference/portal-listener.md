---
title: PortalListener
sidebar_label: Portal Listener
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`PortalListener` is an empty, shared interface for `PayloadListener` and `EmptyListener`. These classes are used internally to listen to events triggered from the [PortalsPlugin](./portals-plugin) and aren't meant to be used directly.

When using [PortalFragment.addMessageReceiver()](./portal-fragment#addmessagereceiver) you can implement either a `PayloadListener` or an `EmptyListener`. Both interfaces are documented below.

## PayloadListener

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
interface PayloadListener : PortalListener {
    fun onMessageReceived(data: String?)
}
```

</TabItem>
<TabItem value="java">

```java
interface PayloadListener implements PortalListener {
    public void onMessageReceived(@Nullable String data)
}
``` 

</TabItem>
</Tabs>

## EmptyListener

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
interface EmptyListener : PortalListener {
    fun onMessageReceived()
}
```

</TabItem>
<TabItem value="java">

```java
interface EmptyListener implements PortalListener {
    public void onMessageReceived()
}
``` 

</TabItem>
</Tabs>
