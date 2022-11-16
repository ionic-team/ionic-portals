---
title: How To Use The PortalsPlugin
sidebar_label: Use the PortalsPlugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### Android and iOS

Follow the [Getting Started Guide](../guide) to install the Ionic Portals library into your native mobile projects. The `PortalsPlugin` is automatically added to every instance of a Portal.

### Web

Install the [Ionic Portals](https://www.npmjs.com/package/@ionic/portals) package from NPM into your web application.

```bash
npm install @ionic/portals
```

## Initial Context

The Initial Context mechanism allows you to pass data to your web application from native so that it is available for when the web application initially loads.

### Setting Initial Context

Initial context data can be set in two different ways. You may want to set it when building a new Portal using `PortalManager`.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(mapOf("ic_example" to "hello world"))
    .create()
```

</TabItem>

<TabItem value="java">

```java
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(Map.of("ic_example", "hello world"))
    .create();
```

</TabItem>

</Tabs>

You can also set Initial Context data on a `Portal` object prior to the Portal loading.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val mapsPortal = PortalManager.getPortal("maps")
mapsPortal?.setInitialContext(mapOf("ic_example" to "hello world"))
```

</TabItem>

<TabItem value="java">

```java
Portal mapsPortal = PortalManager.getPortal("maps");
mapsPortal.setInitialContext(Map.of("ic_example", "hello world"));
```

</TabItem>

</Tabs>

### Using Initial Context

To access the initial context set from the native application in your web application, import `getInitialContext` from `@ionic/portals` use the [getInitialContext()](../../portals-plugin#getinitialcontext) function.

```typescript
import { getInitialContext } from "@ionic/portals";

const initialContext = getInitialContext<{ ic_example: string }>();
// prints "hello world" in this example
console.log(initialContext?.value?.ic_example);
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect. [Check out our how-to guide](./multiple-portals-single-web-app).

## Communicating via Pub/Sub

The Publish and Subscribe mechanism (pub/sub) built into the `PortalsPlugin` allows you to send data between your web and native applications through a Portal.

### Defining Subscribers

Subscribers listen for messages sent to a certain topic. They can be defined in your web application to listen for messages published from native, and vice versa.

To listen for a message published from the native side of a Portal, define a subscriber in your web application.

```typescript
const portalSubscription = await Portals.subscribe({ topic }, (result) => {
  console.log(JSON.stringify(result));
});
```

To listen for messages published from the web side of a Portal, define a subscriber in your native application.

<Tabs defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // ...

    val portal = PortalManager.getPortal("example")
    val portalFragment = PortalFragment(portal)

    // listen on the topic "dismiss" and act on the result data.
    // This is an example to dismiss a containing native DialogFragment.
    PortalsPlugin.subscribe("dismiss") { result ->
        if (result.data == "cancel" || result.data == "success") {
            this.dismiss()
        }
    }

    // ...

    // add the PortalFragment to the example container fragment
    val fragmentManager = childFragmentManager
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment!!).commit()
}
```

</TabItem>

<TabItem value="java">

```java
@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // ...

    Portal portal = PortalManager.getPortal("example");
    PortalFragment portalFragment = new FadePortalFragment(portal);

    // listen on the topic "dismiss" and act on the result data.
    // This is an example to dismiss a containing native DialogFragment.
    PortalsPlugin.subscribe("dismiss", (subscriptionResult -> {
        if(subscriptionResult.getData().equals("cancel")
            || subscriptionResult.getData().equals("success")) {

            this.dismiss();
        }

        return Unit.INSTANCE;
    }));

    // ...

    // add the PortalFragment to the example container fragment
    final FragmentManager fragmentManager = getChildFragmentManager();
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment).commit();
}
```

</TabItem>

</Tabs>

**Subscribe Using Annotations**

Android also provides a way to link subscribers defined as methods with annotations.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // ...

    val portal = PortalManager.getPortal("example")
    val portalFragment = PortalFragment(portal)

    // register this class as having defined message subscribers
    portalFragment!!.linkMessageReceivers(this)

    // ...

    // add the PortalFragment to the example container fragment
    val fragmentManager = childFragmentManager
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment!!).commit()
}

/**
 * Define a `dismiss` method to receive messages on the "dismiss"
 * topic and act on the message. This is an example to dismiss
 * a containing native DialogFragment.
 */
@PortalMethod
fun dismiss(result: String?) {
    if (result != null && (result == "cancel" || result == "success")) {
        this.dismiss()
    }
}
```

</TabItem>

<TabItem value="java">

```java
@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // ...

    Portal portal = PortalManager.getPortal("example");
    PortalFragment portalFragment = new FadePortalFragment(portal);

    // register this class as having defined message subscribers
    portalFragment.linkMessageReceivers(this);

    // ...

    // add the PortalFragment to the example container fragment
    final FragmentManager fragmentManager = getChildFragmentManager();
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment).commit();
}

/**
 * Define a `dismiss` method to receive messages on the "dismiss"
 * topic and act on the message. This is an example to dismiss
 * a containing native DialogFragment.
 */
@PortalMethod
public void dismiss(String result) {
    if(result != null && (result.equals("cancel") || result.equals("success"))) {
        this.dismiss();
    }
}
```

</TabItem>

</Tabs>

#### React Native

Subscribe to messages from the web:

```javascript
import { subscribe } from "@ionic/portals-react-native";

let subscriptionReference = await subscribe("topic", (message) => {
  // Here you have access to:
  // message.data - Any data sent from the web
  // message.subscriptionRef - The subscription reference used to manage the lifecycle of the subscription
  // message.topic - The topic the message was published on
});
```

When you no longer need to receive events, unsubscribe:

```javascript
import { unsubscribe } from "@ionic/portals-react-native";

unsubscribe("channel:topic", subscriptionReference);
```

You must unsubscribe to avoid any potential memory issues.

### Publishing Messages

Publish messages to send data through a Portal to registered Subscribers.

#### From Web to iOS/Android

To send a message from your web application to iOS or Android, use the [Portals.publish()](../../portals-plugin#publish) function.

```typescript
Portals.publish({ topic: "dismiss", data: "success" });
```

#### From Android to Web

To send messages from your native application to the web application, use the `PortalsPlugin.publish()` methods.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
PortalsPlugin.publish("weather", "sunny")
```

</TabItem>

<TabItem value="java">

```java
PortalsPlugin.publish("weather", "sunny");
```

</TabItem>

</Tabs>

## Examples

The `PortalsPlugin` is used in the [E-Commerce App](../examples/ecommerce-app) demo.
