---
title: PortalsPlugin
sidebar_label: Portals Plugin
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

    func toMap() -> [String: Any]
}
```

## Methods

### publish

Send a message to the web application.

#### Usage

```swift
// String message
PortalsPlugin.publish("topic", "message content")

// Array message
let items = ["cheese", "bacon", "eggs"]
PortalsPlugin.publish("cart", items)
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic associated with the message. [Subscribers](./portals-plugin#subscribe) of this topic will receive the message
`data` | `Any` | A message to send

### subscribe

Subscribe to receive messages from the web application.

#### Usage

```swift
// Subscribe to the "dismiss" topic and check for
// a specific string to act on
PortalsPlugin.subscribe("dismiss", { result in
    if(result.data as! String == "cancel" || result.data as! String == "success") {
        DispatchQueue.main.async {
            self.dismiss(animated: true, completion: nil)
        }
    }
})
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to
`subscriptionRef` | [SubscriptionResult](./portals-plugin#subscriptionresult) -> () | A function to receive and handle the message

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
