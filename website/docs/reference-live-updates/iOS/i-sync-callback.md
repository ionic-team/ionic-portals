---
title: ISyncCallback
sidebar_label: "ISyncCallback"
---

The Sync Callback protocol is used to provide completion behavior when using the asynchronous [LiveUpdateManager.sync()](./live-update-manager#sync) method. It is a `protocol` that conforms to the following types.

```swift
public protocol ISyncCallback {
  func onAppComplete(_ liveUpdate: LiveUpdate, _ failStep: FailStep?)
  func onSyncComplete()
}

public enum FailStep {
  case CHECK, DOWNLOAD, UNPACK, UPDATE, CANCEL
}
```

**NOTE**: As of version 0.5.0, `FailStep` is currently planned for a future release of the iOS version of Live Updates.
