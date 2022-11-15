---
title: ErrorResponse
sidebar_label: "Error Response"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Error Response data class is used to provide error response details in the [CheckResponse](./check-response) and [DownloadResponse](./download-response) data classes.

### Parameters

Name | Type | Description
:------ | :------ | :------
`error` | [Error](./error-response#error-class) | A link, if present, in the error.
`meta` | Meta | Misc. meta information.

## Error Class

The Error data class is a used to provide error information in the ErrorResponse class.

### Parameters

Name | Type | Description
:------ | :------ | :------
`link` | String? | A link, if present, in the error.
`message` | String | An explanation of the error.
`type` | String | The error type.
`details` | List&lt;Details>? | A list of more details about the error.
`event_id` | String | An ID assigned to the event.
