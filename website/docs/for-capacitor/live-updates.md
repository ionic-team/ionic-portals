---
title: Live Updates
sidebar_label: Live Updates
---

The real power of Portals for Capacitor comes in with AppFlow LiveUpdates. So let's configure a few of the applications we are using. If you are using a mono-repo you will need to add some configuration to your base directory. You can read more about that in [AppFlows docs](https://ionic.io/docs/appflow/cookbook/appflow-config)

First lets add config for the main shell application. Modify the `capacitor.config.ts` file to add the following.

```typescript
    Portals: {
      shell: {
        name: 'shell',
        webDir: './build',
        liveUpdateConfig: {
          appId: "YOUR_APP_ID_IN_APPFLOW",
          channel: "production",
          autoUpdateMethod: "none"
        }
      },
```

- **appId**: Replace `YOUR_APP_ID_IN_APPFLOW` with your own id. (example: `e9597b11`)
- **channel**: By default all releases happen in AppFlow from the `production` channel but you can setup whatever channel you need here.
- **autoUpdateMethod**: Options would be `none` or `background`. You would choose `none` if you want to call the update method on your own, but the most common choice here would be `background` where the updates happen automatically.

After you have made these changes and done a build the application will begin pulling updates from AppFlow using the IDs that you have provided.
