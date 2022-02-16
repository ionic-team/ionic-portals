---
title: IDownloadCallback
sidebar_label: "IDownloadCallback"
---

The Download Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method. It is a `typealias` for the following type.

```swift
public typealias IDownloadCallback = (DownloadResponse?) -> Void
```

# DownloadResponse

The Downloaded Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.downloadUpdate()](./live-update-manager#downloadupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`error` | [ErrorResponse?](./i-check-callback#errorresponse-class) | Details about the response if there was an error.
`file` | URL? | The filepath of the downloaded file.

