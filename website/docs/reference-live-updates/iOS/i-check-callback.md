---
title: ICheckCallback
sidebar_label: "ICheckCallback"
---

The Check Callback interface is used to provide completion behavior when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method. It is a `typealias` for the following type.

```swift
public typealias ICheckCallback = (CheckResponse) -> Void
```

# CheckResponse

The Check Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`success` | [SuccessResponse](./i-check-callback#successresponse-class) | Details about the response if successful.
`error` | [ErrorResponse?](./i-check-callback#errorresponse-class) | Details about the response if there was an error.

## SuccessResponse Class

The Success Response data class is used to provide response details when using the asynchronous [LiveUpdateManager.checkForUpdate()](./live-update-manager#checkforupdate) method.

### Parameters

Name | Type | Description
:------ | :------ | :------
`data` | [IonData](./data-classes/ion-data) | Information about an available update or if no update.
`meta` | [Meta](./data-classes/meta) | Misc. meta information.

## ErrorResponse Class

The Error Response data class is used to provide error response details in the [CheckResponse](./i-check-callback) and [DownloadResponse](./i-download-callback) data classes.

### Parameters

Name | Type | Description
:------ | :------ | :------
`error` | [Error](./data-classes/error) | A link, if present, in the error.
`meta` | [Meta](./data-classes/meta) | Misc. meta information.

