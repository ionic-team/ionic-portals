---
title: PortalFragment
sidebar_label: Portal Fragment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalFragment` class is an Android [Fragment](https://developer.android.com/reference/androidx/fragment/app/Fragment) containing a `Portal` instance. You can use the class as is, or extend it to provide customizable loading functionality. 

Because `PortalFragment` is an extended `Fragment` class, you can override the following `Fragment` functions:
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
    ]}
>
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

Additionally, you can pass in an already initialized `Portal` instance to a new `PortalFragment`

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

Name | Type | Description
:------ | :------ | :------ 
`portal` | `Portal` | An initialized `Portal` object to contain within the `PortalFragment`

**Returns:** <span class="return-code">[*PortalFragment*](./portal-fragment)</span>

## Methods

### addPlugin

Add a `Plugin` to the `Portal` within `PortalFragment`

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

Name | Type | Description
:------ | :------ | :------
`plugin` | `Class<out Plugin?>` | The Capacitor `Plugin` class to add to your `Portal`

### setConfig

Set a `CapConfig` configuration object to this `PortalFragment`

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

Name | Type | Description
:------ | :------ | :------
`config` | `CapConfig` | The Capacitor `CapConfig` class to add to your `Portal`

### getBridge

Returns the Capacitor `Bridge` object connected to the `PortalFragment`.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

**Returns:** <span class="return-code">[*Bridge*](https://capacitorjs.com/docs/core-apis/android#bridge)</span>

### addWebViewListener

Add a `WebViewListener` instance to the `PortalFragment` to listen for web events.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

Name | Type | Description
:------ | :------ | :------
`webViewListener` | `WebViewListener` | The Capacitor `WebViewListener` class that you can use to listen to web loading events.

### addMessageReceiver

Register a message receiver to subscribe to messages through the Portal from the web app.

The name of the message receiver should match the message name used to send messages from the web app via the Portal. When a message is received the payload will be passed through.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
val listener: PortalListener = someValue;
fragment.addMessageReceiver("my message", listener)
``` 

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
PortalListener listener = someValue;
fragment.addMessageReceiver("my message", listener);
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`webViewListener` | `WebViewListener` | The Capacitor `WebViewListener` class that you can use to listen to web loading events.


### sendMessage

Send a message to the web app listening through the `Portal`. The web application can listen for your `message` value and read the data off of the `payload` String.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
val fragment: PortalFragment = PortalFragment()
fragment.sendMessage("my message", "my payload")
``` 

</TabItem>
<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment();
fragment.sendMessage("my message", "my payload");
``` 

</TabItem>
</Tabs>

#### Parameters

Name | Type | Description
:------ | :------ | :------
`message` | `String` | The String identifier that the web application is listening for.
`payload` | `String` | The JSON string data that will be passed to the web application.

### linkMessageReceivers

Link a class with methods decorated with the `@PortalMethod` annotation to use as Portals message receivers.

The name of the method should match the message name used to send messages via the Portal. Alternatively the `@PortalMethod` annotation name property can be used to designate a different name. The registered methods should accept a single String representing the payload of a message sent through the Portal.

#### Usage 

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
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

Name | Type | Description
:------ | :------ | :------
`messageReceiverParent` | `Any` | The parent object of the message receivers. This value will almost always be `this`.
