---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## License

Use of Ionic Portals requires a valid and active commercial agreement with Ionic. [Contact sales](https://ionic.io/demo?source=portals) to get started.

## Install

Ionic Portals is publicly available via Maven Central, Cocoapods, SPM, and NPM.

To add Portals to your Android project, add the dependency to your `build.gradle` files

<CodeBlock className="language-groovy" title="build.gradle">
{
`
// ----------------------------------------------
//  Module-level build.gradle
// ----------------------------------------------
dependencies {
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
}`.trim()
}
</CodeBlock>

And in the top level `build.gradle` file, be sure that you include `jcenter` and `maven` in your repositories section

```groovy title=build.gradle
// ----------------------------------------------
//  Top-level build.gradle
// ----------------------------------------------
allprojects {
    repositories {
        google()

        // Make sure JCenter and Maven Central are
        // in your project repositories
        jcenter()
        mavenCentral()
    }
}
```

To add Portals to your web project, install it via NPM:

<CodeBlock className="language-bash">
{`npm install @ionic/portals@${getPortalsVersion()}`}
</CodeBlock>

If you need help configuring specific versions of Portals with Capacitor or Capacitor Plugins, check out our [SDK Version Compatibility](./version-matrix.md) page.
