---
title: Snapshot
sidebar_label: "Snapshot"
---

*These classes are used for the LiveUpdate API from Appflow and not intended to be modified*

## Snapshot Class

The Snapshot class is used to provide information about the snapshot from the Live Update API. In Objective-C contexts, it is named `IONSnapshot`.

### Parameters

Name | Type | Description
:------ | :------ | :------
`id` | String | The Snapshot ID
`build_id` | String | The Appflow build ID
`binary_version` | String | The `CFBundleShortVersionString` of the application
`last_used` | Int64 | The timestamp of the last sync time
