# Overview

Super Capacitor is a Capacitor plugin designed to allow Capacitor apps to utilize the capabilities of Ionic Portals.

## Install

```bash
npm install @ionic-enterprise/super-capacitor
npx cap sync
```

## Types

### PortalOptions

The options for configuring your portal when using [`presentPortal`](#presentportal).

```typescript
interface PortalOptions {
  name: string;
  presentationType: 'push' | 'modal';
  startDir?: string;
  initialContext?: InitialContext;
  plugins?: CapacitorPlugin[];
  liveUpdateConfig?: LiveUpdateConfig;
  modalStyle?: 'fullScreen' | 'pageSheet';
}
```

### CapacitorPlugin

If you need to use any Capacitor plugins, the classpath of the Android plugins and the Objective-C class name will have to be provided to [`PortalOptions`](#portaloptions) in the `plugins` property.

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

- [`presentPortal(options: PortalOptions)`](#presentportal)
- [`dismissPortal()`](#dismissportal)

### presentPortal

```typescript
presentPortal(options: PortalOptions) => Promise<void>
```

#### Usage

```typescript
import { presentPortal } from '@ionic-enterprise/super-capacitor/superapp';

presentPortal({ name: 'checkoutApp', startDir: 'portals/checkout', type: 'push' });
```

#### Parameters

| Name      | Type                              | Description                                                           |
| --------- | --------------------------------- | --------------------------------------------------------------------- |
| `options` | [`PortalOptions`](#portaloptions) | The [`PortalOptions`](#portaloptions) object to configure the portal. |

### dismissPortal

```typescript
dismissPortal() => Promise<void>
```

#### Usage

```typescript
import { dismissPortal } from '@ionic-enterprise/super-capacitor/miniapp';

dismissPortal();
```
