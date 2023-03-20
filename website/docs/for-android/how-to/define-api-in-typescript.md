---
title: How To Define a Portal API
sidebar_label: Define your own Portal APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

One of the biggest benefits of including Ionic Portals in an application is the ability to easily communicate between web and native code using the [PortalsPlugin](../../for-web/portals-plugin). However, to make the integration between a Portal and your native application more seamless, creating your own Plugins may be necessary. By creating a [Capacitor Plugin](https://capacitorjs.com/docs/plugins/creating-plugins), you can create your own API to communicate between web and native code.

In this example, we will create a plugin that performs a fade-in animation when a Portal has finished loading.

## Creating the API Definition

We strongly recommend using TypeScript to create a type defintion file which can be used to define your API. This way, there is a central source of truth for the API across Android and iOS as well as having type defintions for the web code.

```typescript title=PortalLoadedPlugin/definitions.ts
export interface PortalLoadedPlugin {
  portalLoaded(): Promise<void>
}
```

On the Android side, the `PortalLoadedPlugin` class will have to implement a method that matches this type signature.

## Implementing the API

Create the Capacitor plugin class.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin title=PortalLoadedPlugin.kt
@CapacitorPlugin(name = "PortalLoaded")
class PortalLoadedPlugin(val onPortalLoaded: () -> Unit): Plugin() {

    @PluginMethod
    fun portalLoaded(call: PluginCall) {
        onPortalLoaded()
        call.resolve()
    }
}
```

</TabItem>

<TabItem value="java">

```java title=PortalLoadedPlugin.java
@CapacitorPlugin(name = "PortalLoaded")
public class PortalLoadedPlugin extends Plugin {

    PortalLoadedInterface portalLoadedInterface;

    public PortalLoadedPlugin(PortalLoadedInterface portalLoadedInterface) {
        this.portalLoadedInterface = portalLoadedInterface;
    }

    public void portalLoaded(PluginCall call) {
        portalLoadedInterface.onLoad();
        call.resolve();
    }

    public interface PortalLoadedInterface {
        void onLoad();
    }
}
```

</TabItem>

</Tabs>

## Using the PortalLoadedPlugin

To use the `PortalLoadedPlugin` class, we need to create an instance of it and add it to the portal to be rendered. When creating a [Portal](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal/index.html) via the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html), call the [addPluginInstance()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-builder/index.html#-1950926678%2FFunctions%2F-149544105) function in order to add the Plugin to that Portal instance.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin title=MyFragment.kt
class MyFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val portalLoadedPlugin = PortalLoadedPlugin {
            // Perform native action when the web content is finished loading here
            Log.d("MyPortalsApp", "Portal is loaded!")
        }

        PortalManager
            .newPortal("myportal")
            .addPluginInstance(portalLoadedPlugin)
            .create()

        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        return binding.root
    }

    // ...

}
```

</TabItem>
<TabItem value="java">

```java MyFragment.java
public class MyFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        PortalLoadedPluginJava portalLoadedPluginJava = new PortalLoadedPluginJava(() -> {
            Log.d("MyPortalsApp", "Portal is loaded!");
        });

        PortalManager
            .newPortal("myportal")
            .addPluginInstance(portalLoadedPlugin)
            .create()

        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_blank, container, false);
    }

    // ...

}
```

</TabItem>
</Tabs>

## Calling the Plugin Code from the Web

Once the Plugin has been defined, implemented, and initialized in the native code, it will also need to be registered on the web.

```typescript title=PortalLoadedPlugin/PortalLoadedPlugin.ts
import { registerPlugin } from '@capacitor/core';
import { PortalLoadedPlugin } from '../definitions';
const PortalLoaded = registerPlugin<PortalLoadedPlugin>('PortalLoaded', {
 // We create a no-op on the web for development purposes. This no-op plugin will only be loaded when running the plugin
 // in a browser during development like Chrome or Safari.
  web: { portalLoaded: () -> {} },
});
export const portalLoaded = () => {
  const onPageLoad = async () => {
    PortalLoaded.portalLoaded();
  };
  // Check if the page has already loaded
  if (document.readyState === 'complete') {
    onPageLoad();
  } else {
    window.addEventListener('load', onPageLoad);
  }
};
```

```typescript title=PortalLoadedPlugin/index.ts
export { portalLoaded } from './PortalLoadedPlugin';
export * from './definitions';
```

:::info

This code is not directly exposing the initialized PortalLoaded class outside of the module.
In this scenario, we don't want the method triggered for any reason other than when the page is loaded, so we guard that
method behind a pure web implementation. If the web code was not needed, we would have just exported this plugin instance directly.

:::

Then, call the method at the start of the web application:

```typescript title=index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { portalLoaded } from './PortalLoadedPlugin'
portalLoaded();
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
```

**Note**

For more information on how to create Capacitor Plugins, check our [guide for creating Capacitor Plugins](https://capacitorjs.com/docs/plugins/creating-plugins).
