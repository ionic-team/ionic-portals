---
title: How to Use Portals in an iOS Library
sidebar_label: Using Portals in an iOS Library
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

In larger teams and organizations, teams may be split to work on one or more feature frameworks. In those situations, it may be arduous or impossible to have web builds integrated as part of the applications main bundle.

## Web Asset Location

In order to get Portals to locate the appropriate resources, you need to provide a Bundle for it to access through it's initializer.

<Tabs 
    defaultValue="framework" 
    values={[
        { label: 'Framework', value: 'framework', },
        { label: 'Package', value: 'package', },
    ]}
>

<Tab value="framework">

In a framework, you need to explicitly initialize a bundle:

```swift title=Bundle+Framework.swift
extension Bundle {
  private class Finder {}
  static let framework = Bundle(from: Finder.self)
}
```

Then, in the Portal initializer, pass your frameworks bundle to the Portal initializer:

```swift
let portal = Portal(
  name: "webapp",
  bundle: .framework
)
```

</Tab>


<Tab value="package">

In the Portal initializer, pass `Bundle.module` to the Portal initializer:

```swift
import IonicPortals

let portal = Portal(
  name: "webapp",
  bundle: .module
)
```

</Tab>

</Tabs>

## Live Update Configuration

If many teams are using Portals in an application using Live Updates, you may want to control the update lifecycle of your framework's Portals. Using `LiveUpdateManager.shared` in a large team across many frameworks would force every framework to share the same update policies and caches.

First, create a LiveUpdateManager that can be easily referenced:

```swift file=LiveUpdateManager+Framework.swift
import IonicLiveUpdates

extension LiveUpdateManager {
  static let framework = LiveUpdateManager(named: "MyFrameworkName")
}
```

Then, provide the custom `LiveUpdateManager` to your Portal in its initializer:

```swift
import IonicPortals
import IonicLiveUpdates

let portal = Portal(
  name: "webapp",
  liveUpdateConfig: LiveUpdate(appId: "abc123", channel: "production"),
  liveUpdateManager: .framework
)
```

