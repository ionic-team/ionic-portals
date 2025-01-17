---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Portals for iOS 0.11.x → 0.12.0

- Portals for iOS version `0.12.0` is compatible with Portals Web Plugin version `0.12.x`.

:::caution
Portals 0.12.0 is a notable update that upgrades the Capacitor dependency to version 7. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 7 Update Guide](https://capacitorjs.com/docs/updating/7-0#ios) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

This release removes the `encodeJSObject` and `decodeJSObject` extension methods for `JSONEncoder` and `JSONDecoder`, which had previously been deprecated. Use `JSValueEncoder` and `JSValueDecoder` provided by Capacitor as their replacements.

## Portals for iOS 0.10.x → 0.11.0

- Portals for iOS version `0.11.0` is compatible with Portals Web Plugin version `0.10.x`.

:::caution
Portals 0.11.0 is a notable update that upgrades the Capacitor dependency to version 6. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 6 Update Guide](https://capacitorjs.com/docs/updating/6-0#ios) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

## Portals for iOS 0.9.x → 0.10.0

- Portals for iOS version `0.10.0` is compatible with Portals Web Plugin versions `0.8.0` and up.

### Differential Live Update Support

Portals for iOS 0.10.0 introduces support for differential live updates by requiring `IonicLiveUpdates` 0.5.0 as the minimum supported version.
This feature allows for updating only the changed files in a web asset bundle,
reducing the amount of data that needs to be transferred to the device. This feature is _enabled by default_.
To opt-out, explicitly set the [`strategy`](https://live-updates-sdk-ios.vercel.app/documentation/ionicliveupdates/liveupdate/strategy-swift.property) property
on the `LiveUpdate` configured for the Portal to [`Strategy.zip`](https://live-updates-sdk-ios.vercel.app/documentation/ionicliveupdates/liveupdate/strategy-swift.enum/zip).

### Convenience Live Update API

#### Individual Portal Sync
`Portal` now has a [`sync`](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/sync()) method that allows for triggering a live update sync manually
without needing to interact with the `LiveUpdate` or `LiveUpdateManager` instance directly.

```swift
let portal = Portal(/* ... */)
let result = try await portal.sync()
```

`sync` will return a `LiveUpdateManager.SyncResult` or throw an error if the sync has failed. If the Portal is not configured to use live updates, `sync` will throw an error.

#### Multiple Portal Sync
If you need to sync multiple Portals, you can use the static `sync` method on `Portal`:
```swift
let portals: [Portal] = [/* ... */]
for await result in Portal.sync(portals) {
    // do something with result
}
```

There is also an extension on Array that allows for syncing an array of Portals:
```swift
let portals: [Portal] = [/* ... */]
for await result in portals.sync() {
    // do something with result
}
```

Each result is a `Result<LiveUpdateManager.SyncResult, any Error>` that can be handled as needed.
All sync operations are performed in parallel and results are yielded as they complete. This AsyncSequence does not throw
to avoid halting the entire operation if one sync fails.

## Portals for iOS 0.8.0 → 0.9.0

- Portals for iOS version `0.9.0` is compatible with Portals Web Plugin version `0.8.x`.

### Capacitor Configuration API

There is a new API available for configuring the Capacitor runtime. Most of the configuration options are the same as those available in the
[Capacitor configuration file](https://capacitorjs.com/docs/config). For more details, see [Advanced Configuration](./how-to/advanced-configuration.md).

### Dev Mode

There is a new property [`devModeEnabled`](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/devmodeenabled) on `Portal` 
that controls whether or not the Portal will be in development mode for debug builds. This mode will allow the Portal to be replaced with
content from a development server URL to be used in conjunction with the [`portals serve ios`](../cli/commands/serve-ios.md) CLI command.
This mode is enabled by default and is only available in debug builds. Release modes will always use the content shipped with the application.
To turn off development mode for a Portal, set `devModeEnabled` to `false` either in the Portal initializer or by setting the property directly.

## Portals for iOS 0.7.x → 0.8.0

- Portals for iOS version `0.8.0` is compatible with Portals Web Plugin version `0.8.x`.

This release requires Xcode 14.1 or higher in accordance with [Apple's requirements](https://developer.apple.com/news/upcoming-requirements/?id=04252023a).

:::caution
IonicPortals 0.8.0 is a notable update that requires Capacitor 5.
Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 5 Update Guide](https://capacitorjs.com/docs/updating/5-0) for an overview of necessary changes.
Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Breaking Changes

#### Pub/Sub

PortalsPubSub is now a class with a `shared` singleton available instead of an enum with static functions.
This change allows for providing a custom instance of PortalsPubSub to PortalsPlugin to limit visibility of events that are published to a given portal.
PortalsPlugin will default to using `PortalsPubSub.shared`.

`PortalsPubSub.subscribe` no longer has an overload that returns an `Int` and `PortalsPubSub.unsubscribe` has been removed entirely.
Unsubscribing will occur via an `AnyCancellable` returned by the `subscribe` methods whenever it's cancel method is called or on deinit.

#### Plugin Registration

There is no longer a `PluginRegistrationStrategy` on `Portal`.
All plugins must be explicitly registered on the Portal.
In certain cases, automatic registration can cause unexpected crashes in applications.

## Portals for iOS 0.6.x → 0.7.0

- Portals for iOS version `0.7.0` is compatible with Portals Web Plugin version `0.7.x`.

:::caution
Portals 0.7.0 is a notable update that requires Capacitor 4.
Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Updating Web Content

Update the Portals Plugin in your web content to `0.7.0`. Then, follow the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0#using-the-cli-to-migrate) CLI migration steps to update your web content that uses Capacitor.

### Update Native Projects

#### Dependency Version Alignment

The only necessary steps to use Portals version 0.7.0 should be to update dependencies. IonicPortals for iOS version 0.7.0 is compatible with Live Updates 0.2.2 and Official Capacitor Plugins over version 4.0.

### InitialContext Update

A default InitialContext is now always passed to the web content running in a Portal context such that the Portal name will always be accessible.

Before:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T;
}
```

After:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T | undefined;
}
```

## Portals for iOS 0.6.0 → 0.6.1

- Portals for iOS version `0.6.1` is compatible with Portals Web Plugin version `0.5.x`.

### Swift Package Manager Support

Add https://github.com/ionic-team/ionic-portals-ios in the Xcode "Swift Package Dependencies" tab in the project configuration. The suggested version range
is "Up to Next Minor Version" to prevent auto-updating to a breaking version before Ionic Portals iOS reaches version 1.0

### iOS 13.0 Support

The 0.5.x versions of Ionic Portals iOS required iOS 14.0. In this release we have included support for iOS 13.0 and up. To support iOS 13.0 in your app,
you should update your target to support the OS.

## Portals for iOS 0.5.x → 0.6.0

- Portals for iOS version `0.6.0` is compatible with Portals Web Plugin version `0.5.x`.

### PortalManager & PortalBuilder Removal

#### PortalManager → PortalsRegistrationManager

`PortalManager` has been removed. It's registration functionality has been replaced with [`PortalsRegistrationManager`](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portalsregistrationmanager).

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift' },
{ label: 'Objective-C', value: 'objc' }
]}>
<TabItem value="swift">

**Before**

```swift
PortalManager.register("YOUR_KEY")
```

**After**

```swift
PortalsRegistrationManager.shared.register(key: "YOUR_KEY")
```

</TabItem>

<TabItem value="objc">

**Before**

```objectivec
[PortalManager register:@"YOUR_KEY"];
```

**After**

```objectivec
[[IONPortalsRegistrationManager shared] registerWithKey:@"YOUR_KEY"];

```

</TabItem>

</Tabs>

#### Creating and Managing Portals

There is no need to add or register Portals with `PortalManager`. Just create an instance of `Portal` directly:

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift' },
{ label: 'Objective-C', value: 'objc' }
]}>
<TabItem value="swift">

