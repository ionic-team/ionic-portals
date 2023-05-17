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
- Using the `PortalsPlugin` to publish a message to the web app with the current auth tokens.
- Using a custom plugin to send data back and forth from native and web.

### Setting the Initial Context

The easiest way to set the Portal's auth tokens is to set the initial context of the portal. The initial context will allow you to pass data that can be read almost immediately in the Portal.

```javascript
import { addPortal } from '@ionic/portals-react-native';

const userPage = {
  name: 'user_page',
  startDir: 'web',
  initialContext: {
    route: '/user',
    auth: /* Auth Data */
  }
};

addPortal(userPage);
```

Then, in the entry point to your web application, you can use `getInitialContext()` to read the data passed in and act on it.

```typescript title=main.ts
import { getInitialContext } from "@ionic/portals";

type MyPortalContext = { route: string; auth: any };
const auth = getInitialContext<MyPortalContext>()?.value?.auth;
// rest of the web app...
```

### Using a Custom Plugin

Another solution you can do is to create a custom Plugin to handle passing data to and from native and web. This is the solution we used in [the example E-commerce Application](../examples/ecommerce) since it scales nicely and allows more than just authentication data be passed to and from the layers.

For information on how to build your own Portal APIs, [see our how-to guide](../how-to/define-api-in-typescript).

## How to Pass Data From Web to Native

In some cases, login information changes in the web layer and you want to save the new auth credentials in the native layer. There are several ways of doing that similar to the previous methods.

### Using the Built-in Portals Plugin Pub/Sub Functions

One of the functions of the built-in portals module is to publish/subscribe to events. In this example, you could create a `login` topic and call `publish` as shown below.

```typescript {9}
import Portals from "@ionic/portals";

const login = () => {
  // Login code...

  const topic = "login";
  const newTokens =
    /* Values from Login */

    Portals.publish(topic, newTokens);
};

login();
```

To subscribe to the topic, call `PortalsPlugin.subcribe()` after loading the Portal.

```javascript
import { subscribe } from "@ionic/portals-react-native";

const subscriptionRef = await subscribe("login", (message) => {
  const auth = message.data;
  // Rest of the React Native app...
});
```

For more information on how to communicate with a Portal web application, [see our how to guide](../how-to/using-the-portals-plugin).

### Using a Custom Plugin

Similar to the previous section, by creating a custom plugin, you have complete control over how to communicate between web and native layers. It is possible to create a function such as `MyPlugin.syncAuthAcrossWebAndNative()` to handle managing auth tokens across web and native.

For information on how to build your own Portal APIs, [see our how-to guide](../how-to/define-api-in-typescript).
