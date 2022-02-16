---
title: DownloadCallback
sidebar_label: "Download Callback"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Check Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method.

## Methods

### onComplete
_static_

Called when the [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method has finished.

#### Usage
<Tabs
    defaultValue="kt"
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
// Async download call
LiveUpdateManager.downloadUpdate(applicationContext, "appId", "snapshotId", object : DownloadCallback {
    override fun onComplete(result: DownloadResponse?) {
        // Do something with result
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Async download call
LiveUpdateManager.downloadUpdate(getContext(), "appId", "snapshotId", downloadResponse -> {
    // Do something with response
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`response` | [DownloadResponse](./download-response) | Download response model containing result data if successful or error information if failed.
