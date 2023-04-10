---
title: Sharing Assets Between Portals
sidebar_label: Sharing Assets
---

If you are developing an application that contains multiple Portals, the Portals library supports the ability to share asset files between them. This is helpful to reduce the size of your overall app if those Portals use assets that are the same such as large media files or font files.

## Register Shared Assets

Create a directory in `src/main/assets` in your Android project and a folder reference in your iOS project named `shared`.

:::caution

It is _extremely_ important that the relative path from `src/main/assets` and `Bundle.main` be the same on both platforms.

:::

Next, when creating the Portal, add an `AssetMap` for the shared asset directory.

```typescript
const portal = {
  name: 'foo',
  assetMaps: [
    {
      // This name will be made available to portal code by accessing
      // `getInitialContext`:
      // const mySharedAssetsVirtualPath = getInitialContext()?.assets?.mySharedAssets
      // This can allow for falling back to local development assets if
      // a developer working on a portal is not running in the application
      // context:
      // const assetPathPrefix = mySharedAssetsVirtualPath ?? '/public'
      // <img src=`${assetPathPrefix}/images/cats.png />`
      name: 'mySharedAssets',
      // The virtual path is how hrefs from the root of the shared
      // directory are determined. For example, to use a shared image
      // the portal code may look something like this:
      // <img src="/virtual/images/cats.png" />
      virtualPath: '/virtual',
      // The root directory of the assets relative to Bundle.main on
      // iOS and src/main/assets on Android. If omitted, the root
      // of Bundle.main and src/main/assets will be used.
      startDir: 'shared'
    }
  ]
}
```

When this Portal loads, the shared asset information will be passed to the web content as part of the Portal's [InitialContext](../../for-web/portals-plugin#initialcontext) object.

## Using Registered Assets

Refer to the page in the [Web docs](../../for-web/sharing-assets) to learn how to use your registered shared assets in your web content.
