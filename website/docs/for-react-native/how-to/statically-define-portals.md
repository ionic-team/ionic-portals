---
title: Static Portals Configuration File
sidebar_label: Statically Configure Portals
---

An additional configuration method is now included to support a JSON configuration file to configure Portals on application start. The JSON file must be named `portals.config.json` and be placed in the application root on iOS and `assets` root on Android.

## JSON Schema

This Typescript schema is for illustration purposes only.

```typescript
type PortalConfig = {
  // The name of the public key file for secure live updates. If secure 
  // live updates are not being used, this field is not needed.
  // Must be located in the Bundle.main root on iOS and assets root on Android.
  liveUpdatesKey?: string;
  // The portals registration key normally passed to `register`.
  // This can be omitted if the `register` function is called before
  // attempting to render any portals in code.
  registrationKey?: string; 
  portals: []Portal;
}

// The Portal and LiveUpdate types are the same as their corresponding types
// in the library.
type Portal = {
  // The name of the Portal to be referenced. Must be unique.
  name: string;
  // Any CapcitorPlugins to register with the Portal.
  plugins?: []CapacitorPlugin;
  // The root directory of the web application relative to Bundle.main
  // on iOS and src/main/assets on Android. If omitted, `name` is used.
  startDir?: string;
  // Any data needed at initial render when a portal is loaded. If this
  // data is not statically known, it can be added dynamically on render
  // through `initialContext` props on `PortalView` and omitted from the
  // configuration.
  initialContext?: {
    [key: string]: any;
  };
  // The name of the initial file to load. If omitted, `index.html` is used.
  // This field is useful for scenarios when using an SSG like Next.js and
  // the entrypoint for the Portal is not the entrypoint for the overall
  // application.
  index?: string;
  // The live update configuration if the portal is configured for remote
  // updates.
  liveUpdate?: LiveUpdateConfig
};

type LiveUpdateConfig = {
  // The AppFlow application ID
  appId: string;
  // The AppFlow distribution channel
  channel: string;
  // Whether to perform a sync when the LiveUpdateConfig is registered.
  // If you want to manually control when a LiveUpdate sync is performed,
  // set this to false and use the `syncOne`, `syncSome`, or `syncAll` functions
  // provided by `@ionic/portals-react-native`.
  syncOnAdd: boolean;
};

type CapacitorPlugin = {
  androidClassPath: string;
  iosClassName: string;
};
```

At a minimum, when including a `portals.config.json` it must at least have the `portals` key defined with at least one valid `Portal` definition in the array. If you are using Live Updates, you must include a `LiveUpdate` configuration. If you are using Secure Live Updates, you must include the `liveUpdatesKey` in the configuration.

### Example Configuration

```json title=portals.config.json
{
  "registrationKey": "YOU_PORTALS_KEY",
  "portals": [
    {
      "name": "user",
      "startDir": "portals/shopwebapp",
      "initialContext": {
        "startingRoute": "/user"
      },
      "plugins": [
        {
          "androidClassPath": "com.capacitorjs.plugins.camera.CameraPlugin",
          "iosClassName": "CAPCameraPlugin"
        }
      ]
    },
    {
      "name": "help",
      "startDir": "portals/shopwebapp",
      "initialContext": {
        "startingRoute": "/help"
      }
    },
    {
      "name": "checkout",
      "startDir": "portals/shopwebapp",
      "initialContext": {
        "startingRoute": "/checkout"
      }
    },
    {
      "name": "featuredproducts",
      "startDir": "portals/featuredproducts",
      "liveUpdate": {
        "appId": "abcd1234",
        "channel": "production",
        "syncOnAdd": true
      }
    }
  ]
}
```

