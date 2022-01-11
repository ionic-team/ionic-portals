---
title: DownloadResponse
sidebar_label: "DownloadResponse"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Download Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`error` | [ErrorResponse?](./error-response) | Details about the response if there was an error.
`File` | File? | The download file if successful.
