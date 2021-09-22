---
title: PortalsPlugin
sidebar_label: Portals Plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalsPlugin](./portals-plugin) class is a special Capacitor Plugin within the Portals library that allows for bi-directional communication between Android code and Web code. It is loaded with every Portal automatically and does not need to be added like other plugins.

## Types

### SubscriptionResult

An Object defining data received from the web application to a [Subscriber](./portals-plugin#subscribe)

```kotlin
class SubscriptionResult(
    val topic: String,
    val data: Any,
    val subscriptionRef: Int
    
    fun toJSObject(): JSObject
}
```

## Methods

### publish

Send a message to the web application.

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
// String message
PortalsPlugin.publish("topic", "message content")

// JSON message
val items = JSONArray()
items.put("cheese")
items.put("bacon")
items.put("eggs")

PortalsPlugin.publish("cart", items)
```

</TabItem>
<TabItem value="java">

```java
// String message
PortalsPlugin.publish("cart", items);

// JSON message
JSONArray items = new JSONArray();
items.put("cheese");
items.put("bacon");
items.put("eggs");

PortalsPlugin.publish("cart", items);
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic associated with the message. [Subscribers](./portals-plugin#subscribe) of this topic will receive the message
`data` | `Any` | A message to send. **Note**: this is added into a JSONObject to send through the Capacitor Bridge and should be a compatible type: JSONObject, JSONArray, String, Boolean, Integer, Long, Double, or null

### subscribe

Subscribe to receive messages from the web application.

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
// Subscribe to the "example-result" topic and check for
// a specific string to act on
PortalsPlugin.subscribe("example-result") { result ->
    if (result.data == "cancel" || result.data == "success") {
        this.dismiss()
    }
}
```

</TabItem>
<TabItem value="java">

```java
// Subscribe to the "example-result" topic and check for
// a specific string to act on
PortalsPlugin.subscribe("example-result", (result -> {
    boolean doDismiss = result.getData().equals("cancel")
                    || result.getData().equals("success");

    if(doDismiss) {
        this.dismiss();
    }

    return Unit.INSTANCE;
}));
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic associated with the message
`data` | [SubscriptionResult](./portals-plugin#subscriptionresult) -> Unit | A function to receive and handle the message

### unsubscribe

Unsubscribe from messages sent to a certain topic from the web application.

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
// Subscribe to the "example-result" topic and check for
// a specific string to act on. Store the result of subscribe
// to keep a reference to unsubscribe with later
val subscription = PortalsPlugin.subscribe("example-result") { result ->
    if (result.data == "cancel" || result.data == "success") {
        this.dismiss()
    }
}

// Unsubscribe from "example-result"
PortalsPlugin.unsubscribe("example-result", subscription)
```

</TabItem>
<TabItem value="java">

```java
// Subscribe to the "example-result" topic and check for
// a specific string to act on. Store the result of subscribe
// to keep a reference to unsubscribe with later
int subscription = PortalsPlugin.subscribe("example-result", (result -> {
    boolean doDismiss = result.getData().equals("cancel")
            || result.getData().equals("success");

    if(doDismiss) {
        this.dismiss();
    }

    return Unit.INSTANCE;
}));

// Unsubscribe from "example-result"
PortalsPlugin.unsubscribe("example-result", subscription);
```

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to unsubscribe from
`subscriptionRef` | `Int` | A reference to the subscription
