---
title: Portal
sidebar_label: Portal
---

The [Portal](./portal) class is the main entry point for your application. It contains the data to be passed into the web context. It is not advised to use this class directly. [PortalBuilder](./portal-builder) or [PortalManager](./) should be used instead to construct a [Portal](./portal) instance.

:::info
Even though there are no Objective-C code samples, the Ionic Portals library can be used with apps written in Objective-C.
:::

## Constructors

### constructor

#### Usage 

```swift
let name = "Hello World"
let startDir = "portals/hello-world"
let portal = Portal(name, startDir)
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------ 
`name` | `String` | The name of the [Portal](./portal) to be referenced via the [PortalManager](./) or the [PortalWebView](./)
`startDir` (optional) | `String?` | The start directory of the portal web app. If this value is not set, the startDir property will default to the name of the portal passed in the constructor.

**Returns:** <span class="return-code">[*Portal*](./portal)</span>

## Properties

### name
_read-only_

The name of the [Portal](./portal). This value is passed into the `constructor`.

### initialContext

A `Dictionary` containing key/pair values or a `String` that will be converted to a JavaScript object in the webview on initialization.

### startDir

The start directory of the portal web app. If this value is not set, the startDir property will default to the name of the portal passed in the constructor. It can also be re-assigned after constructed.
