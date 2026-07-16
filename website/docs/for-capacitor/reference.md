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

| Prop                               | Type                                                               |
| ---------------------------------- | -------------------------------------------------------------------|
| **`name`**                         | <code>string</code>                                                |
| **`activeApplicationPathChanged`** | <code>boolean</code>                                               |
| **`source`**                       | <code>'download' \| 'cache' \| undefined</code>                    |
| **`liveUpdate`**                   | <code><a href="#liveupdate">LiveUpdate</a> \| undefined</code>     |
| **`snapshot`**                     | <code><a href="#snapshot">Snapshot</a> \| null \| undefined</code> |
| **`metadata`**                     | <code>&#123; [key: string]: any &#125; \| undefined</code>         |

`source`, `liveUpdate`, and `snapshot` are only populated for an Appflow-backed (`liveUpdateConfig`) sync. `metadata` is only populated for a provider-backed (`liveUpdateProvider`) sync, and only if the provider returns any. See [Using a Live Update Provider](./live-update-provider.md).


#### LiveUpdateConfig

| Prop                   | Type                                                                       |
| ---------------------- | --------------------------------------------------------------------------|
| **`appId`**            | <code>string</code>                                                       |
| **`channel`**          | <code>string</code>                                                       |
| **`autoUpdateMethod`** | <code><a href="#autoupdatemethod">AutoUpdateMethod</a> \| undefined</code> |
| **`maxVersions`**      | <code>number</code>                                                       |
| **`strategy`**         | <code>'zip' \| 'differential'</code>                                       |


#### LiveUpdateProviderConfig

| Prop                   | Type                                                                       |
| ---------------------- | --------------------------------------------------------------------------|
| **`pluginName`**       | <code>string</code>                                                       |
| **`config`**           | <code>&#123; [key: string]: any &#125; \| undefined</code>                |
| **`autoUpdateMethod`** | <code><a href="#autoupdatemethod">AutoUpdateMethod</a> \| undefined</code> |

See [Using a Live Update Provider](./live-update-provider.md) for how this is used.


#### LiveUpdateError

| Prop           | Type                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------|
| **`name`**     | <code>string \| undefined</code>                                                                |
| **`failStep`** | <code>'CHECK' \| 'DOWNLOAD' \| 'COPY' \| 'UNPACK' \| 'VERIFY' \| 'UPDATE' \| 'CANCEL' \| 'SYNC'</code> |
| **`message`**  | <code>string</code>                                                                              |


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

| Prop       | Type                |
| ---------- | ------------------- |
| **`name`** | <code>string</code> |


#### SyncSomeOptions

| Prop        | Type                  |
| ----------- | --------------------- |
| **`names`** | <code>string[]</code> |


### Type Aliases


#### LiveUpdate

<code><a href="#pick">Pick</a>&lt;<a href="#liveupdateconfig">LiveUpdateConfig</a>, 'appId' | 'channel'&gt;</code>


#### AutoUpdateMethod

<code>'none' | 'background'</code>

