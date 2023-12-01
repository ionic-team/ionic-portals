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

The easiest approach for configuring a Portal is to let the web application include a [Capacitor Configuration](https://capacitorjs.com/docs/config) 
in the form of a `capacitor.config.json` in the root of its build folder. Portals will provide the Capacitor runtime with the configuration and
no intervention is needed on the part of the native team.

:::note
Each Portal may have its own config file.
:::

## Programmatic Capacitor Configuration

To programmatically configure Capacitor, use the `configuring` method on `Portal` to override any default Capacitor configuration:

```swift
let portal = Portal(name: "foo")
  .configuring(\.loggingBehavior, .none)
  .configuring(\.allowLinkPreviews, true)
  .configuring(\.isWebDebuggable, false)
```

In the event the same value is configured both programmatically and via `capacitor.config.json`, the programmatic configuration takes precedence.

