---
title: ErrorResponse
sidebar_label: "ErrorResponse"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Error Response data class is used to provide error response details in the [CheckResponse](./check-response) and [DownloadResponse](./download-response) data classes.

### Parameters

Name | Type | Description
:------ | :------ | :------
`error` | [Error](./error) | A link if present in the error.
`meta` | Meta | Misc. meta information.
