---
title: CheckCallback
sidebar_label: "CheckCallback"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Check Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

## Methods

### onComplete
_static_

Called when the [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method has finished.

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
// Async check call
LiveUpdateManager.checkForUpdate(context, "appId", object : CheckCallback {
    override fun onComplete(result: CheckResponse?) {
        // Do something with the result
    }
})
```

</TabItem>
<TabItem value="java">

```java
// Async check call
LiveUpdateManager.checkForUpdate(context, "appId", checkResponse -> {
    // Do something with response
});
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`response` | [CheckResponse](./check-response) | Check response model containing result data if successful or error information if failed.
