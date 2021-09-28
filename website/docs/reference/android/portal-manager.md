---
title: PortalManager
sidebar_label: Portal Manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalManager](./portal-manager) object is used to create a and manage multiple [Portal](./portal) instances. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access to any [Portal](./portal) from anywhere in the application. [PortalManager](./portal-manager) can be used in situations where you want to programmatically create a [Portal](./portal) at runtime rather than defining it via XML. An example of how to create a [Portal](./portal) using the [PortalManager](./portal-manager) class is directly below.

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

Add an existing [Portal](./portal) to the [PortalManager](./portal-manager) object. This is not neccessary if the [Portal](./portal) is created via the [PortalManager.newPortal()](./portal-manager#newportal) function.

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
`portal` | [Portal](./portal) | An existing [Portal](./portal) to add to the [PortalManager](./portal-manager).

### getPortal
_static_

Gets an existing [Portal](./portal) on the [PortalManager](./portal-manager) object. This function will throw an [IllegalStateException](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/IllegalStateException.html) if the [Portal](./portal) is not found.

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
`name` | `String` | The [Portal](./portal) name to look up in the [PortalManager](./portal-manager) object.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

### size
_static_

Returns the number of [Portal](./portal) instances managed by the [PortalManager](./portal-manager) object.

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
`name` | `String` | The [Portal](./portal) name to look up in the [PortalManager](./portal-manager) object.

**Returns:** <span class="return-code">*Int*</span>

### newPortal
_static_

A function to create a [PortalBuilder](./portal-builder) class and, after building, add it to the [PortalManager](./portal-manager). Classes built with the [PortalManager.newPortal()](./portal-manager#newportal)` function are added to the [PortalManager](./portal-manager) automatically.

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
`name` | `String` | The [Portal](./portal) name to create.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

### register
_static_

A function to validate the registration of the Ionic Portals instance with your API Key. This function will work offline and only needs to be run once before creating your first [Portal](./portal)

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
:::

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
PortalManager.register("MY_API_KEY")
```

</TabItem>
<TabItem value="java">

```java
PortalManager.register("MY_API_KEY");
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`key` | `String` | The [Portal](./portal) API Key to register.

