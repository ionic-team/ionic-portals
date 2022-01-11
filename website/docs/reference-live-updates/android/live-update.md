---
title: LiveUpdate
sidebar_label: Live Update
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Live Update data class contains information about an app working with Live Updates.

### Parameters

Name | Type | Description
:------ | :------ | :------
`appId` | String | The app ID of an app registered in Appflow.
`channelName` | String | The name of the channel to sync with.
`availableUpdate` | [AvailableUpdateState](./live-update#availableupdatestate-enum) | The state reflecting if there is an available update for this app with Live Updates.
`appState` | [AppState](./live-update#appstate-enum) | The state reflecting where in the update process the app may be before, during, or after a sync.

## AvailableUpdateState Enum

The Available Update State enum class contains states reflecting if there is an available update for this app with Live Updates.

### Values

Name | Description
:------ | :------
`AVAILABLE` | An update is available but not downloaded.
`PENDING` | An update is pending.
`READY` | An app is updated and/or ready to use.

## AppState Enum

The App State enum class contains states reflecting where in the update process the app may be before, during, or after a sync.

### Values

Name | Description
:------ | :------
`UNCHECKED` | App has not been checked for update.
`CHECKING` | Update check is in progress.
`CHECKED` | App has been checked for update.
`AVAILABLE` | An update is available but not downloaded.
`DOWNLOADING` | An update download is in process.
`DOWNLOADED` | App update has been downloaded.
`UNPACKING` | A downloaded update is in the process of being unpacked.
`UNPACKED` | Update has been unpacked.
`UPDATING` | A downloaded unpacked update is being applied.
`UPDATED` | The app is fully updated.
`CANCELED` | The update process is canceled.
`FAILED` | The update process failed.
