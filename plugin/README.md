# Ionic Portals

Plugin SDK for Ionic Portals

## Install

```bash
npm install @ionic/portals
```

## API

<docgen-index>

* [`getInitialContext()`](#getinitialcontext)
* [`publish(...)`](#publish)
* [`subscribe(...)`](#subscribe)
* [`unsubscribe(...)`](#unsubscribe)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getInitialContext()

```typescript
getInitialContext<T = unknown>() => any
```

**Returns:** <code>any</code>

--------------------


### publish(...)

```typescript
publish<TData>(message: PortalMessage<TData>) => any
```

| Param         | Type                                                                 |
| ------------- | -------------------------------------------------------------------- |
| **`message`** | <code><a href="#portalmessage">PortalMessage</a>&lt;TData&gt;</code> |

**Returns:** <code>any</code>

--------------------


### subscribe(...)

```typescript
subscribe<T = unknown>(options: SubscribeOptions, callback: SubscriptionCallback<T>) => any
```

| Param          | Type                                                          |
| -------------- | ------------------------------------------------------------- |
| **`options`**  | <code><a href="#subscribeoptions">SubscribeOptions</a></code> |
| **`callback`** | <code>(result: { topic: string; data: T; }) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### unsubscribe(...)

```typescript
unsubscribe(options: PortalSubscription) => any
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#portalsubscription">PortalSubscription</a></code> |

**Returns:** <code>any</code>

--------------------


### Interfaces


#### InitialContext

| Prop        | Type                |
| ----------- | ------------------- |
| **`name`**  | <code>string</code> |
| **`value`** | <code>T</code>      |


#### PortalMessage

| Prop        | Type                |
| ----------- | ------------------- |
| **`topic`** | <code>string</code> |
| **`data`**  | <code>TData</code>  |


#### SubscribeOptions

| Prop        | Type                |
| ----------- | ------------------- |
| **`topic`** | <code>string</code> |


#### PortalSubscription

| Prop                  | Type                |
| --------------------- | ------------------- |
| **`subscriptionRef`** | <code>number</code> |
| **`topic`**           | <code>string</code> |

</docgen-api>