**Before**

```swift
PortalManager.newPortal("name")
    .setStartDir("startDir")
    .create()

// elsewhere in your application

let portal = try! PortalManager.getPortal("name")
```

**After**

```swift
let portal = Portal(
    name: "appname",
    startDir: "startDir",
    initialContext: ["someKey": "someValue"]
)

let portalView = PortalUIView(portal: portal)
```

</TabItem>

<TabItem value="objc">

**Before**

```objectivec
[PortalManager register:@"YOUR_PORTAL_KEY_HERE"];
PortalBuilder *builder = [[PortalBuilder alloc] init:@"name"];
[builder setStartDir:@"startDir"];
Portal *portal = [builder create];
[PortalManager addPortal:portal];

// elsewhere in your application
Portal *portal = [PortalManager getPortal:@"name"];
```

**After**

```objectivec
IONPortal *portal = [[IONPortal alloc] initWithName:@"name" startDir:@"startDir" initialContext:nil];

IONPortalUIView *portalView = [[IONPortalUIView alloc] initWithPortal:portal];
```

</TabItem>

</Tabs>

The primary benefit of this approach is getting rid of a throwing API that is not necessary and eliminating a _required_ and _inflexible_ way of managing Portals. The `Portal` struct is simply configuration data for the view to determine what web assets to render and what data to provide it. If you find that you need to use the Portals in multiple places in your application, the preferred approach is extending `Portal` with static properties or methods:

