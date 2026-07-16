---
title: Using a Live Update Provider
sidebar_label: Live Update Provider
---

An app's live update source isn't limited to Appflow. A **Live Update Provider** lets an app sync its web assets from any other update service that supports it instead, whether that's a third-party update service or infrastructure your own organization runs.

:::note
This is for syncing an app's web assets from an update service other than Appflow. If you're using Appflow, see [Live Updates](./live-updates.md) instead.
:::

## Configure

Your update service ships its own Capacitor plugin that implements the provider contract. Add it to your project the way you would any other Capacitor plugin, following that plugin's own installation instructions, then reference it by name in `capacitor.config.ts` using `liveUpdateProvider` in place of `liveUpdateConfig`:

```typescript title=capacitor.config.ts
FederatedCapacitor: {
  apps: [
    {
      name: 'helpinfo',
      webDir: 'microfrontends/helpinfo',
      liveUpdateProvider: {
        pluginName: 'MyUpdateServicePlugin',
        autoUpdateMethod: 'background',
        config: {
          // whatever your update service's plugin expects
        },
      },
    },
  ],
},
```

- **pluginName**: the Capacitor plugin name your update service registers under. Federated Capacitor looks this plugin up at startup and uses it as the provider for this app.
- **config**: passed straight through to your update service's plugin unchanged. Consult that plugin's own documentation for what it expects here.
- **autoUpdateMethod**: `'none'` or `'background'`, same meaning as it has for Appflow. `'background'` triggers a sync automatically once the provider is resolved at startup.

:::tip
Building your own Live Update Provider plugin instead of using an existing update service's? See the [Live Update Provider SDK](https://github.com/ionic-team/live-update-provider-sdk) documentation.
:::

:::caution
On Android specifically, a provider-backed **shell** app doesn't have the same first-load guarantee an Appflow-backed shell has: resolving a provider requires looking it up on the Capacitor bridge by name, which is only possible once the bridge exists, and Android starts the WebView's first request around the same time it finishes registering plugins. In practice resolution happens well before that first request is handled, but it isn't a hard guarantee the way it is on iOS.
:::

## Syncing

Provider-backed apps use the exact same `syncOne`, `syncSome`, `syncAll`, and `reload` functions as Appflow-backed apps. See the [Reference](./reference.md) for the full API. There's nothing provider-specific to call; a given app's `name` is all that ties a sync call to whichever source (Appflow or provider) that app is actually configured with.

```typescript
import { syncOne } from '@ionic-enterprise/federated-capacitor';

const result = await syncOne({ name: 'helpinfo' });
```

If a sync succeeds, `SyncResult.metadata` will contain whatever sync metadata your provider's plugin returns, if any.
