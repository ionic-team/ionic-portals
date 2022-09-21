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
export const reload = (): Promise<void>
```

Reload the webview

**Returns:** `Promise<void>`

--------------------


### syncOne(...)

```typescript
export const syncOne = async (options: SyncOneOptions): Promise<LiveUpdateResult>
```

Sync One

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#synconeoptions">SyncOneOptions</a></code> |

**Returns:** <code>`Promise<`<a href="#liveupdateresult">LiveUpdateResult</a>`>`</code>

--------------------


### syncAll(...)

```typescript
export const syncAll = (callback: SyncCallback): void 
```

Sync All

| Param          | Type                                    |
| -------------- | --------------------------------------- |
| **`callback`** | <code><a href="#synccallback">SyncCallback</a></code> |

--------------------


### syncSome(...)

```typescript
export const syncSome = (options: SyncSomeOptions, callback: SyncCallback): void
```

Sync Some

| Param          | Type                                                        |
| -------------- | ----------------------------------------------------------- |
| **`options`**  | <code><a href="#syncsomeoptions">SyncSomeOptions</a></code> |
| **`callback`** | <code><a href="#synccallback">SyncCallback</a></code>                     |

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


#### SyncCallback

| Prop                 | Type                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| **`onError`**        | <code>(error: <a href="#liveupdateerror">LiveUpdateError</a>) => void</code> |
| **`onAppComplete`**  | <code>(liveUpdate: <a href="#liveupdate">LiveUpdate</a>) => void</code>      |
| **`onSyncComplete`** | <code>() => void</code>

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
