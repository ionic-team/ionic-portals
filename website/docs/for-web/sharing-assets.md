---
title: Sharing Assets Between Portals
sidebar_label: Sharing Assets
---

# Overview

If you are devloping an application that contains multiple Portals, the Portals library supports the ability to share asset files between them. This is helpful to reduce the size of your overall app if those Portals use assets that are the same such as large media files or font files.

## Register Shared Assets

Shared Assets should be placed inside both native platforms in an accessible location and registered in the Portals Library. This provides the Web content with a mechanism to get a path to the shared assets within the native platform bundle.

Refer to the applicable documentation for [iOS](../for-ios/how-to/sharing-assets), [Android](../for-android/how-to/sharing-assets), or [React Native](../for-react-native/how-to/sharing-assets.md) to learn how to register shared assets on each native platform.

## Using Registered Assets

When shared assets are registered in the native platforms the path will be available from the [InitialContext](./portals-plugin#initialcontext) object from the [Portal Plugin](./portals-plugin). The names of asset maps registered in the native platforms will be available in this object as keys, and the values will be the path to use.

:::tip
When developing web content that is designed to use shared assets, check for the presence of the initialcontext object and default to a working path to view a working copy of the image during development that won't be included in the individual app assets.
:::

```typescript
const path_assets = getInitialContext<undefined>()?.assets?.images || 'src/assets';
const img_logo = path_assets + '/logo.jpg';
```
