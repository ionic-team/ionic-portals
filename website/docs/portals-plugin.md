---
title: Portal Web Plugin
sidebar_label: Portal Web Plugin
---

The PortalsPlugin class is the main way to interface with a Portal instance. It has methods to easily pass messages back and forth to the native side via a publish/subscribe interface, and ways to pass data to a web view before it initializes.

## Types

### PortalsPlugin

A type defining the `PortalsPlugin` API.

```typescript
interface PortalsPlugin {
  publish<TMessage extends PortalMessage>(message: TMessage): Promise<void>;
  subscribe<T = unknown>(
    options: SubscribeOptions,
    callback: SubscriptionCallback<T>
  ): Promise<PortalSubscription>;
  unsubscribe(options: PortalSubscription): Promise<void>;
}
```

### InitialContext

A type defining the `InitialContext` from the native application that you can pass into your web application.

```typescript
interface InitialContext<T = unknown> {
  name: string;
  value: T;
}
```

### PortalMessage

A message that you can publish to a topic using [Portals.publish()](./portals-plugin#publish).

```typescript
interface PortalMessage<TData = any> {
  topic: string;
  data?: TData;
}
```

### SubscribeOptions

Subscription options that you pass into your function when running [Portals.subscribe()](./portals-plugin#subscribe).

```typescript
interface SubscribeOptions {
  topic: string;
}
```

### PortalSubscription

The subscription created when running [Portals.subscribe()](./portals-plugin#subscribe).

```typescript
interface PortalSubscription {
  subscriptionRef: number;
  topic: string;
}
```

### SubscriptionCallback

The type definition from the callback running [Portals.subscribe()](./portals-plugin#subscribe).

```typescript
type SubscriptionCallback<T = unknown> = (result: {
  topic: string;
  data: T;
}) => void;
```

## Methods

### publish

Publishes some data to a provided topic. Type-safety supported through the optional `TMessage` generic type.

#### Usage

```typescript
type Messages =
  | { topic: "cart:checkout"; data: Cart }
  | { topic: "modal:dismiss"; data: "cancel" | "fail" | "success" }
  | { topic: "profile:update"; data: User };

// Publishes "cancel" to the "dismiss" topic
Portals.publish<Messages>({ topic: "modal:dismiss", data: "cancel" });
```

#### Parameters

| Name      | Type                                            | Description                                                                               |
| :-------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `message` | [PortalMessage](./portals-plugin#portalmessage) | The [PortalMessage](./portals-plugin#portalmessage) object to publish to the native code. |

### subscribe

Subscribes to a topic and run a specified callback whenever a message is sent via `.publish()`.

#### Usage

```typescript
const callback = (result: { topic: string; data: T }) => {
  /* run callback code here on publish */
};
const subscription = await Portals.subscribe({ topic }, callback);
```

#### Parameters

| Name       | Type                                                          | Description                                                  |
| :--------- | :------------------------------------------------------------ | :----------------------------------------------------------- |
| `options`  | [SubscribeOptions](./portals-plugin#subscribeoptions)         | The options to pass along to define the Portal subscription. |
| `callback` | [SubscriptionCallback](./portals-plugin#subscriptioncallback) | The callback to trigger whenever a topic is published to.    |

### unsubscribe

Unsubscribe to a topic that has previously been subscribed to.

#### Usage

```typescript
const subscription = someValue;
Portals.unsubscribe(subscription);
```

#### Parameters

| Name           | Type                                                      | Description                                  |
| :------------- | :-------------------------------------------------------- | :------------------------------------------- |
| `subscription` | [PortalSubscription](./portals-plugin#portalsubscription) | The portal subscription to unsubscribe from. |

### getInitialContext

Gets the [InitialContext](./portals-plugin#initialcontext) of the Portal that was passed in from the native code.

#### Usage

```typescript
// Passed in value is { foo: 'bar' }
import { getInitialContext } from '@ionic/portals';

const context = getInitialContext<{ foo: string }>;
console.log(context?.value?.foo); // bar
```

A real world example might be navigating to a route in a single page application

```tsx
import { getInitialContext } from "@ionic/portals";

const context = getInitialContext<{ startingRoute: string }>();

ReactDOM.render(
  <React.StrictMode>
    <App context={context!.value} />{" "}
    {/* context.value = { startingRoute: '/help' } */}
  </React.StrictMode>,
  document.getElementById("root")
);
```

**Returns:** <span class="return-code">_T | undefined_</span> The [InitialContext](./portals-plugin#initialcontext) value or `undefined` if it was not assigned.
