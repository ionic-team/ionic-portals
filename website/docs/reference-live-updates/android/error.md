---
title: Error
sidebar_label: "Error"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Error data class is a used to provide error information in the [ErrorResponse](./error-response) class.

### Parameters

Name | Type | Description
:------ | :------ | :------
`link` | String? | A link if present in the error.
`message` | String | An explanation of the error.
`type` | String | The error type.
`details` | List&lt;Details>? | A list of more details about the error.
`event_id` | String | An ID assigned to the event.
