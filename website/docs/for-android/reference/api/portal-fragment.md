---
title: PortalFragment
sidebar_label: Portal Fragment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [PortalFragment](./portal-fragment) class is an Android [Fragment](https://developer.android.com/reference/apix/fragment/app/Fragment) containing a [Portal](./portal) instance. You can use the class as is, or extend it to provide customizable loading functionality.

Because [PortalFragment](./portal-fragment) is an extended [Fragment](https://developer.android.com/reference/apix/fragment/app/Fragment) class, you can override the following [Fragment](https://developer.android.com/reference/apix/fragment/app/Fragment) functions:

- `onViewCreated`
- `onDestroy`
- `onResume`
- `onPause`
- `onConfigurationChanged`

## Constructors

### constructor

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
```

</TabItem>
</Tabs>

Additionally, you can pass in an already initialized [Portal](./portal) instance to a new [PortalFragment](./portal-fragment)

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val portal: Portal = someValue
val fragment: PortalFragment = PortalFragment(portal)
```

</TabItem>
<TabItem value="java">

```java
Portal portal = someValue;
PortalFragment fragment = new PortalFragment(portal);
```

</TabItem>
</Tabs>

#### Parameters

| Name     | Type               | Description                                                                                        |
| :------- | :----------------- | :------------------------------------------------------------------------------------------------- |
| `portal` | [Portal](./portal) | An initialized [Portal](./portal) object to contain within the [PortalFragment](./portal-fragment) |

**Returns:** <span class="return-code">[_PortalFragment_](./portal-fragment)</span>

## Methods

### addPlugin

Add a [Plugin](https://capacitorjs.com/docs/plugins/android) to the [Portal](./portal) within [PortalFragment](./portal-fragment)

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
fragment.addPlugin(MyPlugin::class.java)
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
fragment.addPlugin(MyPlugin.class);
```

</TabItem>
</Tabs>

#### Parameters

| Name     | Type                 | Description                                                                                                  |
| :------- | :------------------- | :----------------------------------------------------------------------------------------------------------- |
| `plugin` | `Class<out Plugin?>` | The Capacitor [Plugin](https://capacitorjs.com/docs/plugins/android) class to add to your [Portal](./portal) |

### setConfig

Set a `CapConfig` configuration object to this [PortalFragment](./portal-fragment)

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
val config: CapConfig = someValue;
fragment.setConfig(config)
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
CapConfig config = someValue;
fragment.setConfig(config);
```

</TabItem>
</Tabs>

#### Parameters

| Name     | Type        | Description                                                       |
| :------- | :---------- | :---------------------------------------------------------------- |
| `config` | `CapConfig` | The Capacitor `CapConfig` class to add to your [Portal](./portal) |

### getBridge

Returns the Capacitor `Bridge` object connected to the [PortalFragment](./portal-fragment).

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
val bridge: Bridge = fragment.getBridge()
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
Bridge bridge = fragment.getBridge();
```

</TabItem>
</Tabs>

**Returns:** <span class="return-code">[_Bridge_](https://capacitorjs.com/docs/core-apis/android#bridge)</span>

### addWebViewListener

Add a `WebViewListener` instance to the [PortalFragment](./portal-fragment) to listen for web events.

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
val listener: WebViewListener = someValue;
fragment.addWebViewListener(listener)
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
WebViewListener listener = someValue;
fragment.addWebViewListener(listener);
```

</TabItem>
</Tabs>

#### Parameters

| Name              | Type              | Description                                                                             |
| :---------------- | :---------------- | :-------------------------------------------------------------------------------------- |
| `webViewListener` | `WebViewListener` | The Capacitor `WebViewListener` class that you can use to listen to web loading events. |

### linkMessageReceivers

Link a class with methods decorated with the [@PortalMethod](./portal-method) annotation to use as Portals message receivers.

The name of the method should match the message name used to send messages via the Portal. Alternatively the [@PortalMethod](./portal-method) annotation name property can be used to designate a different name. The registered methods should accept a single String representing the payload of a message sent through the Portal.

#### Usage

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
fragment.linkMessageReceivers(this)
```

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
fragment.linkMessageReceivers(this);
```

</TabItem>
</Tabs>

#### Parameters

| Name                    | Type  | Description                                                                          |
| :---------------------- | :---- | :----------------------------------------------------------------------------------- |
| `messageReceiverParent` | `Any` | The parent object of the message receivers. This value will almost always be `this`. |
