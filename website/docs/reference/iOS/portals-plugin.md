---
title: PortalsPubSub
sidebar_label: PortalsPubSub
---

The [PortalsPlugin](./portals-plugin) class is a special Capacitor Plugin within the Portals library that allows for bi-directional communication between iOS code and Web code. It is loaded with every Portal automatically and does not need to be added like other plugins.

## Types

### SubscriptionResult

A struct defining data received from the web application to a [Subscriber](./portals-plugin#subscribe)

```swift
public struct SubscriptionResult {
    public var topic: String
    public var data: Any
    public var subscriptionRef: Int
}
```

## Methods

### `publish(_:message:)`

Send a message to the web application.

#### Usage

```swift
// String message
PortalsPubSub.publish("topic", message: "message content")

// Array message
let items = ["cheese", "bacon", "eggs"]
PortalsPlugin.publish("cart", message: items)
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic associated with the message. [Subscribers](./portals-plugin#subscribe) of this topic will receive the message
`message` | `JSValue?` | A message to send. **Note**: this is transmitted as JSON through the Capacitor Bridge and should be a compatible type: `String`, `Bool`, `Int`, `nil`, an `Array` containing any of those types, or a `Dictionary` keyed by `String` and values being any of the other compatible types (including itself).

### `subscribe(_:_:)`

Subscribe to receive messages from the web application. Callers using this method must call the [unsubscribe](./portals-plugin#unsubscribe) method directly to prevent the callback being called indefinitely.

#### Usage

```swift
// Subscribe to the "dismiss" topic and check for
// a specific string to act on
PortalsPubSub.subscribe("dismiss") { result in
    guard let data = result.data as? String,
        data == "cancel" || data == "success"
    else { return }

    DispatchQueue.main.async {
        PortalsPubSub.unsubscribe(
          from: "dismiss", 
          subscriptionRef: result.subscriptionRef
        )

        self.dismiss(animated: true, completion: nil)
    }
}
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to
`callback` | [`SubscriptionResult`](./portals-plugin#subscriptionresult)` -> ()` | A function to receive and handle the message

**Returns:** <span class="return-code">Int</span>

### `subscribe(to:_:)`




### unsubscribe

Unsubscribe from messages sent to a certain topic from the web application.

#### Usage

```swift
// Subscribe to the "dismiss" topic and check for
// a specific string to act on. Store the result of subscribe
// to keep a reference to unsubscribe with later
let subscription = PortalsPlugin.subscribe("dismiss", { result in
    if(result.data as! String == "cancel"
        || result.data as! String == "success") {
            DispatchQueue.main.async {
                self.dismiss(animated: true, completion: nil)
            }
    }
})

// Unsubscribe from "dismiss"
PortalsPlugin.unsubscribe("dismiss", subscription)
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to unsubscribe from
`subscriptionRef` | `Int` | A reference to the subscription
