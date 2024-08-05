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
  liveUpdateConfig?: LiveUpdateConfig;
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

> **_NOTE:_** A TypeScript module resolution Node16, NodeNext, or Bundler is required to recognize Super Capacitor's use of subpath exports.

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

> **_NOTE:_** A TypeScript module resolution Node16, NodeNext, or Bundler is required to recognize Super Capacitor's use of subpath exports.


## Plugins
A microapp can only use plugins installed in its superapp. All superapp plugins are automatically available to its microapps. If a microapp requires a plugin not used by its superapp, that plugin must still be installed in the superapp.
