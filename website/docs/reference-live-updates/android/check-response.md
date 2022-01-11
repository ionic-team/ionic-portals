---
title: CheckResponse
sidebar_label: "CheckResponse"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Check Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`success` | [SuccessResponse?](./success-response) | Details about the response if successful.
`error` | [ErrorResponse?](./error-response) | Details about the response if there was an error.
