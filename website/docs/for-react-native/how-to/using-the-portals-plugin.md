---
title: How to Communicate with a Portal Web Application
sidebar_label: Communicate with a Portal Web Application
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### React Native

Follow the [Getting Started Guide](../guide) to install the Ionic Portals library into your native mobile projects. The `PortalsPlugin` is automatically added to every instance of a Portal.

### Web

Install the [Ionic Portals](https://www.npmjs.com/package/@ionic/portals) package from NPM into your web application.

```bash
npm install @ionic/portals
```

## Initial Context

The Initial Context mechanism allows you to pass data to your web application from native so that it is available for when the web application initially loads.

### Setting Initial Context

You can provide initial context when registering a Portal:

```javascript
import { addPortal } from "@ionic/portals-react-native";

const portal = {
  name: "maps",
  startDir: "web",
  initialContext: {
    ic_example: "hello world",
  },
};

addPortal(portal);
```

You can also override any initial context when rendering a Portal:

```javascript
import { PortalView } from "@ionic/portals-react-native";

<PortalView
  portal={{
    name: "maps",
    initialContext: {
      ic_example: "goodbye",
    },
  }}
/>;
```

### Using Initial Context

To access the initial context set from the native application in your web application, import `getInitialContext` from `@ionic/portals` use the [getInitialContext()](../../portals-plugin#getinitialcontext) function.

```typescript
import { getInitialContext } from "@ionic/portals";

const initialContext = getInitialContext<{ ic_example: string }>();
// prints "hello world" in this example
console.log(initialContext?.value?.ic_example);
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect.

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

#### From Web to React Native

To send a message from your web application to iOS or Android, use the [Portals.publish()](../../portals-plugin#publish) function.

```typescript
Portals.publish({ topic: "dismiss", data: "success" });
```

#### From React Native to Web

To send messages from your React Native app to the web, use the `publish` method:

```javascript
import { publish } from "@ionic/portals-react-native";

publish("weather", "sunny");
```

## Examples

The `PortalsPlugin` is used in the [E-Commerce App](../examples/ecommerce-react-native) demo.
