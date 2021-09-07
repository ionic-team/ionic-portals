---
title: PortalBuilder
sidebar_label: Portal Builder
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalBuilder](./portal-builder) class is used to create a [Portal](./portal) instance. It follows a [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern) to construct a portal using values passed in at runtime. [PortalBuilder](./portal-builder) can be used in situations where you want to programmatically create a single [Portal](./portal)  at runtime rather than defining it via XML. For managing multiple [Portal](./portal) instances in an application, it is recommended to use the [PortalManager](./portal-manager) class.

An example of how to create a [Portal](./portal) using the [PortalBuilder](./portal-builder) class is directly below.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val onCreate = fun (portal) { /* Run post-creation */ }
val portal: Portal = PortalBuilder("myPortal", onCreate)
    .addPlugin(MyCapacitorPlugin::class.java)
    .setPortalFragmentType(MyFadeInOutPortalFragment::class.java)
    .setInitialContext(mapOf("myVariableFromAndroid" to 42))
    .setStartDir("web_app")
    .create()
```

</TabItem>
<TabItem value="java">

```java
// TODO: Add java typing for onCreate function
Portal portal = new PortalBuilder("myPortal", onCreate)
    .addPlugin(MyCapacitorPlugin.class)
    .setPortalFragmentType(MyFadeInOutPortalFragment.class)
    .setInitialContext(Map.of("myVariableFromAndroid", 42))
    .setStartDir("web_app")
    .create();
``` 

</TabItem>
</Tabs>

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
val callbackFunc: (portal: Portal) -> Unit = /* callback function here */
var builder: PortalBuilder = PortalBuilder(name, callbackFunc)
``` 

</TabItem>
<TabItem value="java">

```java
String name = "Hello World"
PortalBuilder builder = new PortalBuilder(name, portal -> {
    /* callback function here */
});
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------ 
`name` | `String` | The name of the [Portal](./portal) to be referenced via the [PortalManager](./portal-manager) or the [PortalView](./portal-view)
`onCreate` | `(portal: Portal) -> Unit` | A callback function that is called during the [PortalBuilder.create()](./portal-builder#create) function

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

## Methods

### setStartDir

Set the directory of the [Portal](./portal). This directory is the on device directory of where your web application is located.

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
var builder: PortalBuilder = someValue
builder = builder.setStartDir("/path/to/web/application/")
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
builder = builder.setStartDir("/path/to/web/application/");
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`startDir` | `String` | The on device directory of the web application that this [Portal](./portal) uses.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### addPlugin

Add a Capacitor Plugin to be loaded with the [Portal](./portal) being built.

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
var builder: PortalBuilder = someValue
builder = builder.addPlugin(MyPlugin::class.java)
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
builder = builder.addPlugin(MyPlugin.class)
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`plugin` | `Class<out Plugin?>` | A Plugin to be used with the [Portal](./portal).

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### setPlugins

Add multiple Capacitor Plugins to be loaded with this [Portal](./portal).

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
var builder: PortalBuilder = someValue
val list: MutableList<Class<out Plugin?}>> = mutableListOf(
    FooPlugin::class.java,
    BarPlugin::class.java,
    BazPlugin::class.java
)
builder = builder.setPlugins(list)
```

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
List<? extends Plugin> list = Array.asList(
    FooPlugin.class,
    BarPlugin.class,
    BazPlugin.class
);
builder = builder.setPlugins(list);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`plugins` | `MutableList<Class<out Plugin?>>` | A list of Plugins to be used with the [Portal](./portal).

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### setInitialContext

Sets the initial context to pass to the webview. You can pass in either a `Map` or a `String` that will be parsed into a JSON object.

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
var builder: PortalBuilder = someValue
val map: Map<String, Any> = mapOf(
    "foo" to "bar", 
    "ionic" to "portals"
    "num" to 42
)
builder = builder.setInitialContext(map)
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
Map<String, Object> map = Map.ofEntries(
  new AbstractMap.SimpleEntry<String, @NotNull Object>("foo", "bar"),
  new AbstractMap.SimpleEntry<String, @NotNull Object>("ionic", "portals"),
  new AbstractMap.SimpleEntry<String, @NotNull Object>("num", 42)
);
builder = builder.setInitialContext(map);
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
var builder: PortalBuilder = someValue
val str: String = '{ "foo": "bar", "ionic": "portals", "num": 42 }'
builder = builder.setInitialContext(str)
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
String str = "{ \"foo\": \"bar\", \"ionic\": \"portals\", \"num\": 42 }";
builder = builder.setInitialContext(str);
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

Portals.getInitialContext<MyPortalInitialContext>().then(context => {
    console.log(context.foo)    // "bar"
    console.log(context.ionic)  // "portals"
    console.log(context.num)    // 42
})
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`initialContext` | `Map<String, Any>` | A map containing key/pair values that will be converted to a JavaScript object in the webview.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

Name | Type | Description
:------ | :------ | :------
`initialContext` | `String` | A JSON-valid string that will be converted to a JavaScript object in the webview.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### setPortalFragmentType

Sets the [PortalFragment](./portal-fragment) class to use when displaying the [Portal](./portal).

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
var builder: PortalBuilder = someValue
var fragmentType: Class<out PortalFragmentType?> = MyPortalFragment::class.java
builder = builder.setPortalFragmentType(list)
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
Class<? extends PortalFragmentType> fragmentType = MyPortalFragment.class;
builder = builder.setPortalFragmentType(list);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`portalFragmentType` | `Class<out PortalFragment?>` | The class object of type [PortalFragment](./portal-fragment) to use for containing the [Portal](./portal)

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### create

Creates a [Portal](./portal) instance from the current state of [PortalBuilder](./portal-builder) 

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
var builder: PortalBuilder = someValue
val portal: Portal = builder.create()
``` 

</TabItem>
<TabItem value="java">

```java
PortalBuilder builder = someValue;
Portal portal = builder.create();
``` 

</TabItem>
</Tabs>

**Returns:** <span class="return-code">[*Portal*](./portal)</span>