```swift
extension Portal {
    static let checkout = Portal(
        name: "checkout",
        startDir: "portals/checkout",
        initialContext: ["someKey": "someValue"]
    )

    static func help(initialRoute: String) -> Portal {
        Portal(
          name: "help",
          startDir: "portals/help",
          initialContext: ["initialRoute": initialRoute]
        )
    }
}

// Where you use the Portal
PortalUIView(portal: .checkout)
PortalUIView(portal: .help(initialRoute: "/faq"))
```

Your situation may require something different, but version 0.6.0 gives you the flexibility to take any approach you prefer.

#### `Portal` interface changes

**initialContext**

The `initialContext` property on [`Portal`](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal) has changed from `[String: Any]` -> `JSObject`. `JSObject` is a typealias from `Capacitor` for `[String: JSValue]`. `JSValue` is a protocol defined in `Capacitor` that the following types conform to:

- `String`
- `Bool`
- `Int`
- `Float`
- `Double`
- `NSNumber`
- `NSNull`
- `Data`
- `Array` where `Element: JSValue`
- `Dictionary` where `Key == String && Value == JSValue`

This change is breaking only in that this was an undocumented requirement when sending data to a `Portal` as data would be coerced to those types. However, any data that did not conform to those types would be lost. This change makes that requirement explicit.

**ExpressibleByStringLiteral**

Portal now has conformance for `ExpressibleByStringLiteral` for simple use-cases where the Portal name and start directory are the same.

```swift
// This creates a `Portal` with name and startDir as "checkout"
// with no intialContext or liveUpdateConfig set.
let portalView = PortalUIView(portal: "checkout")
```

### PortalWebView → PortalUIView & PortalUIWebView → PortalView

The PortalWebView (the UIKit class) name has been changed to `PortalUIView`. `PortalUIWebView` (the SwiftUI struct) name as been changed to `PortalView`. All other functionality remains the same.

### PortalsPlugin and Native PubSub separated

In an effort to make the `PortalsPlugin` more focused on simply exposing native behavior to the Web, a new enum `PortalsPubSub` has taken the role of brokering the actual messages, with `PortalsPlugin` providing a small plugin interface wrapping calls to `PortalsPubSub` for Capacitor. `PortalsPlugin` is no longer publicly accessible, but is exposed to the Objective-C runtime for Capacitor to load.

**Before**

```swift
let subscriptionRef = PortalsPlugin.subscribe("topic") { result in
    // do something with result
}

PortalsPlugin.publish("topic", "data")
PortalsPlugin.unsubscribe("topic", subscriptionRef)
```

**After**

```swift
let subscriptionRef = PortalsPubSub.subscribe("topic") { result in
    // do something with result
}

PortalsPubSub.publish("data", to: "topic")
PortalsPubSub.unsubscribe(from: "topic", subscriptionRef: subscriptionRef)
```

### Improvements and API Changes to PubSub Interface

#### A `subscribe(to:)` Method that returns an `AnyCancellable`

Having to manually manage unsubscribing from a `PortalsPubSub` subscription can be error prone and must occur to prevent a closure from being retained indefinitely, which could lead to memory issues. An `AnyCancellable` will run it's `cancel` method on deinit or when explicitly called. IonicPortals provides the AnyCancellable with the unsubscribe logic so you don't have to juggle managing a subscription counter that has no semantic value for your application.

```swift
import UIKit
import Combine // Needed for AnyCancellable visibility
import IonicPortals

class ViewController: UIViewController {
    var cancellable: AnyCancellable?

    override func viewDidLoad() {
        cancellable = PortalsPubSub.subscribe(to: "topic") { result in
            // Do something with result
        }

        super.viewDidLoad()
    }
}
```

#### Combine Support

IonicPortals has support for emitting `SubscriptionResult` through a Combine Publisher:

```swift
import Combine
import IonicPortals

// Emits `SubscriptionResult` downstream
let publisher = PortalsPubSub.publisher(for: "topic")

// Extracts the `data` value from SubscriptionResult
let dataPublisher = PortalsPubSub.publisher(for: "topic")
    .data()

// Attempts to cast the `data` value from SubscriptionResult,
// returning nil on failure
let dataAsPublisher = PortalsPubSub.publisher(for: "topic")
    .data(as: String.self)

// Attempts to cast the `data` value from SubscriptionResult,
// returning an error on failure.
let tryDataAsPublisher = PortalsPubSub.publisher(for: "topic")
    .tryData(as: String.self)

// Attempts to decode the `JSObject` to any type conforming
// to `Decodable`
let decodeDataPublisher = PortalsPubSub.publisher(for: "topic")
    .decodeData(MyDecodableType.self, decoder: JSONDecoder())
```

#### Swift Concurrency Support

_only available for Swift 5.6 +_

Added a `subscribe(to:)` method that returns an `AsyncStream<SubscriptionResult>`:

```swift
import IonicPortals

let task = Task {
    for await result in PortalsPubSub.subscribe(to: "topic") {
        // do something with result
    }
}
```
