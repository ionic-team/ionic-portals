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

### iOS

Provide a `capacitor.config.json` in the Portal start directory (where the web assets are located).

:::note
Each Portal may have its own config file.
:::

### Android

Provide a `capacitor.config.json` in the `assets` directory of your Android project.

:::note
This single config will apply to all instances of Portals in your project.
:::

## Programmatic Configuration

Portals for Android allows you to provide a programmatically defined Capacitor Configuration to customize the behavior of Capacitor in each instance of a Portal.

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
