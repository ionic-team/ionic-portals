---
title: PortalMethod
sidebar_label: "@PortalMethod"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [@PortalMethod](./portal-method) annotation is used to easily create functions to use with the [PortalsPlugin](./portals-plugin). A function with a [@PortalMethod](./portal-method) can be triggered by using the [Portals.sendMessage()](./portals-plugin) function from the [PortalsPlugin](./portals-plugin) class with the `message` parameter on the web code matching the function name in the native code.

The below example shows how to setup a function `nativeFunction` on an Android [Fragment](https://developer.android.com/reference/androidx/fragment/app/Fragment) and call it from the web code.

### Android

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
class MyPortalFragment : PortalFragment() {
    // ...
    public fun onCreate(savedInstanceState: Bundle?): Unit {
        super.onCreate(savedInstanceState)
        // ...
        this.linkMessageReceivers(this)
    }

    @PortalMethod
    public fun nativeFunction(payload: String): Unit {
        // run native code here
    }
}
```

</TabItem>
<TabItem value="java">

```java
class MyPortalFragment extends PortalFragment {
    // ...
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // ...
        this.linkMessageReceivers(this);
    }

    @PortalMethod
    public void nativeFunction(String payload) {
        // run native code here
    }
}
```

</TabItem>
</Tabs>

### Web

```typescript
import { Portals } from "@native-portal/portals";

Portals.sendMessage({ message: "nativeFunction", payload: result });
```
