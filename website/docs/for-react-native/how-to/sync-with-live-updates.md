---
title: Syncing a Portal with Live Updates
sidebar_label: Syncing with Live Updates
---

The sync operation checks AppFlow for a new version of a web app used in a Portal. If an update is available, the files are downloaded and the Portal is updated to use those new files the next time it loads. The Live Updates SDK will perform a sync with the Live Update Config is added to the portal if it has been configured with `syncOnAdd: true`. This is typically done when an app is initially launched and requires a restart of an app to trigger subsequent syncs. We recommend performing a sync in other situations to provide more chances for Portals to update.

## Triggering a Sync

A sync can be triggered by calling the `syncOne`, `syncSome`, or `syncAll` functions exposed in `@ionic/portals-react-native`:

```typescript
import { syncOne, syncSome, syncAll } from `ionic/portals-react-native`;

// Sync a single live update
const singleResult = await syncOne('appId1');

// Sync many live updates
const manyResult = await syncSome(['appId1', 'appId2']);

// Sync all live updates
const allResult = await syncAll();
```

The appId provided to `syncOne` and `syncSome` should correspond to the live update configuration associated with the Portal desired to be updated.

See the Portals for React Native [reference documentation](https://react-native-ionic-portals.vercel.app) for the data that is returned from the sync calls.

