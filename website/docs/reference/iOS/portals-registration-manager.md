---
title: PortalsRegistrationManager
sidebar_label: PortalsRegistrationManager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalsRegistrationManager](./portal-manager) object is used to manage the registration lifecycle of Ionic Portals. 

<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
PortalsRegistrationManager.shared
    .register(key: "MY_API_KEY")
```

</TabItem>

<TabItem value="objc">

```objectivec
[[IONPortalsRegistrationManager shared] registerWithKey:@"MY_API_KEY"];
```

</TabItem>

</Tabs>

## Methods

### register

A function to validate the registration of the Ionic Portals instance with your API Key. This function will work offline and only needs to be run once before rendering your first [Portal](./portal)

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
:::

#### Usage

<Tabs
  defaultValue="swift"
  values={[
    { label: "Swift", value: "swift" },
    { label: "Objective-C", value: "objc" }
  ]}
>

<TabItem value="swift">

```swift
PortalsRegistrationManager.shared
    .register(key: "MY_API_KEY")
```

</TabItem>

<TabItem value="objc">

```objectivec
[[IONPortalsRegistrationManager shared] registerWithKey:@"MY_API_KEY"];
```

</TabItem>

</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`key` | `String` | The [Portal](./portal) API Key to register.

