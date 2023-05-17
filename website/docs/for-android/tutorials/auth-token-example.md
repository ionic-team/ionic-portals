---
title: Passing Auth Token from Native to Portal
sidebar_label: Passing Auth Token from Native to Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A common scenario that a developer might run into is having a web experience tailored for the current logged in user. Another scenario might be having a log-in screen be a Portal so it can easily be designed and updated across Android and iOS. In both of these scenarios, a developer would need to account for handling auth tokens between native and web code. Below are a few examples of how to solve these problems.

## Passing From Native to Web

When showing a Portal after a user has logged in, there are a few different ways to pass user auth tokens to a Portal.

- Using the `PortalBuilder.setInitialContext()` function to set the initial state of the Portal.
- Using `@ionic/portals` to publish a message to the web app with the current auth tokens.
- Using a custom plugin to send data back and forth from native and web.

### Setting the Initial Context

The easiest way to set the Portal's auth tokens is to set the initial context of the portal. The initial context will allow you to pass data that can be read almost immediately in the Portal.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin {5}
PortalManager.newPortal("user_page")
    .setStartDir("web")
    .setInitialContext(mapOf(
        "route" to "/user",
        "auth" to /* Auth Data */,
    ))
    .create()
```

</TabItem>

<TabItem value="java">

```java {5}
PortalManager.newPortal("user_page")
    .setStartDir("web")
    .setInitialContext(Map.ofEntries(
        new AbstractMap.SimpleEntry<String, @NotNull Object>("route", "/user"),
        new AbstractMap.SimpleEntry<String, @NotNull Object>("auth", /* Auth Data */)
    ))
    .create();
```

</TabItem>
</Tabs>

Then, in the entry point to your web application, you can use `getInitialContext()` to read the data passed in and act on it.

```typescript title=main.ts
import { getInitialContext } from "@ionic/portals";

type MyPortalContext = { route: string; auth: any };
const auth = getInitialContext<MyPortalContext>()?.value?.auth;
// rest of the web app...
```

### Using a Custom Plugin

Another solution you can do is to create a custom Plugin to handle passing data to and from native and web. This is the solution we used in [the example E-commerce Application](../examples/ecommerce-app) since it scales nicely and allows more than just authentication data be passed to and from the layers.

For information on how to build your own Portal APIs, [see our how-to guide](../how-to/define-api-in-typescript).

## How to Pass Data From Web to Native

In some cases, login information changes in the web layer and you want to save the new auth credentials in the native layer. There are several ways of doing that similar to the previous methods.

### Using the Pub/Sub Functions in `@ionic/portals`

One of the functions of the built-in portals module is to publish/subscribe to events. In this example, you could create a `login` topic and call `publish` as shown below.

```typescript {9}
import { publish } from "@ionic/portals";

const login = () => {
  // Login code...

  const topic = "login";
  const newTokens =
    /* Values from Login */

  publish(topic, newTokens);
};

login();
```

To subscribe to the topic, call `subcribe` after loading the Portal.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
PortalsPubSub.shared.subscribe("login") { result ->
    let auth = result
    // Rest of the native app...
}
```

</TabItem>

<TabItem value="java">

```java
PortalsPubSub.getShared().subscribe("login", (@NotNull Object result) -> {
    Object auth = result;
    // Rest of the native app...
});
```

</TabItem>
</Tabs>

For more information on how to communicate with a Portal web application, [see our how to guide](../how-to/using-the-portals-plugin).

### Using a Custom Plugin

Similar to the previous section, by creating a custom plugin, you have complete control over how to communicate between web and native layers. It is possible to create a function such as `MyPlugin.syncAuthAcrossWebAndNative()` to handle managing auth tokens across web and native.

For information on how to build your own Portal APIs, [see our how-to guide](../how-to/define-api-in-typescript).
