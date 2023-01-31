---
title: Advanced Configuration
sidebar_label: Advanced Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid } from '@site/src/util';

Portals instances can be further configured by providing a Capacitor Configuration to the Portal.

## Capacitor Config File

Providing a [Capacitor Configuration](https://capacitorjs.com/docs/config) json file with your web assets will configure Capacitor with the provided settings.

### Android

Individual Portals can be configured by providing a `capacitor.config.json` in the Portal web assets directory within the `assets` directory of your Android project. For example: if you have a Portal called "chat" you would place the config file in `assets/chat/capacitor.config.json`.

:::note
Each Portal may have its own config file.
:::

### Live Updates

Portals that use Live Updates can include a `capacitor.config.json` in the root of the build assets. It will be used by the Portal to configure Capacitor. This will take priority over a config file provided in the Portal assets provided in the application.

## Programmatic Configuration

Portals for Android allows you to provide a programmatically defined Capacitor Configuration to customize the behavior of Capacitor in each instance of a Portal.

:::note
If you configure a Portal in Kotlin or Java in this way, it will override any `capacitor.config.json` file provided either by a Live Update or bundled in the `assets` directory.
:::

### Android

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
val fragment = PortalFragment(portal)

/*
 * Create your configuration and apply it to
 * the Portal fragment before using it
 */
val myConfig = CapConfig.Builder(this)
    .setInitialFocus(true)
    .setLoggingEnabled(false)
    .create()

fragment.setConfig(myConfig)

supportFragmentManager
    .beginTransaction()
    .replace(R.id.container, fragment)
    .commit()
```

</TabItem>

<TabItem value="java">

```java
PortalFragment fragment = new PortalFragment(myPortal);

/*
 * Create your configuration and apply it to
 * the Portal fragment before using it
 */
CapConfig myConfig = new CapConfig.Builder(getContext())
    .setInitialFocus(true)
    .setLoggingEnabled(false)
    .create();

fragment.setConfig(myConfig);
fragmentManager.beginTransaction()
    .replace(R.id.portal_space, fragment)
    .commit();
```

</TabItem>

</Tabs>
