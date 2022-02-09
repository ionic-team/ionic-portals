---
title: Using Portals in iOS
sidebar_label: Using Portals in iOS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you [obtain an API key](./guide#signup) and [install Ionic Portals](./guide#install), you can start creating Portals for your application.

## Creating a Portal via PortalManager

Portals are defined and configured at the startup of your application. A typical place to do so is in the `AppDelegate#application` method. There, you can use the [PortalManager](../reference/ios/portal-manager) to quickly create a [Portal](../reference/ios/portal):


```swift title=AppDelegate.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    PortalManager.register("MY_API_KEY")
            
    _ = PortalManager
        .newPortal("MY_FIRST_PORTAL")
        .create()
    
    return true
}
```

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
:::

The [newPortal()](../reference/ios/portal-manager#newportal) method takes in the `portalId` that will be used to identify the portal.

By default, the PortalManager will look for a folder named the same as the `portalId` as the location of the web assets. You can use the [setStartDir()](../reference/ios/portal-builder#setstartdir) function to set the web application's directory.

Now, the [Portal](../reference/ios/portal) is successfully created and managed by the [PortalManager](../reference/ios/portal-manager).

## Using the PortalWebView

After setting up your portal, you can begin to use it on your pages.

To do so, you first obtain your desired Portal from the [PortalManager.getPortal](../reference/ios/portal-manager#getPortal) method. Then, you create a [PortalWebView](../reference/ios/portal-webview) by passing in the current view's frame, and then the portal. Last, you replace the current view controller's view with the portal web view.

To display the Portal, you use the [PortalWebView](../reference/ios/portal-webview) class. You pass in a reference to the current view's frame, and the Portal class obtained by `id` from the PortalManager class.

For SwiftUI, use the [PortalWebUIView](../reference/ios/portal-webuiview) struct. Pass in a reference to the portal, and use SwiftUI Layout to do the rest.


<Tabs 
    defaultValue="uikit" 
    values={[
        { label: 'UIKit', value: 'uikit', },
        { label: 'SwiftUI', value: 'swiftui', },
    ]}
>
<TabItem value="uikit">

```swift title=ViewController.swift
class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let portal = try! PortalManager.getPortal("MY_FIRST_PORTAL")
        let portalWebView = PortalWebView(frame: view.frame, portal: portal)
        self.view = portalWebView
        // Do any additional setup after loading the view.
    }
}
```

</TabItem>
<TabItem value="swiftui">

```swift
struct ContentView: View {
    var portal = PortalManager.getPortal("MY_FIRST_PORTAL")
    
    var body: some View {
        VStack {
            PortalUIWebView(self.portal)
        }
    }
}
```

</TabItem>

</Tabs>

## Adding Web Code

Now that your Portal is successfully registered, created, and added to the view, you need to add the web assets to your application. In iOS, the web folder needs to be copied and added to the XCode project. After the folder is added, you can update its contents with fresh builds of the web application. For more information on how to set up your web bundle, see our how-to guide on [how to pull in a web bundle](../how-to/pull-in-web-bundle).
