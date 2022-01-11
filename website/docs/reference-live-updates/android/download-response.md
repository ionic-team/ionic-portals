---
title: DownloadResponse
sidebar_label: "Download Response"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Download Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`File` | File? | The download file if successful.
`error` | [ErrorResponse?](./error-response) | Details about the response if there was an error.
