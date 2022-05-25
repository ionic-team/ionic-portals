---
title: Ion WebApp
sidebar_label: "IonWebApp"
---

*These data types are used for the LiveUpdate API from Appflow and not intended to be modified*

The IonWebApp struct is used to provide details about the live update application downloaded from the Appflow API class. 

### Parameters

Name | Type | Description
:------ | :------ | :------
`channels` | Set<[Channel](./channel)> | A set of channels for this web application
`snapshots` | Set<[Snapshot](./snapshot)> | A set of snapshots for this web application
`lasySync` | Date? | The date of the last sync run by the `LiveUpdateManager`
`id` | String | The appId for this web application.

