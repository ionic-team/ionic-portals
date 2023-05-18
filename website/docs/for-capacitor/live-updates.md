---
title: Live Updates
sidebar_label: Live Updates
---

The real power of Federated Capacitor comes in with [Appflow Live Updates](https://ionic.io/docs/appflow/deploy/intro). So let's configure a few of the applications we are using. If you are using a monorepo you will need to add some configuration to your base directory. You can read more about that in [Appflows docs](https://ionic.io/docs/appflow/cookbook/appflow-config)

First let's add Live Updates to the main shell application. Modify the `capacitor.config.ts` file to add a `liveUpdateConfig` section to the FederatedCapacitor application.

```typescript title=capacitor.config.ts
    FederatedCapacitor: {
      shell: {
        name: 'shell',
        liveUpdateConfig: {
          appId: "YOUR_APP_ID_IN_APPFLOW",
          channel: "production",
          autoUpdateMethod: "none"
        }
      },
```

- **appId**: Replace `YOUR_APP_ID_IN_APPFLOW` with your own id. (example: `e9597b11`)
- **channel**: By default all releases happen in Appflow from the `production` channel but you can setup whatever channel you need here.
- **autoUpdateMethod**: Options would be `none` or `background`. You would choose `none` if you want to call the update method on your own, but the most common choice here would be `background` where the updates happen automatically.

After you have made these changes and done a build the application will begin pulling updates from Appflow using the IDs that you have provided. See the [reference](reference) documentation for methods on performing live updates manually from your application code.

## Self-hosted Live Updates

Federated Capacitor supports [Self-hosted Live Updates](https://ionic.io/docs/appflow/deploy/setup/self-hosted)! For our customers with strict security requirements, Self-hosted Live Updates includes enhanced security features built on top of Appflow's already secure delivery mechanisms. Follow the instructions in the [Appflow Docs](https://ionic.io/docs/appflow/deploy/setup/self-hosted#code-signing-generate-live-update-signing-keys) to get started. However, there is no need to install any additional plugins in your app.

Modify the `capacitor.config.ts` file to add a `liveUpdatesKey` field to the FederatedCapacitor application. This informs the Federated Capacitor plugin where to find the public key used for Self-hosted Live Updates.

```typescript title=capacitor.config.ts
    FederatedCapacitor: {
      liveUpdatesKey: "public.pem"
      shell: {
        name: 'shell',
        liveUpdateConfig: {
          appId: "YOUR_APP_ID_IN_APPFLOW",
          channel: "production",
          autoUpdateMethod: "none"
        }
      },
```

The location specified is relative to the **shell** directory specified in the config. For example, in the [example](example) application we placed the `public.pem` key file in the `packages/shell` directory.

:::note
While the `liveUpdatesKey` is present in the config, Federated Capacitor will assume that all Live Updates need to be validated against the provided public key. If this feature is not required, do not provide a key in the config.
:::
