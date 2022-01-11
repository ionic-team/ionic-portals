---
title: Data
sidebar_label: "Data"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Data data class is used to provide details in the [SuccessResponse](./success-response) data class.

### Parameters

Name | Type | Description
:------ | :------ | :------
`url` | String? | A download url for an available update.
`available` | Boolean | True if an update is available.
`snapshot` | String? | The snapshot ID of an available update.
`partial` | Boolean | If the update is available as a partial download.
`build` | String? | The build ID for the update.
`compatible` | Boolean | If the available update is compatible with the device.
`incompatibleUpdateAvailable` | Boolean | True if an incompatible update is available.
