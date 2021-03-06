---
title: PortalsPlugin
sidebar_label: PortalsPlugin
---

The PortalsPlugin class is the main way to interface with a Portal instance. It has methods to easily pass messages back and forth to the native side via a publish/subscribe interface, and ways to pass data to a web view before it initializes.

## Types

### PortalsPlugin

A type definining the `PortalsPlugin` API.

```typescript
interface PortalsPlugin {
  getInitialContext<T = unknown>(): Promise<InitialContext<T>>;
  publish<TData>(message: PortalMessage<TData>): Promise<void>;
  subscribe<T = unknown>(options: SubscribeOptions, callback: SubscriptionCallback<T>): Promise<PortalSubscription>;
  unsubscribe(options: PortalSubscription): Promise<void>;
}
```
### InitialContext

A type definining the `InitialContext` from the native application that you can pass into your web application.

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
type SubscriptionCallback<T = unknown> = (result: { topic: string, data: T; }) => void;
```

## Methods

### publish

Publishes some data to a provided topic.

#### Usage 

```typescript
const message: PortalMessage = {
    topic: 'dismiss',
    data: 'cancel',
}

// Publishes "cancel" to the "dismiss" topic
Portals.publish(message);
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`message` | [PortalMessage](./portals-plugin#portalmessage) | The [PortalMessage](./portals-plugin#portalmessage) object to publish to the native code.

### subscribe

Subscribes to a topic and run a specified callback whenever a message is sent via `.publish()`.

#### Usage 

```typescript
const callback = (result: { topic: string, data: T; }) => { /* run callback code here on publish */ };
const subscribtion = await Portals.subscribe({ topic }, callback);
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`options` | [SubscribeOptions](./portals-plugin#subscribeoptions) | The options to pass along to define the Portal subscription.
`callback` | [SubscriptionCallback](./portals-plugin#subscriptioncallback) | The callback to trigger whenever a topic is published to.

### unsubscribe

Unsubscribe to a topic that has previously been subscribed to.

#### Usage 

```typescript
const subscription = someValue;
Portals.unsubscribe(subscription);
```

#### Parameters

Name | Type | Description
:------ | :------ | :------
`subscription` | [PortalSubscription](./portals-plugin#portalsubscription) | The portal subscription to unsubscribe from.

### getInitialContext

Gets the [IntialContext](./portals-plugin#initialcontext) of the Portal that was passed in from the native code.

#### Usage 

```typescript
// Passed in value is { foo: 'bar' }
Portals.getInitialContext<{ foo: string; }>().then(context => {
    console.log(context.value.foo); // bar
});
```

A real world example might be navigating to a route in a single page application

```tsx
// Passed in value is { startingRoute: '/help' }
Portals.getInitialContext<{ startingRoute: string; }>().then(context => {
  ReactDOM.render(
    <React.StrictMode>
      <App context={context.value}/> {/* context.value = { startingRoute: '/help' } */}
    </React.StrictMode>,
    document.getElementById('root')
  );
});
```

**Returns:** <span class="return-code">*Promise*</span> A promise containing the [InitialContext](./portals-plugin#initialcontext) value.

