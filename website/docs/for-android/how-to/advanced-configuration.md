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

Place your `capacitor.config.json` file in your Portal web assets directory within the `assets` directory of your Android project. For example, if your Portal assets are in `assets/myportal` then place the config file in the root of that directory.

### Live Updates

Config files can be updated by placing them in your Live Update build assets. Any `capacitor.config.json` file found in the root of a Live Update payload will be used as a priority over one provided in the bundled `assets` of the app.

## Programmatic Configuration

Portals for Android allows you to provide a programmatically defined Capacitor Configuration to customize the behavior of Capacitor in each instance of a Portal.

:::note
A config defined in code and applied to a Portal will be used as a priority over any config file provided in the `assets` directory bundled with the app AND any provided in a Live Update.
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
