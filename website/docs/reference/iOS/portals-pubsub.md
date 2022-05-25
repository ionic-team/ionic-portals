---
title: PortalsPubSub
sidebar_label: PortalsPubSub
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[PortalsPubSub](./portals-pubsub) provides a namespaced collection of methods for allowing bi-directional communication between iOS and your web applications that depend on `@ionic/portals`.

## Types

### SubscriptionResult

A struct defining data received from or sent to the web application. 

```swift
public struct SubscriptionResult {
    public var topic: String
    public var data: JSValue?
    public var subscriptionRef: Int
}
```

## Methods

### `publish(_:message:)`

Send a message to the web application.

#### Usage


<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
import IonicPortals

// String message
PortalsPubSub.publish("message content", to: "topic")

// Array message
let items = ["cheese", "bacon", "eggs"]
PortalsPubSub.publish(items, to: "cart")

// Dictionary message
let dict = ["ingredients": ["cheese", "bacon", "eggs"], "quantity": 2]
PortalsPubSub.publish(dict, to: "cart")

// Encodable message
struct Order: Encodable {
    var ingredients: [String]
    var quantity: Int
}

let encoder = JSONEncoder()
let order = Order(
    ingredients: ["cheese", "bacon", "eggs"],
    quantity: 2
)

PortalsPubSub.publish(try? encoder.encodeJSObject(order), to: "cart")
```

</TabItem>

<TabItem value="objc">

```objectivec
@import IonicPortals;

// String message
[IONPortalsPubSub publishMessage:@"message content" toTopic:@"topic"];

// Array message
NSArray *items = @[@"cheese", @"bacon", @"eggs"];
[IONPortalsPubSub publishMessage:items toTopic:@"cart"];

// Dictionary message
NSDictionary *order = @{ 
    @"ingredients": @[@"cheese", @"bacon", @"eggs"],
    @"quantity": @2
};

[IONPortalsPubSub publishMessage:order toTopic:@"cart"];
``` 

</TabItem>

</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic associated with the message. [Subscribers](./portals-pubsub#subscribe__) of this topic will receive the message
`message` | `JSValue?` | A message to send. **Note**: this is transmitted as JSON through the Capacitor Bridge and should be a compatible type: `String`, `Bool`, `Int`, `nil`, an `Array` containing any of those types, or a `Dictionary` keyed by `String` and values being any of the other compatible types (including itself).

### `subscribe(_:_:)`

Subscribe to receive messages from the web application. Callers using this method must call the [unsubscribe](./portals-pubsub#unsubscribefromsubscriptionref) method directly to prevent the callback being invoked indefinitely.

#### Usage

<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
import IonicPortals

// Subscribe to the "dismiss" topic and check for a specific string 
// to act on and unsubscribe when we no longer want the closure
// to execute
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

</TabItem>

<TabItem value="objc">

```objectivec
@import IonicPortals;

// Subscribe to the "dismiss" topic and check for a specific string
// to act on and unsubscribe when we ne longer want the block 
// to execute
[IONPortalsPubSub subscribeToTopic:@"dismiss" callback:^(NSDictionary<NSString *,id> * _Nonnull result) {
    NSString *message = result[@"data"];
    if (message != nil && ([message isEqualToString:@"success"] || [message isEqualToString:@"cancel"])) {
        [IONPortalsPubSub unsubscribeFromTopic:@"dismiss" subscriptionRef:result[@"subscriptionRef"]];
        [self dismissViewControllerAnimated:YES completion:nil];
    }
}];
``` 

</TabItem>

</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to
`callback` | [`SubscriptionResult`](./portals-pubsub#subscriptionresult)` -> ()` | A function to receive and handle the message

**Returns:** <span class="return-code">Int</span>

### `subscribe(to:_:)`

Subscribe to receive messages from the web application. This method returns an `AnyCanellable` that automatically unsubscribes on deinit.

```swift title=ViewController.swift
import Combine
import IonicPortals

var cancellable: AnyCancellable?

override func viewDidLoad() {
    self.cancellable = PortalsPubSub.subscribe(to: "dismiss") { result in 
        guard let data = result.data as? String,
            data == "cancel" || data == "success"
        else { return }

        DispatchQueue.main.async {
            // After our ViewController is popped off the stack and
            // deallocated this closure will no longer execute
            self.dismiss(animated: true, completion: nil)
        }
    }

    super.viewDidLoad()
}

