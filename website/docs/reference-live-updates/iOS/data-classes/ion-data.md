---
title: IonData
sidebar_label: "IonData"
---

*These data types are used for the LiveUpdate API from Appflow and not intended to be modified*

The IonData struct is used to provide details in the SuccessResponse data class.

### Parameters

Name | Type | Description
:------ | :------ | :------
`url` | String? | A download url for an available update.
`available` | Bool | True if an update is available.
`snapshot` | String? | The snapshot ID of an available update.
`partial` | Bool | If the update is available as a partial download.
`build` | String? | The build ID for the update.
`compatible` | Bool | If the available update is compatible with the device.
`incompatibleUpdateAvailable` | Boolean | True if an incompatible update is available.
