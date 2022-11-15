---
title: Reload Portals with Live Updates
sidebar_label: Reload Portals with Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When new Portal web content is downloaded from Appflow using Live Updates, the Portal will need to be reloaded before the app user sees the updated content. The default behavior of the Portals library is to continue displaying the existing web content to the user until the view is reloaded by the user. A Portal can be reloaded with code if you want the user to view the new content sooner.

:::tip
Consider that a user may be in the middle of doing work inside the Portal as new web content is downlaoded through Live Updates and reloading the Portal may interrupt them.
:::

The following examples show how an active Portal could be reloaded after a Live Update has finished downloading.

```swift title="ViewController.swift"
override func viewDidLoad() {
    LiveUpdateManager.shared.sync(appId: self.appId) { result in
        switch result {
        case .error(let error):
            // handle error
            print("Sync failed with error: \(error)")
        case .success:
            self.portalView.reload()
        }
      }

    super.viewDidLoad()
}
```