func unsubscribe() {
    // You can still manually unsubscribe by either calling `cancel`
    cancellable?.cancel()

    // or setting it to nil if it is an `Optional` in your context
    cancellable = nil
}
```

#### Parameter

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to
`callback` | [`SubscriptionResult`](./portals-pubsub#subscriptionresult)` -> ()` | A function to receive and handle the message

**Returns:** <span class="return-code">AnyCancellable</span>

### `publisher(for:)`

Returns a `PortalsPubSub.Publisher` that emits [`SubscriptionResult`](./portals-pubsub#subscriptionresult) to downstream subscribers.

#### Usage

<Tabs
  defaultValue="uikit"
  values={[
    { label: "UIKit", value: "uikit" },
    { label: "SwiftUI", value: "swiftui" }
  ]}
>

<TabItem value="uikit">

```swift title=ViewController.swift
import Combine
import IonicPortals

var cancellable: AnyCancellable?

override func viewDidLoad() {
    self.cancellable = PortalsPubSub.publisher(for: "dismiss")
        .data(as: String.self)
        .filter { $0 == "cancel" || $0 == "success" }
        .receive(on: Dispatch.main)
        .sink { _ in 
            self.dismiss(animated: true, completion: nil)
        }

    super.viewDidLoad()
}
```

</TabItem>

<TabItem value="swiftui">

```swift title=ContentView.swift
import SwiftUI
import IonicPortals

struct CartView: View {
    @State private var shouldDisplayCheckout = false

    var body: some View {
        VStack {
            // Cart contents
            Button("Checkout") {
                shouldDisplayCheckout = true
            }
        }
        .sheet(isPresented: $shouldDisplayCheckout) {
            PortalView(portal "checkout")
        }
        .onReceive(
            PortalsPubSub.publisher(for: "dismiss")
                .data(as: String.self)
                .filter { $0 == "cancel" || $0 == "success" }
        ) { _ in 
            shouldDisplayCheckout = false
        }
    }
}
```

</TabItem>

</Tabs>

#### Parameter

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to

**Returns:** <span class="return-code">PortalsPubSub.Publisher</span>

### `subscribe(to:)`

Returns an `AsyncStream<SubscriptionResult>` to use with Swift structured concurrency.

#### Usage

<Tabs
  defaultValue="uikit"
  values={[
    { label: "UIKit", value: "uikit" },
    { label: "SwiftUI", value: "swiftui" }
  ]}
>

<TabItem value="uikit">

```swift title=ViewController.swift
import IonicPortals

var task: Task<Void, Never>?

override func viewDidLoad() {
    task = Task {
        let eventStream = PortalsPubSub.subscribe("dismiss")
            .compactMap { $0.data as? String }

        for await event in eventStream 
        where event == "success" || event == "cancel" {
            self.dismiss(animated: true, completion: nil)
        }
    }

    super.viewDidLoad()
}

deinit {
  task.cancel()
}
```

</TabItem>

<TabItem value="swiftui">

```swift title=ContentView.swift
import SwiftUI
import IonicPortals

struct CartView: View {
    @State private var shouldDisplayCheckout = false

    var body: some View {
        VStack {
            // Cart contents
            Button("Checkout") {
                shouldDisplayCheckout = true
            }
        }
        .sheet(isPresented: $shouldDisplayCheckout) {
            PortalView(portal: "checkout")
        }
        .task {
            let eventStream = PortalsPubSub.subscribe("dismiss")
                .compactMap { $0.data as? String }
            
            for await event in eventStream
            where event == "cancel" || event == "success" {
                shouldDisplayCheckout = false
            }
        }
    }
}
``` 

</TabItem>

</Tabs>

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to subscribe to

**Returns:** <span class="return-code">PortalsPubSub.Publisher</span>

### `unsubscribe(from:subscriptionRef:)`

Unsubscribe from messages received from the specified topic.

#### Usage

<Tabs 
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
let subscription = PortalsPlugin.subscribe("dismiss") { result in
    // Do something with result
}

// Unsubscribe from "dismiss"
PortalsPlugin.unsubscribe(
    from: "dismiss",
    subscriptionRef: subscription
)
```

</TabItem>

<TabItem value="objc">

```objectivec
NSInteger subRef = [IONPortalsPubSub subscribeToTopic:@"dismiss" callback:^(NSDictionary<NSString *,id> * _Nonnull result) {
    // Do something with result
}];

[IONPortalsPubSub unsubscribeFromTopic:@"dismiss" subscriptionRef: subRef];
```

</TabItem>

</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`topic` | `String` | The topic to unsubscribe from
`subscriptionRef` | `Int` | A reference to the subscription

