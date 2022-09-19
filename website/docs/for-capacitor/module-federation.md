---
title: How to use with Module Federation
sidebar_label: How to use with Module Federation
---

The first thing you will need to do is choose a web based micro-frontend solution. The most common is Module Federation. After you have chosen and setup module federation between your apps you will need to configure it for how to build for Capacitor. The easiest way to do this is to add an environment variable to your npm build script.

In this case we are setting the variable CAP_BUILD to true.

```javascript
"scripts: {
  "build": "cross-env CAP_BUILD=true nx run-many --target=build --all",
  ...
}
```

This variable is then accessed within your module federation configuration as a way to identify when to use the Capacitor paths for your remotes. You can see below that we have three different MFEs that we are pulling into our primary Capacitor application (`account`, `checkout`, `helpinfo`).

```javascript
const isCapBuild = process.env.CAP_BUILD;

const remotes =
  isCapBuild == null
    // Configuration for when developing locally
    ? {
        account: 'account@http://localhost:3004/remoteEntry.js',
        checkout: 'checkout@http://localhost:3005/remoteEntry.js',
        helpinfo: 'helpinfo@http://localhost:3006/remoteEntry.js',
      }
    // Configuration for when building for capacitor
    : {
        account: `account@account/remoteEntry.js`,
        checkout: `checkout@checkout/remoteEntry.js`,
        helpinfo: `helpinfo@helpinfo/remoteEntry.js`,
      };

module.exports = {
  name: 'shell',
  remotes,
  ...
}
```

## Capacitor Configuration

The next step is to configure capacitor so that it knows where these files exist on the initial application build. You can see that there is configuration for the shell or main application and then config for the MFEs that are separate. the webDir paths are relative your the base directory of the shell application (where this configuration file lives). The names correspond to how you named the directories within the module federation config (`account`, `checkout`, `helpinfo`).

```typescript
const capacitorConfig: CapacitorConfig = {
  appId: "io.ionic.portals.ecommercewebapp",
  appName: "Portals Web App",
  webDir: "../shell/build",
  bundledWebRuntime: false,
  plugins: {
    // Portals for Capacitor configuration
    Portals: {
      shell: {
        name: "shell",
        webDir: "./build",
      },
      apps: [
        {
          name: "account",
          webDir: "../account/build",
        },
        {
          name: "checkout",
          webDir: "../checkout/build",
        },
        {
          name: "helpinfo",
          webDir: "../helpinfo/build",
        },
      ],
    },
  },
};
```

After this configuration is complete you should be able to build the shell application and see everything tied together in your native emulator. Easiest way to do this is run `npx cap open ios` and then build in Xcode.
