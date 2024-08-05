---
title: Reference
sidebar_label: Reference
---

## API Reference

* [`reload()`](#reload)
* [`syncOne(...)`](#syncone)
* [`syncAll(...)`](#syncall)
* [`syncSome(...)`](#syncsome)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

### reload()

```typescript
export const reload = (): Promise<void>
```

Reload the webview

--------------------


### syncOne(...)

```typescript
export const syncOne = async (options: SyncOneOptions): Promise<SyncResult>
```

Sync One

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#synconeoptions">SyncOneOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#syncresult">SyncResult</a>&gt;</code>

--------------------


### syncAll(...)

```typescript
export const syncAll = (callback: SyncCallback): void
```

Sync All

| Param          | Type                                                                             |
| -------------- | -------------------------------------------------------------------------------- |
| **`callback`** | <code><a href="#synccallback">SyncCallback</a>)</code> |

--------------------


### syncSome(...)

```typescript
export const syncSome(options: SyncSomeOptions, callback: SyncCallback): void
```

Sync Some

| Param          | Type                                                                             |
| -------------- | -------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#syncsomeoptions">SyncSomeOptions</a></code>                      |
| **`callback`** | <code><a href="#synccallback">SyncCallback</a>)</code>                           |

--------------------


### Interfaces


#### SyncResult

| Prop                               | Type                                                  |
| ---------------------------------- | ----------------------------------------------------- |
| **`liveUpdate`**                   | <code><a href="#liveupdate">LiveUpdate</a></code>     |
| **`snapshot`**                     | <code><a href="#snapshot">Snapshot</a> \| null</code> |
| **`source`**                       | <code>'download' \| 'cache'</code>                    |
| **`activeApplicationPathChanged`** | <code>boolean</code>                                  |


#### LiveUpdateConfig

| Prop                   | Type                                                          |
| ---------------------- | ------------------------------------------------------------- |
| **`appId`**            | <code>string</code>                                           |
| **`channel`**          | <code>string</code>                                           |
| **`autoUpdateMethod`** | <code><a href="#autoupdatemethod">AutoUpdateMethod</a></code> |
| **`maxVersions`**      | <code>number</code>                                           |
| **`strategy`**         | <code>'zip' \| 'differential'</code>                          |
| **`key`**              | <code>string</code>                                           |


#### LiveUpdateError

| Prop           | Type                                                                               |
| -------------- | ---------------------------------------------------------------------------------- |
| **`appId`**    | <code>string \| undefined</code>                                                   |
| **`failStep`** | <code>'CHECK' \| 'DOWNLOAD' \| 'UNPACK' \| 'VERIFY' \| 'UPDATE' \| 'CANCEL'</code> |
| **`message`**  | <code>string</code>                                                                |


#### Snapshot

| Prop          | Type                |
| ------------- | ------------------- |
| **`id`**      | <code>string</code> |
| **`buildId`** | <code>string</code> |

#### SyncCallback

| Prop                 | Type                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| **`onError`**        | <code>(error: <a href="#liveupdateerror">LiveUpdateError</a>) => void</code> |
| **`onAppComplete`**  | <code>(result: <a href="#syncresult">SyncResult</a>) => void</code>          |
| **`onSyncComplete`** | <code>() => void</code>                                                      |

#### SyncOneOptions

| Prop        | Type                |
| ----------- | ------------------- |
| **`appId`** | <code>string</code> |


#### SyncSomeOptions

| Prop         | Type                  |
| ------------ | --------------------- |
| **`appIds`** | <code>string[]</code> |


### Type Aliases


#### LiveUpdate

<code><a href="#pick">Pick</a>&lt;<a href="#liveupdateconfig">LiveUpdateConfig</a>, 'appId' | 'channel'&gt;</code>


#### AutoUpdateMethod

<code>'none' | 'background'</code>

