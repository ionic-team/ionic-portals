---
title: PortalView
sidebar_label: Portal View
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalView](./portal-view) struct is an iOS [UIViewControllerRepresentable](https://developer.apple.com/documentation/swiftui/uiviewcontrollerrepresentable) that you can use to easily add a [Portal](./portal) with SwiftUI.

In this example, we're creating a [Portal](./portal) instance, then we pass the portal to [PortalView](./portal-view) to render it:


```swift title=ContentView.swift
struct ContentView: View {
    var portal = Portal(name: "webapp")
    
    var body: some View {
        VStack {
            PortalView(portal: portal) { (bridge: CAPBridgeProtocol) in 
              // Use the bridge here to get access to anything
              // you may need from the Capacitor bridge. 
            }

            // You can also pass a `String` for the Portal
            // using it's `ExpressibleByStringLiteral` conformance
            PortalView(portal: "webapp")
        }
    }
}
```

See our [getting started guide](../../getting-started/iOS#using-the-portalwebview) for more information on this approach.

### Constructors

### constructor

#### Usage 
 
```swift
let portalView = PortalView(portal: Portal(name: "webapp"))
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------
`portal` | [Portal](./portal) | The [Portal](./portal) to show when in the WebView.
`onBridgeAvailable` | (CAPBridgeProtocol) -> Void | A callback to access the Capacitor bridge to access any injected plugins. Defaults to a no-op.
