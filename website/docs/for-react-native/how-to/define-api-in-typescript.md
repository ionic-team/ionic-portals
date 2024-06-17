---
title: How To Define a Portal API
sidebar_label: Define your own Portal APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

One of the biggest benefits of including Ionic Portals in an application is the ability to easily communicate between web and native code using the [PortalsPlugin](../../for-web/portals-plugin.md). However, in some more niche cases, creating your own Plugins may be neccessary. By creating a [Capacitor Plugin](https://capacitorjs.com/docs/plugins/creating-plugins), you can create your own API to communicate between web and native code.

For this example, we will create a Plugin called `EchoPlugin` that has a single function: `echo`.

## Creating API Definitions

We strongly recommend using TypeScript to create a type defintion file which can be used to define your API. This way, there is a central source of truth for the API across Android and iOS as well as having type defintions for the web code.

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
```

On the Android or iOS side, the `EchoPlugin` class will need to match this type signature.

:::info
If you are not using TypeScript, you can skip this step, but you'll need to take steps to make sure that the method signatures across Android and iOS match if you are using reusing Portals across multiple mobile applications.
:::

## Implementing the API

First, you'll need to [install the proper dependencies](../guide.md). You can now start building the plugin. In this example, the `EchoPlugin` will extend the base Capacitor `Plugin` class and implement the API that was defined in the previous step.

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift', },
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="swift">

```swift title=EchoPlugin.swift
import Capacitor

@objc(MYYEchoPlugin)
public class EchoPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value");
    print(value);
  }
}
```

:::info
You'll also need a file called `EchoPlugin.m` to create Objective-C bindings through helper macros that Capacitor provides. Below is an example of `EchoPlugin` Objective-C bindings.

```c title=EchoPlugin.m
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(ECHO_PLUGIN, "EchoPlugin",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnNone);
)

```

:::

</TabItem>

<TabItem value="kt">

```kotlin title=EchoPlugin.kt
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "EchoPlugin")
class EchoPlugin : Plugin {
    @PluginMethod
    fun echo(call: PluginCall): Unit {
        val str: String = call.getString("value");
        println(str);
    }
}
```

</TabItem>

<TabItem value="java">

```java title=EchoPlugin.java
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "EchoPlugin")
public class EchoPlugin extends Plugin {
    @PluginMethod
    public void echo(PluginCall call) {
        String str = call.getString("value");
        System.out.println(str);
    }
}
```

</TabItem>

</Tabs>

## Adding the Plugin to the Portal

After creating the Capacitor Plugin, add the Plugin to the Portal to use it.

You will need to add the classpath to your custom plugin for Android and the Objective-C class name for iOS (the name provided in the @objc annotation in the example above):

```javascript
import { addPortal } from "@ionic/portals-react-native";

const echoPortal = {
  name: "echoPortal",
  plugins: [
    {
      androidClassPath: "com.myapplication.echo.EchoPlugin",
      iosClassName: "MYYEchoPlugin"
     }
  ]
};

addPortal(echoPortal);
```

## Calling Your Plugin Code via the Web

Once the Plugin has been defined, implemented, and initialized in the native code, you will need to register the Plugin on the web. To do this, you can use the `Capacitor.registerPlugin()` function. After calling this function, Capacitor will handle communication across native and web code.

```typescript
import { registerPlugin } from "@capacitor/core";
import { EchoPlugin } from "./types";

const Plugin = registerPlugin<EchoPlugin>("EchoPlugin");
export default Plugin;
```

Once the Plugin has been registered in the web code, you can use it anywhere in your codebase without needing to register it again in the web code.

```typescript
import EchoPlugin from "./echo-plugin";

EchoPlugin.echo("Hello World!");
```

**Note**

For more information on how to create Capacitor Plugins, check our [guide for creating Capacitor Plugins](https://capacitorjs.com/docs/plugins/creating-plugins).
