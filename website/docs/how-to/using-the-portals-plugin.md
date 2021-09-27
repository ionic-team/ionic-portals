---
title: How To Use The PortalsPlugin
sidebar_label: Use the PortalsPlugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### Android and iOS

Follow the [Getting Started Guide](../getting-started/guide) to install the Ionic Portals library into your native mobile projects. The `PortalsPlugin` is automatically added to every instance of a Portal.

### Web

Install the [Ionic Portals](https://www.npmjs.com/package/@ionic/portals) package from NPM into your Web application.

```bash
npm install @ionic/portals
```

## Initial Context

The Initial Context mechanism allows you to pass data to your web application from native so that it is available for when the web application initially loads.

### Setting Initial Context

Initial context data can be set in two different ways. You may want to set it when building a new Portal using `PortalManager`.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(["ic_example": "hello world"])
    .create()
```

</TabItem>

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
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
let portal = try! PortalManager.getPortal("maps")
portal.initialContext = ["ic_example": "hello world"]
```

</TabItem>

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

To access the initial context from the `PortalsPlugin` class in your web application, import Portals and use the [Portals.getInitialContext()](../reference/web/portals-plugin#getinitialcontext) function.

```typescript
Portals.getInitialContext<{ ic_example: string; }>().then(context => {
    // prints "hello world" in this example
    console.log(context.value.ic_example)
})
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect. [Check out our how-to guide](./multiple-portals-single-web-app).

## Communicating via Pub/Sub

The Publish and Subscribe mechanism (pub/sub) built into the `PortalsPlugin` allows you to send data between your web and native applications through a Portal. 

### Defining Subscribers

Subscribers listen for messages sent to a certain topic. They can be defined in your web application to listen for messages published from native, and vice versa.

To listen for a message published from the native side of a Portal, define a subscriber in your web application.

```typescript
const portalSubscription = await Portals.subscribe(
      { topic }, (result) => {
        console.log(JSON.stringify(result))
      });
```

To listen for messages published from the web side of a Portal, define a subscriber in your native application.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
override func viewDidLoad() {
    let portal = try! PortalManager.getPortal("example")
    
    // ...
    
    // listen on the topic "dismiss" and define a function `dismiss` 
    // to handle messages
    self.subscriptionRef = PortalsPlugin.subscribe("dismiss", dismiss)
    
    super.viewDidLoad()
}
    
/**
 * An example function that dismisses the view when a dismiss
 * message is received
 */
func dismiss(result: SubscriptionResult) {
    if(result.data as! String == "cancel" || result.data as! String == "success") {
        DispatchQueue.main.async {
            self.dismiss(animated: true, completion: nil)
        }
    }
}
```

</TabItem>

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

#### Android: Subscribe Using Annotations

Android also provides a way to link subscribers defined as methods with annotations.

<Tabs
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
> 

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

To send a message from your web application to iOS or Android, use the [Portals.publish()](../reference/web/portals-plugin#publish) function.

```typescript
Portals.publish({ topic: 'dismiss', data: 'success' })
```

#### From iOS/Android to Web

To send messages from your native application to the web application, use the `PortalsPlugin.publish()` methods.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="swift">

```swift
PortalsPlugin.publish("weather", "sunny")
```

</TabItem>

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

The `PortalsPlugin` is used in the [E-Commerce App](./examples/ecommerce-app) demo.
