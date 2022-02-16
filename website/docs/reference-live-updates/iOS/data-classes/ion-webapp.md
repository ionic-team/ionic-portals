---
title: Ion WebApp
sidebar_label: "IonWebApp"
---

*These classes are used for the LiveUpdate API from Appflow and not intended to be modified*

## IonWebApp Class

The IonWebApp class is used to provide details about the live update application downloaded from the Appflow API class. In Objective-C, this class is named `IONLiveUpdateApp`.

### Parameters

Name | Type | Description
:------ | :------ | :------
`channels` | [[Channel]](./channel) | An array of channels for this web application
`snapshots` | [[Snapshot]](./snapshot) | An array of snapshots for this web application
`lasy_sync` | Int64? | A timestamp of the last sync run by the `LiveUpdateManager`
`id` | String | The appId for this web application.

