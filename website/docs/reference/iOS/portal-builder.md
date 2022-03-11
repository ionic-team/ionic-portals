---
title: PortalBuilder
sidebar_label: Portal Builder
---

The [PortalBuilder](./portal-builder) class is used to create a [Portal](./portal) instance. It follows a [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern) to construct a portal using values passed in at runtime. [PortalBuilder](./portal-builder) can be used in situations where you want to programmatically create a single [Portal](./portal)  at runtime rather than defining it via XML. For managing multiple [Portal](./portal) instances in an application, it is recommended to use the [PortalManager](./) class.

An example of how to create a [Portal](./portal) using the [PortalBuilder](./portal-builder) class is directly below.

```swift
let portal: Portal = PortalBuilder("myPortal", { portal in /* ... */ })
    .setInitialContext(["myVariableFromiOS": 42])
    .setStartDir("web_app")
    .create()
```

:::info
Even though there are no Objective-C code samples, the Ionic Portals library can be used with apps written in Objective-C.
:::

## Constructors

### constructor

#### Usage 

```swift
let name: String = "MyPortal"
let builder = PortalBuilder(name)
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------ 
`name` | `String` | The name of the [Portal](./portal) to be created.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

## Methods

### setStartDir

Set the directory of the [Portal](./portal). This directory is the on device directory of where your web application is located.

#### Usage 

```swift
var builder: PortalBuilder = someValue
builder = builder.setStartDir("/path/to/web/application/")
``` 


#### Parameters

Name | Type | Description
:------ | :------ | :------
`startDir` | `String` | The on device directory of the web application that this [Portal](./portal) uses.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### setInitialContext

Sets the initial context to pass to the webview.

#### Usage 

```swift
var builder: PortalBuilder = someValue
builder = builder.setInitialContext([
    "foo": "bar",
    "ionic": "portals",
    "num": 42
])
``` 

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
`startDir` | `Dictionary<String, Any>` | A Dictionary containing key/pair values that will be converted to a JavaScript object in the WebView.

**Returns:** <span class="return-code">[*PortalBuilder*](./portal-builder)</span>

### create

Creates a [Portal](./portal) instance from the current state of [PortalBuilder](./portal-builder) 

#### Usage 

```swift
var builder: PortalBuilder = someValue
let portal: Portal = builder.create()
``` 

**Returns:** <span class="return-code">[*Portal*](./portal)</span>
