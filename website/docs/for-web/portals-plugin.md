---
title: Portals Module
sidebar_label: Portals Module
---

The `@ionic/portals` module is the main way to interface with a Portal instance. It has methods to easily pass messages back and forth to the native side via a publish/subscribe interface, and ways to pass data to a web view before it initializes.

## Types

### InitialContext

A type defining the `InitialContext` from the native application that you can pass into your web application.

```typescript
interface InitialContext<T = unknown> {
  name: string;
  value?: T;
  assets?: {
    [key: string]: string;
  }
}
```

### PortalMessage

A message that you can publish to a topic using [publish](./portals-plugin#publish).

```typescript
interface PortalMessage<TData = any> {
  topic: string;
  data?: TData;
}
```

### PortalSubscription

The subscription created when running [subscribe](./portals-plugin#subscribe).

```typescript
interface PortalSubscription {
  subscriptionRef: number;
  topic: string;
}
```

### SubscriptionCallback

The type definition from the callback running [subscribe](./portals-plugin#subscribe).

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
import { publish } from '@ionic/portals';

type Messages =
  | { topic: "cart:checkout"; data: Cart }
  | { topic: "modal:dismiss"; data: "cancel" | "fail" | "success" }
  | { topic: "profile:update"; data: User };

// Publishes "cancel" to the "dismiss" topic
publish<Messages>({ topic: "modal:dismiss", data: "cancel" });
```

#### Parameters

| Name      | Type                                            | Description                                                                               |
| :-------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `message` | [PortalMessage](./portals-plugin#portalmessage) | The [PortalMessage](./portals-plugin#portalmessage) object to publish to the native code. |

### subscribe

Subscribes to a topic and run a specified callback whenever a message is sent via `publish`.

#### Usage

```typescript
import { subscribe } from '@ionic/portals';

const handle = await subscribe(topic, (message) => {
  console.log(message.topic, message.data);
});
// call handle.remove() to stop receiving events
```

#### Parameters

| Name       | Type                                                          | Description                                                  |
| :--------- | :------------------------------------------------------------ | :----------------------------------------------------------- |
| `topic`  | `string`             | The options to pass along to define the Portal subscription. |
| `callback` | [SubscriptionCallback](./portals-plugin#subscriptioncallback) | The callback to trigger whenever a topic is published to.    |

**Returns:** <span class="return-code">Promise&lt;PluginListenerHandle&gt;</span> A listener handle that provides a `remove` method to unsubscribe from the event.

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
    <App context={context!.value} />
    {/* context.value = { startingRoute: '/help' } */}
  </React.StrictMode>,
  document.getElementById("root")
);
```

**Returns:** <span class="return-code">_T | undefined_</span> The [InitialContext](./portals-plugin#initialcontext) value or `undefined` if it was not assigned.
