---
title: Portal
sidebar_label: Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Portal](./portal) class is the main entry point for your application. It contains the data to be passed into the web context. It is not advised to use this class directly. [PortalBuilder](./portal-builder) or [PortalManager](./portal-manager) should be used instead to construct a [Portal](./portal) instance.

## Constructors

### constructor

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
val name: String = "Hello World"
val portal: Portal = Portal(name)
``` 

</TabItem>
<TabItem value="java">

```java
String name = "Hello World";
Portal portal = new Portal(name);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------ 
`name` | `String` | The name of the [Portal](./portal) to be referenced via the [PortalManager](./portal-manager) or the [PortalView](./portal-view)

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

## Properties

### startDir
_read-only_

The start directory of the portal web app. If this value is not set, the startDir property will default to the name of the portal passed in the constructor.

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
val directoryOnDevice: String = portal.startDir
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
String directoryOnDevice = portal.startDir;
``` 

</TabItem>
</Tabs>

**Returns:** <span class="return-code">String</span>

### portalFragmentType
The [PortalFragment](./portal-fragment) type used by a [PortalView](./portal-view) when using Portals directly in Android layouts/XML. The default value is [PortalFragment](./portal-fragment), but any class that extends [PortalFragment](./portal-fragment) can be used.

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
val fragmentType: Class<out PortalFragment?> = MyPortalFragment::class.java
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
Class<? extends PortalFragment> fragmentType = MyPortalFragment.class;
``` 

</TabItem>
</Tabs>

## Methods

### addPlugin

Add a Capacitor Plugin to be loaded with this Portal.

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
portal.addPlugin(MyPlugin::class.java)
```

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
portal.addPlugin(MyPlugin.class);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`plugin` | `Class<out Plugin?>` | A Plugin to be used with the Portal.

### addPlugins

Add multiple Capacitor Plugins to be loaded with this Portal.

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
val list: List<Class<out Plugin?>> = listOf(
    FooPlugin::class.java,
    BarPlugin::class.java,
    BazPlugin::class.java
)
portal.addPlugins(list)
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
List<Class<? extends Plugin>> list = Arrays.asList(
    FooPlugin.class,
    BarPlugin.class,
    BazPlugin.class
);
portal.addPlugins(list);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`plugins` | `List<Class<out Plugin?>>` | A list of Plugins to be used with the Portal.

### setInitialContext

Sets the initial context to pass to the WebView. You can pass in either a `Map` or a `String` that will be parsed into a JSON object.

#### Usage 

**Map Usage**

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
val map: Map<String, Any> = mapOf(
    "foo" to "bar", 
    "ionic" to "portals"
    "num" to 42
)
portal.setInitialContext(map)
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
Map<String, Object> map = Map.ofEntries(
  new AbstractMap.SimpleEntry<String, @NotNull Object>("foo", "bar"),
  new AbstractMap.SimpleEntry<String, @NotNull Object>("ionic", "portals"),
  new AbstractMap.SimpleEntry<String, @NotNull Object>("num", 42)
);
portal.setInitialContext(map);
``` 

</TabItem>
</Tabs>

**String Usage**

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
val str: String = '{ "foo": "bar", "ionic": "portals", "num": 42 }'
portal.setInitialContext(str)
``` 

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
String str = "{ \"foo\": \"bar\", \"ionic\": \"portals\", \"num\": 42 }";
portal.setInitialContext(str);
``` 

</TabItem>
</Tabs>

In the examples above, your initial context in the web portion of the code will be parsed like this:

```typescript
interface MyPortalInitialContext {
    foo: string,
    ionic: string,
    num: number
}

const context = getInitialContext<MyPortalInitialContext>();
console.log(context?.value?.foo)    // "bar"
console.log(context?.value?.ionic)  // "portals"
console.log(context?.value?.num)    // 42
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`initialContext` | `Map<String, Any>` | A map containing key/pair values that will be converted to a JavaScript object in the WebView.

Name | Type | Description
:------ | :------ | :------
`initialContext` | `String` | A JSON-valid string that will be converted to a JavaScript object in the WebView.
