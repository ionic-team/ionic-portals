---
title: PortalWebView
sidebar_label: Portal WebView
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalWebView](./portal-webview) class is an iOS [UIView](https://developer.apple.com/documentation/uikit/uiview) that you can use to easily build a `View` via Storyboard for a [Portal](./portal). While you can show a [Portal](./portal) to a user using the [PortalWebView](./portal-webview) class directly, it is recommended to use this via Storyboard.

If you need to programmtically create a view, you can override the root view in an overriden `UIView.viewDidLoad` function as shown below.

```swift title=MyViewController.swift
import UIKit
import IonicPortals

class MyViewController: AppParticipantViewController {
    override func viewDidLoad() {
        let portal = try! PortalManager.getPortal("MyPortal")        
        let portalWebView = PortalWebView(frame: view.frame, portal: portal)
        self.view = portalWebView
        super.viewDidLoad()
    }
}
```

See our [getting started guide](../../getting-started/iOS#using-the-portalwebview) for more information on this approach.

:::info
Even though there are no Objective-C code samples, the Ionic Portals library can be used with apps written in Objective-C.
:::

## Constructors

### constructor

#### Usage 
 
```swift
let view: UIView = someView
let portal: Portal = somePortal
let portalWebView: PortalWebView = PortalWebView(frame: view.frame, portal: portal)
``` 

#### Parameters

Name | Type | Description
:------ | :------ | :------
`frame` | [CGRect](https://developer.apple.com/documentation/coregraphics/cgrect) | The bounding [CGRect](https://developer.apple.com/documentation/coregraphics/cgrect) to contain the [Portal](./portal). 
`portal` | [Portal](./portal) | The [Portal](./portal) to show when in the WebView.
