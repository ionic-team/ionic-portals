---
title: Details
sidebar_label: "Details"
---

*These classes are used for the LiveUpdate API from Appflow and not intended to be modified*

## Details Class

The Details class is used to provide error details about the live update download instance. In Objective-C contexts, it is named `IONLiveUpdateDetails`

### Parameters

Name | Type | Description
:------ | :------ | :------
`parameter` | String | The parameter that is erroring out 
`errorType` | String | The type of error thrown by the API
`errors` | [String] | An array of errors thrown.
