---
title: How to Communicate with a Portal Web Application
sidebar_label: Communicate with a Portal Web Application
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### Android

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

To access the initial context set from the native application in your web application, import `getInitialContext` from `@ionic/portals` use the [getInitialContext()](../../for-web/portals-plugin#getinitialcontext) function.

```typescript
import { getInitialContext } from "@ionic/portals";

const initialContext = getInitialContext<{ ic_example: string }>();
// prints "hello world" in this example
console.log(initialContext?.value?.ic_example);
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect. [Check out our how-to guide](./multiple-portals-single-web-app).

## Communicating via Pub/Sub

The Publish and Subscribe mechanism (pub/sub) relies on two parts that work together: `PortalsPubSub` and `PortalsPlugin`.
`PortalsPubSub` is the class that manages a message bush to subscribe and publish messages to, while `PortalsPlugin` is the Capacitor plugin that exposes the functionality
of `PortalsPubSub` to a Portal web application. By default, `PortalsPlugin` uses `PortalsPubSub.shared` for communication, but a custom instance of `PortalsPubSub` can be
created and passed to the `PortalsPlugin` initializer to enable isolating events from other Portals.

In this example, `foo` and `bar` portals cannot see events published by the other and cannot listen for events published by the native application unless the events were
published through the `PortalsPubSub` instance it was configured with:
```kotlin
val fooPubSub = PortalsPubSub()
val barPubSub = PortalsPubSub()

val fooPortal = PortalBuilder("foo")
  .addPluginInstance(PortalsPlugin(fooPubSub))
  .create()

val barPortal = PortalBuilder("bar")
  .addPluginInstance(PortalsPlugin(barPubSub))
  .create()
```

If `fooPortal` and `barPortal` were configured without adding the custom `PortalsPlugin` instance, then they would both receive events through `PortalsPubSub.shared`.


### Defining Subscribers

Subscribers listen for messages sent to a certain topic. They can be defined in your web application to listen for messages published from native, and vice versa.

To listen for a message published from the native side of a Portal, define a subscriber in your web application.

```typescript
import { subscribe } from '@ionic/portals';

const portalSubscription = await subscribe({ topic }, (result) => {
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
    dismissSubscription = PortalsPubSub.shared.subscribe("dismiss") { result ->
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
    dismissSubscription = PortalsPubSub.getShared().subscribe("dismiss", (subscriptionResult -> {
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

When finished with the Portal, call the `unsubscribe` function to clean up your subscription to avoid potential memory leaks.

<Tabs defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
override fun onDestroy() {
    // dismissSubscription is an integer value returned when
    // calling PortalsPubSub.shared.subscribe
    PortalsPubSub.shared.unsubscribe("dismiss", dismissSubscription)
    super.onDestroy()
}
```

</TabItem>

<TabItem value="java">

```java
@Override
public void onDestroy() {
    // dismissSubscription is an integer value returned when
    // calling PortalsPubSub.subscribe
    PortalsPubSub.getShared().unsubscribe("dismiss", dismissSubscription);
    super.onDestroy();
}
```

</TabItem>

</Tabs>

**Subscribe Using Annotations**

Android also provides a way to link subscribers defined as functions with `@PortalMethod` annotations. An instance of the class containing the annotated functions can then be provided to the `PortalFragment` using the `linkMessageReceivers` function. See the example below for implementation details.

:::note
When using this method of adding subscribers, the Portals library will handle subscribing and unsubscribing automatically for you. Calling `PortalsPubSub.subscribe` and `PortalsPubSub.unsubscribe` is not required. If your portal has been configured with a custom `PortalsPubSub` instance, it must also be passed to the overload of `linkMessageReceivers` that accepts a `PortalsPubSub` argument.
:::

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

### Publishing Messages

Publish messages to send data through a Portal to registered Subscribers.

#### From Web to iOS/Android

To send a message from your web application to iOS or Android, use the [Portals.publish()](../../for-web/portals-plugin#publish) function.

```typescript
import { publish } from '@ionic/portals';

publish({ topic: "dismiss", data: "success" });
```

#### From Android to Web

To send messages from your native application to the web application, use the `PortalsPubSub.publish()` methods.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
PortalsPubSub.shared.publish("weather", "sunny")
```

</TabItem>

<TabItem value="java">

```java
PortalsPubSub.getShared().publish("weather", "sunny");
```

</TabItem>

</Tabs>

### Data Types

Data published through the `publish()` function should be a type compatible with objects in the [org.json](https://developer.android.com/reference/org/json/package-summary) package. Compatible types include:

- String
- Numbers (e.g: integer)
- [JSONObject](https://developer.android.com/reference/org/json/JSONObject)
- [JSONArray](https://developer.android.com/reference/org/json/JSONArray)

The Capacitor [JSObject](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/src/main/java/com/getcapacitor/JSObject.java) and [JSArray](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/src/main/java/com/getcapacitor/JSArray.java) are also compatible.

## Examples

The `PortalsPlugin` is used in the [E-Commerce App](../examples/ecommerce-app) demo.
