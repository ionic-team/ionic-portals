---
title: Reference
sidebar_label: Reference
---

### Index

<docgen-index>

* [`reload()`](#reload)
* [`syncOne(...)`](#syncone)
* [`syncAll(...)`](#syncall)
* [`syncSome(...)`](#syncsome)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>

### reload()

```typescript
reload() => Promise<void>
```

Reload the webview

**Returns:** `Promise<void>`

--------------------


### syncOne(...)

```typescript
syncOne(options: SyncOneOptions) => Promise<LiveUpdateResult>
```

Sync One

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#synconeoptions">SyncOneOptions</a></code> |

**Returns:** <code>`Promise<`<a href="#liveupdateresult">LiveUpdateResult</a>`>`</code>

--------------------


### syncAll(...)

```typescript
syncAll(options: any, callback?: (result: SyncResult) => void) => Promise<void>
```

Sync All

| Param          | Type                                    |
| -------------- | --------------------------------------- |
| **`options`**  | <code>any</code>                        |
| **`callback`** | <code>((result: <a href="#syncresult">SyncResult</a>) =&gt; void)</code> |

**Returns:** `Promise<void>`

--------------------


### syncSome(...)

```typescript
syncSome(options: SyncSomeOptions, callback?: (result: SyncResult) => void) => Promise<void>
```

Sync Some

| Param          | Type                                                        |
| -------------- | ----------------------------------------------------------- |
| **`options`**  | <code><a href="#syncsomeoptions">SyncSomeOptions</a></code> |
| **`callback`** | <code>((result: <a href="#syncresult">SyncResult</a>) =&gt; void)</code>                     |

**Returns:** `Promise<void>`

--------------------


### Interfaces


#### SyncOneOptions

| Prop        | Type                |
| ----------- | ------------------- |
| **`appId`** | <code>string</code> |


#### LiveUpdateConfig

| Prop                   | Type                                                          |
| ---------------------- | ------------------------------------------------------------- |
| **`appId`**            | <code>string</code>                                           |
| **`channel`**          | <code>string</code>                                           |
| **`autoUpdateMethod`** | <code><a href="#autoupdatemethod">AutoUpdateMethod</a></code> |
| **`maxVersions`**      | <code>number</code>                                           |


#### LiveUpdateError

| Prop           | Type                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| **`appId`**    | <code>string</code>                                                    |
| **`failStep`** | <code>'CHECK' \| 'DOWNLOAD' \| 'UNPACK' \| 'UPDATE' \| 'CANCEL'</code> |
| **`message`**  | <code>string</code>                                                    |


#### SyncSomeOptions

| Prop         | Type            |
| ------------ | --------------- |
| **`appIds`** | <code>[]string</code> |


### Type Aliases


#### LiveUpdateResult

<code><a href="#liveupdate">LiveUpdate</a> | <a href="#liveupdateerror">LiveUpdateError</a></code>
<br/>
<br/>

#### LiveUpdate

<code>Pick&lt;<a href="#liveupdateconfig">LiveUpdateConfig</a>, 'appId' | 'channel'&gt;</code>
<br/>
<br/>

#### AutoUpdateMethod

<code>'none' | 'background'</code>
<br/>
<br/>

#### SyncResult

<code><a href="#liveupdateresult">LiveUpdateResult</a> | {`{ complete: true }`}</code>

</docgen-api>
