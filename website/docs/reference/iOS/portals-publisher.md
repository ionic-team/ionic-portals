---
title: PortalsPubSub.Publisher
sidebar_label: PortalsPubSub Publisher
---

[PortalsPubSub.Publisher](./portals-publisher.md) is a Combine publisher whose `Output` is [`SubscriptionReult`](./portals-pubsub#subscriptionresult) and `Failure` is `Never`.

## Methods

### `data()`

Extracts the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) and publishes it downstream.


#### Usage

```swift
import Combine
import IonicPortals

let cancellable = PortalsPubSub
    .publisher(for: "cart")
    .data()
    .sink { (data: JSValue?) in 
        // Do something with the data
    }

```

**Returns:** <span class="return-code">AnyPublisher<JSValue?, Never></span>

### `data(as:)`

Attempts to cast the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to the provided type and returns nil on casting failure.

#### Usage

```swift
import Combine
import IonicPortals

let cancellable = PortalsPubSub
    .publisher(for: "cart")
    .data(as: [String: Any].self)
    .sink { (data: [String: Any]?) in
        // Do something with the data 
    }
```
#### Parameters

Name | Type | Description
:------ | :------ | :------
`type` | `T` | The type to cast the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to

**Returns:** <span class="return-code">AnyPublisher<T?, Never></span>

### `tryData(as:)`

Attempts to cast the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to the provided type and emits an `Error` on failure.

#### Usage

```swift
import Combine
import IonicPortals

let cancellable = PortalsPubSub
    .publisher(for: "cart")
    .data(as: [String: Any].self)
    .repaceError(with: [:])
    .sink { (data: [String: Any])
        // Do something with the data
    }
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`type` | `T` | The type to cast the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to

**Returns:** <span class="return-code">AnyPublisher<T, Error></span>

### `decodeData(_:decoder:)`

Attempts to decode the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to any type that conforms to `Decodable`.

#### Usage

```swift
import Combine
import IonicPortals

struct Product: Decodable {
    var name: String
    var price: UInt
    var quantity: UInt 
}

struct Cart: Decodable {
    var products: [Product]
    var discount: Double
}

let cancellable = PortalsPubSub
    .publisher(for: "cart")
    .decodeData(Cart.self, decoder: JSONDecoder())
    .replaceError(with: nil)
    .compactMap { $0 }
    .sink { (cart: Cart) in 
        // Do something with the data
    }
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`type` | `T` | The type to decode the `data` property from [`SubscriptionReult`](./portals-pubsub#subscriptionresult) to
`decoder` | `JSONDecoder` | The `JSONDecoder` to perform the decoding

**Returns:** <span class="return-code">AnyPublisher<T, Error></span>
