---
title: Error
sidebar_label: "Error"
---

*These classes are used for the LiveUpdate API from Appflow and not intended to be modified*

## Error Class

The Error class is used to provide errors about the live update download instance. In an Objective-C context, this class is named `IONLiveUpdateError`.

### Parameters

Name | Type | Description
:------ | :------ | :------
`link` | String? | A link providing more info on the error thrown by the API. 
`message` | String | The API response message
`type` | String | The API response type
`details` | [[Details]?](./details) | An array of error details
`event_id` | String | The event ID of the thrown error from the API
