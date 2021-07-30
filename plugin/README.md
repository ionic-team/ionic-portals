# Ionic Portals

Plugin SDK for Ionic Portals

## Install

```bash
npm install @ionic/portals
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`getInitialContext()`](#getinitialcontext)
* [`clearListener(...)`](#clearlistener)
* [`listenForMessages(...)`](#listenformessages)
* [`sendMessage(...)`](#sendmessage)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => any
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>any</code>

--------------------


### getInitialContext()

```typescript
getInitialContext<T = unknown>() => any
```

**Returns:** <code>any</code>

--------------------


### clearListener(...)

```typescript
clearListener(listener: ClearMessageListener) => any
```

| Param          | Type                                                                  |
| -------------- | --------------------------------------------------------------------- |
| **`listener`** | <code><a href="#clearmessagelistener">ClearMessageListener</a></code> |

**Returns:** <code>any</code>

--------------------


### listenForMessages(...)

```typescript
listenForMessages(callback: PortalCallback) => any
```

| Param          | Type                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ |
| **`callback`** | <code>(message: <a href="#portalmessage">PortalMessage</a> \| null, err?: any) =&gt; void</code> |

**Returns:** <code>any</code>

--------------------


### sendMessage(...)

```typescript
sendMessage(message: PortalMessage) => any
```

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`message`** | <code><a href="#portalmessage">PortalMessage</a></code> |

**Returns:** <code>any</code>

--------------------


### Interfaces


#### InitialContext

| Prop        | Type                |
| ----------- | ------------------- |
| **`name`**  | <code>string</code> |
| **`value`** | <code>T</code>      |


#### ClearMessageListener

| Prop     | Type                |
| -------- | ------------------- |
| **`id`** | <code>string</code> |


#### PortalMessage

| Prop          | Type                |
| ------------- | ------------------- |
| **`message`** | <code>string</code> |
| **`payload`** | <code>any</code>    |

</docgen-api>
