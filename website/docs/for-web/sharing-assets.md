---
title: Sharing Assets Between Portals
sidebar_label: Sharing Assets
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Overview

If you are devloping an application that contains multiple Portals, the Portals library supports the ability to share asset files between them. This is helpful to reduce the size of your overall app if those Portals use assets that are the same such as large media files or font files.

## Register Shared Assets

Shared Assets should be placed inside both native platforms in an accessible location and registered in the Portals Library. This provides the Web content with a mechanism to get a path to the shared assets within the native platform bundle.

### Android

Create a directory in the `src/main/assets` directory to hold shared assets for your Portals. In this example we will name this directory "shared". Therefore, the full path of the shared asset directory where we will place the shared resources is `src/main/assets/shared`.

Next, when creating the Portal register an [AssetMap](http://link) for the shared asset directory. The first property is a name for your shared assets registration, followed by a virtual path the web content will use. The last property is the name of the directory we created for the shared assets, "shared".

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
PortalManager.newPortal("myportal")
    .addAssetMap(AssetMap("myshared","/shared/assets","shared"))
    .create()
```

</TabItem>
<TabItem value="java">

```java
PortalManager.newPortal("myportal")
    .addAssetMap(new AssetMap("myshared","/shared/assets","shared"))
    .create();
```

</TabItem>
</Tabs>

When this Portal loads, the shared asset information will be passed to the web content as part of the Portal's [InitialContext](./portals-plugin#initialcontext) object.

### iOS

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

When this Portal loads, the shared asset information will be passed to the web content as part of the Portal's [InitialContext](./portals-plugin#initialcontext) object.

## Using Registered Assets

When shared assets are registered in the native platforms the path will be available from the [InitialContext](./portals-plugin#initialcontext) object from the [Portal Plugin](./portals-plugin). The names of asset maps registered in the native platforms will be available in this object as keys, and the values will be the path to use.

:::tip
When developing web content that is designed to use shared assets, check for the presence of the initialcontext object and default to a working path to view a working copy of the image during development that won't be included in the individual app assets.
:::

```typescript
const path_assets = getInitialContext<undefined>()?.assets?.images || 'src/assets';
const img_logo = path_assets + '/logo.jpg';
```