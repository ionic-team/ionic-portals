---
title: Snapshot
sidebar_label: "Snapshot"
---

*These data types are used for the LiveUpdate API from Appflow and not intended to be modified*

The Snapshot struct is used to provide information about the snapshot from the Live Update API.

### Parameters

Name | Type | Description
:------ | :------ | :------
`id` | String | The Snapshot ID
`buildId` | String | The Appflow build ID
`binaryVersion` | String | The `CFBundleShortVersionString` of the application
`lastUsed` | Date | The Date of the last sync time
