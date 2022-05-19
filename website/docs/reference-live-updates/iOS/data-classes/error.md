---
title: LiveUpdateError
sidebar_label: "LiveUpdateError"
---

*These data types are used for the LiveUpdate API from Appflow and not intended to be modified*

The Error class is used to provide errors about the live update download instance.

### Parameters

Name | Type | Description
:------ | :------ | :------
`link` | String? | A link providing more info on the error thrown by the API. 
`message` | String | The API response message
`type` | String | The API response type
`details` | [[Details]?](./details) | An array of error details
`eventId` | String | The event ID of the thrown error from the API
