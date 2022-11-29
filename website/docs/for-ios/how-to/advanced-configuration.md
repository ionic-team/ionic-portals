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

Provide a `capacitor.config.json` in the Portal start directory (where the web assets are located).

:::note
Each Portal may have its own config file.
:::
