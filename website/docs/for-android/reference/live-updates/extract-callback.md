---
title: ExtractCallback
sidebar_label: "Extract Callback"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Extract Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.extractUpdate()](./live-update-manager#extractupdate) method.

## Methods

### onComplete
_static_

Called when the [LiveUpdateManager.extractUpdate()](./live-update-manager#extractupdate) method has finished.

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
// Async extract call
LiveUpdateManager.extractUpdate("appId", zipFile, object : ExtractCallback {
    override fun onComplete(result: File?) {
        println(response?.path)
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Async extract call
LiveUpdateManager.extractUpdate(getContext(), zipFile, extractedFile -> {
    // Do something with file
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`file` | File | File object pointing to the path of the extracted files.
