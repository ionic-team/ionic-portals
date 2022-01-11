---
title: SuccessResponse
sidebar_label: "SuccessResponse"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Success Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`data` | [Data](./data) | Information about an available update or if no update.
`meta` | Meta | Misc. meta information.
