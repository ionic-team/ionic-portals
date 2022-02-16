---
title: CheckResponse
sidebar_label: "Check Response"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Check Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`success` | [SuccessResponse](./check-response#successresponse-class) | Details about the response if successful.
`error` | [ErrorResponse?](./error-response) | Details about the response if there was an error.

## SuccessResponse Class

The Success Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`data` | [Data](./check-response#data-class) | Information about an available update or if no update.
`meta` | Meta | Misc. meta information.

## Data Class

The Data class is used to provide details in the SuccessResponse data class.

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
