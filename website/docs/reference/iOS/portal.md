---
title: Portal
sidebar_label: Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Portal](./portal) struct contains the data to initialize and configure your web context. 

## Initializers

### `init(name:startDir:initialContex:liveUpdateConfig:)`

#### Usage 

<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
let name = "Hello World"
let startDir = "portals/hello-world"
let portal = Portal(name: name, startDir: startDir)
``` 

</TabItem>

<TabItem value="objc">

```objectivec
NSString *name = @"Hello World";
NSString *startDir @"portals/hello-world";
IONPortal *portal = [[IONPortal alloc] initWithName:name startDir:startDir initialContext:nil];
``` 

</TabItem>

</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------ 
`name` | `String` | The name of the [Portal](./portal). 
`startDir` (optional) | `String?` | The start directory of the portal web app. If this value is not set, the startDir property will default to the name of the portal passed in the constructor. Defaults to `nil`.
`initialContext` | `JSObject` | Any initial data to be provided to the web app on launch. Defaults to `[:]`.
`liveUpdateConfig` (optional) | `LiveUpdate?` | The [LiveUpdate](../../reference-live-updates/iOS/live-update) configuration to associate with the [Portal](./portal). Defaults to `nil`.

### ExpressibleByStringLiteral `init(stringLiteral:)`

This is meant as a convenience for simple usages of a [`Portal`](./portal) where no initial context is needed and the `startDir` and `name` are the same.

#### Usage

```swift
let portal: Portal = "webapp"
// or directly passed to a PortalUIView
let portalView = PortalUIView(portal: "webapp")
```

## Properties

### name
_read-only_

The name of the [Portal](./portal). This value is passed into the `constructor`.

### startDir
_read-only_

The start directory of the portal web app. If this value is not set, the startDir property will default to the name of the portal passed in the constructor. 

### initialContext

A `Dictionary` containing key/pair values or a `String` that will be converted to a JavaScript object in the webview on initialization.

### liveUpdateConfig
__optional__

A `LiveUpdate` struct containing the AppFlow `appId` and `channel` to sync updates from.
