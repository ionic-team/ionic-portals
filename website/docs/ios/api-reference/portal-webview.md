---
title: PortalWebView
sidebar_label: Portal WebView
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalView](./portal-view) class is an iOS [UIView](https://developer.apple.com/documentation/uikit/uiview) that you can use to easily build a  `View` via Storyboard or SwiftUI for a [Portal](./portal). While you can show a [Portal](./portal) to a user using the [PortalView](./portal-view) class directly, it is recommended to use this via Storyboard or SwiftUI.

If you need to programmtically create a view, you can override the root view in an overriden `UIView.viewDidLoad` function as shown below.

```swift
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

A full example is available HERE TODO: ADD TUTORIAL HERE

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
`portal` | [Portal](./portal) | The [Portal](./portal) to show whenin the webview.
