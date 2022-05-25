---
title: PortalUIView
sidebar_label: Portal UIView
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalUIView](./portal-uiview) class is an iOS [UIView](https://developer.apple.com/documentation/uikit/uiview) used to render a [Portal](./portal) to a user.

If you intend to render a Portal using the full dimensions of a `UIViewController`, you can set it as the view by overriding `loadView`:


<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift title=MyViewController.swift
import UIKit
import IonicPortals

class MyViewController: UIViewController {
    override func loadView() {
        let portal = Portal(name: "webapp")
        let portalWebView = PortalWebView(portal: portal)
        self.view = portalWebView
    }
}
```

</TabItem>

<TabItem value="objc">

```objectivec title=MyViewController.m
@import IonicPortals;

@implementation MyViewController
- (void)loadView {
    IONPortal *portal = [[IONPortal alloc] initWithName:@"webapp" startDir:nil initialContext:nil];
    self.view = [[IONPortalUIView alloc] initWithPortal:portal];
}
@end
``` 

</TabItem>

</Tabs>

See our [getting started guide](../../getting-started/iOS#using-the-portalwebview) for more information on this approach.

## Initializers

### `init(portal:)`

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
let portalView = PortalUIView(portal: Portal(name: "webapp"))
``` 

</TabItem>

<TabItem value="objc">

```objectivec
IONPortal *portal = [[IONPortal alloc] initWithName:@"webapp" startDir:nil initialContext:nil];
IONPortalUIView *portalView = [[IONPortalUIView alloc] initWithPortal: portal];
``` 

</TabItem>

</Tabs>
    

#### Parameters

Name | Type | Description
:------ | :------ | :------
`portal` | [Portal](./portal) | The [Portal](./portal) to show when in the WebView.
