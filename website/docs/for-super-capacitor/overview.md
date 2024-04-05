# Overview

Super Capacitor is a Capacitor plugin designed to allow Capacitor apps to utilize the capabilities of Ionic Portals.

## Install

```bash
npm install @ionic-enterprise/super-capacitor
npx cap sync
```

## Types

### MicroappOptions

The options for configuring your microapp when using [`presentMicroapp`](#presentmicroapp).

```typescript
interface MicroappOptions {
  name: string;
  type: 'push' | 'modal';
  modalStyle?: 'fullScreen' | 'pageSheet';
  startDir?: string;
  initialContext?: InitialContext;
  plugins?: CapacitorPlugin[];
  liveUpdateConfig?: LiveUpdateConfig;
}
```

### CapacitorPlugin

If you need to use any Capacitor plugins, the classpath of the Android plugins and the Objective-C class name will have to be provided to [`MicroappOptions`](#microappoptions) in the `plugins` property.

```typescript
interface CapacitorPlugin {
  /** The classpath of the plugin to be used in Android. (e.g. com.capacitorjs.plugins.camera.CameraPlugin) */
  androidClassPath: string;
  /** The class name of the plugin to be used in iOS.
   * This must be the name as it is exposed to the Objective-C runtime.
   * For example, The CameraPlugin swift class is exposed to Objective-C as CAPCameraPlugin.
   */
  iosClassName: string;
}
```

## Methods

- [`presentMicroapp(options: MicroappOptions)`](#presentmicroapp)
- [`dismissMicroapp()`](#dismissmicroapp)

### presentMicroapp

```typescript
presentMicroapp(options: MicroappOptions) => Promise<void>
```

#### Usage

```typescript
import { presentMicroapp } from '@ionic-enterprise/super-capacitor/superapp';

presentMicroapp({
  name: 'checkoutApp',
  startDir: 'microapps/checkout',
  type: 'push',
});
```

> **_NOTE:_** A Typescript module resolution Node16, NodeNext, or Bundler is required to recognize Super Capacitor's use of subpath exports.

#### Parameters

| Name      | Type                                  | Description                                                                 |
| --------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `options` | [`MicroappOptions`](#microappoptions) | The [`MicroappOptions`](#microappoptions) object to configure the microapp. |

### dismissMicroapp

```typescript
dismissMicroapp() => Promise<void>
```

#### Usage

```typescript
import { dismissMicroapp } from '@ionic-enterprise/super-capacitor/microapp';

dismissMicroapp();
```

> **_NOTE:_** A Typescript module resolution Node16, NodeNext, or Bundler is required to recognize Super Capacitor's use of subpath exports.
