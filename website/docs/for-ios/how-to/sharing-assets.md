---
title: Sharing Assets Between Portals
sidebar_label: Sharing Assets
---

# Overview

If you are devloping an application that contains multiple Portals, the Portals library supports the ability to share asset files between them. This is helpful to reduce the size of your overall app if those Portals use assets that are the same such as large media files or font files.

# Register Shared Assets

Create a directory within your app bundle to hold shared assets for your Portals. In this example we will name this directory "shared".

Next, when creating the Portal register an [AssetMap](https://ionic-portals-ios.vercel.app/documentation/ionicportals/assetmap) for the shared asset directory. The first property is a name for your shared assets registration, followed by a virtual path the web content will use. The last property is the name of the directory we created for the shared assets, "shared".

```swift
extension Portal {
  static let webapp = Self(
    name: "myportal",
    startDir: "portals/myportal",
    assetMaps: [.webapp]
  )
}

extension AssetMap {
    static let webapp = Self(
        name: "myshared",
        virtualPath: "/shared/assets", 
        startDir: "shared"
    )
}
```

When this Portal loads, the shared asset information will be passed to the web content as part of the Portal's [InitialContext](../../for-web/portals-plugin#initialcontext) object.

# Using Registered Assets

Refer to the page in the [Web docs](../../for-web/sharing-assets) to learn how to use your registered shared assets in your web content.