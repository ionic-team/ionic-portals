---
title: PortalManager
sidebar_label: Portal Manager
---

The [PortalManager](./portal-manager) object is used to create a and manage multiple [Portal](./portal) instances. It follows a [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern) to allow access to any [Portal](./portal) from anywhere in the application. [PortalManager](./portal-manager) can be used in situations where you want to programmatically create a [Portal](./portal) at runtime rather than defining it via XML. An example of how to create a [Portal](./portal) using the [PortalManager](./portal-manager) class is directly below.

```swift
PortalManager.newPortal("my_portal")
    .setInitialContext(["myVariableFromAndroid": 42])
    .setStartDir("web_app")
    .create()
```

:::info
Even though there are no Objective-C code samples, the Ionic Portals library can be used with apps written in Objective-C.
:::

## Methods

### count
_static_

Returns the number of [Portal](./portal) instances managed by the [PortalManager](./portal-manager) object.

#### Usage


```swift
let portalCount: Int = PortalManager.size()
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The [Portal](./portal) name to look up in the [PortalManager](./portal-manager) object.

**Returns:** <span class="return-code">*Int*</span>

### addPortal
_static_

Add an existing [Portal](./portal) to the [PortalManager](./portal-manager) object. This is not neccessary if the [Portal](./portal) is created via the [PortalManager.newPortal()](./portal-manager#newportal) function.

#### Usage

```swift
let portal: Portal = someValue
PortalManager.addPortal(portal)
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------
`portal` | [Portal](./portal) | An existing [Portal](./portal) to add to the [PortalManager](./portal-manager).

### getPortal
_static_

Get a [Portal](./portal) registered to the [PortalManager](./portal-manager) by name.

#### Usage

```swift
let name: String = "MyPortal"
let portal: Portal = PortalManager.getPortal(name)
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The [Portal](./portal) name to look up in the [PortalManager](./portal-manager) object.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

### newPortal
_static_

A function to create a [PortalBuilder](./portal-builder) class and, after building, add it to the [PortalManager](./portal-manager). Classes built with the [PortalManager.newPortal()](./portal-manager#newportal)` function are added to the [PortalManager](./portal-manager) automatically.

#### Usage

```swift
let builder: PortalBuilder = PortalManager.newPortal("MyPortal")
let portal: Portal = builder.create()
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`name` | `String` | The [Portal](./portal) name to create.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

