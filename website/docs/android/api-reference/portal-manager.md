---
title: PortalManager
sidebar_label: Portal Manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalManager` object is used to create a and manage multiple `Portal` instances. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access to any `Portal` from anywhere in the application. `PortalManager` can be used in situations where you want to programmatically create a `Portal` at runtime rather than defining it via XML. An example of how to create a `Portal` using the `PortalManager` class is directly below.

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
    .addPlugin(MyCapacitorPlugin::class.java)
    .setPortalFragmentType(MyFadeInOutPortalFragment::class.java)
    .setInitialContext(mapOf("myVariableFromAndroid" to 42))
    .setStartDir("web_app")
    .create()
```

</TabItem>
<TabItem value="java">

```java
PortalManager.newPortal("my_portal")
    .addPlugin(MyCapacitorPlugin.class)
    .setPortalFragmentType(MyFadeInOutPortalFragment.class)
    .setInitialContext(Map.of("myVariableFromAndroid", 42))
    .setStartDir("web_app")
    .create();
```

</TabItem>
</Tabs>

## Methods

### addPortal
_static_

Add an existing `Portal` to the `PortalManager` object. This is not neccessary if the `Portal` is created via the `PortalManager.newPortal()` function.

#### Usage
<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val portal: Portal = someValue
PortalManager.addPortal(portal)
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue
PortalManager.addPortal(portal)
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`portal` | `Portal` | An existing `Portal` to add to the `PortalManager`.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### getPortal
_static_

Gets an existing `Portal` on the `PortalManager` object. This function will throw an `IllegalStateException` if the `Portal` is not found.

#### Usage
<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val portal: Portal = PortalManager.getPortal("my_portal")
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = PortalManager.getPortal("my_portal");
``` 

</TabItem>
</Tabs>



#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The `Portal` name to look up in the `PortalManager` object.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

### size
_static_

Returns the number of `Portal` instances managed by the `PortalManager` object.

#### Usage

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val portalCount: Int = PortalManager.size()
``` 

</TabItem>
<TabItem value="java">

```java
int portalCount = PortalManager.size();
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The `Portal` name to look up in the `PortalManager` object.

**Returns:** <span class="return-code">*Int*</span>

### newPortal
_static_

A function to create a `PortalBuilder` class and, after building, add it to the `PortalManager`. Classes built with the `newPortal()` function are added to the `PortalManager` automatically.

#### Usage

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val builder: PortalBuilder = PortalManager.newPortal("my_portal")
val portal: Portal = builder.create()
```

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = PortalManager.newPortal("my_portal");
Portal portal = builder.create();
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The `Portal` name to create.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>
