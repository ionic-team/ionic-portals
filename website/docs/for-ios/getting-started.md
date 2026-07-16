---
title: Using Portals in iOS
sidebar_label: Using Portals in iOS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Creating a Portal

<Tabs
defaultValue="swift"
values={[
{ label: "Swift", value: "swift" },
{ label: "Objective-C", value: "objc" }
]}>
<TabItem value="swift">

Create a `Portal` via it's initializer:

```swift
let portal = Portal(name: "webapp")
```

`Portal` also conforms to `ExpressibleByStringLiteral`:

```swift
let portal: Portal = "webapp"
```

By default, a `Portal` will use the `name` property as the directory to load web content from (relative to the root of `Bundle.main`). You can specify another location if needed:

```swift
let portal = Portal(name: "webapp", startDir: "portals/webapp")
```

</TabItem>

<TabItem value="objc">

Create an `IONPortal` via it's initializer:

```objectivec
IONPortal *portal = [[IONPortal alloc] initWithName:@"webapp", startDir:nil, initialContext:nil];
```

By default, `IONPortal` will use the `name` provided in the initializer if `startDir` is `nil`.
</TabItem>

</Tabs>

## Using PortalView and PortalUIView

After you initialize a `Portal`, you create a [PortalView](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portalview) (for SwiftUI) or [PortalUIView](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portaluiview) (for UIKit) by passing in the `Portal`.

<Tabs
defaultValue="uikit-swift"
values={[
{ label: 'UIKit (Swift)', value: 'uikit-swift', },
{ label: 'UIKit (Objective-C)', value: 'uikit-objc' },
{ label: 'SwiftUI', value: 'swiftui', }
]}>
<TabItem value="uikit-swift">

```swift title="Portal Initializer"
class ViewController: UIViewController {
    override func loadView() {
        let portal = Portal(name: "webapp")
        self.view = PortalUIView(portal: portal)
    }
}
```

```swift title=ExpressibleByStringLiteral
class ViewController: UIViewController {
    override func loadView() {
        self.view = PortalUIView(portal: "webapp")
    }
}
```

</TabItem>

<TabItem value="uikit-objc">

```objectivec title=ViewController.m
@implementation ViewController
- (void)loadView {
    IONPortal *portal = [[IONPortal alloc] initWithName:@"webapp" startDir:nil initialContext:nil];
    self.view = [[IONPortalUIView alloc] initWithPortal:portal];
}
@end
```

</TabItem>

<TabItem value="swiftui">

```swift title=ContentView.swift
struct ContentView: View {
    var body: some View {
        VStack {
          // Using ExpressibleByStringLiteral conformance
          PortalView(portal: "webapp")
          PortalView(portal: .init(name: "webapp", startDir: "portals/webapp"))
        }
    }
}
```

</TabItem>

</Tabs>

## Adding Web Code

Now that your Portal is successfully created and added to the view, you need to add the web assets to your application. In iOS, the web folder needs to be copied and added to the XCode project. After the folder is added, you can update its contents with fresh builds of the web application. For more information on how to set up your web bundle, see our how-to guide on [how to pull in a web bundle](./how-to/pull-in-web-bundle.md).
