---
title: Android SDK Version Compatibility Guide
sidebar_label: SDK Version Compatibility
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

This guide is designed to help you align versions of the Native Android Portals SDK with the Portals Web Plugin and Capacitor. [Click here](./version-matrix#sdk-version-compatibility-matrix) to jump straight to the version compatibility matrix.

## Matching Dependency Versions

Ideally, the version of Capacitor used by the Web App from NPM should match the version of Capacitor used by Portals in the native SDK. The `Compatible Capacitor Versions` column shows versions of Capacitor that are generally compatible with that version of Portals and should not cause any issues. If you are trying to target a specific version of Capacitor that contains a fix or feature you need, make sure you use the appropriate version of Portals and the Portals Plugin that is compatible.

For example: referencing the matrix at the bottom of the page, if you are using Portals versions 0.7.1 to 0.7.3, the web plugin version should be 0.7.0 and ideally you would be using Capacitor version 4.6.1. However, Capacitor versions 4.6.3 to 4.7.0 would work.

## How Gradle Resolves Dependency Versions

By default, Gradle will use the version of Capacitor that the Portals SDK depends on. If the app includes multiple dependencies that depend on different versions of Capacitor, Gradle will try to resolve the conflict by using the highest version in the dependency tree. 

Reference: https://docs.gradle.org/current/userguide/dependency_resolution.html

## Determining Capacitor Versions in Gradle

Gradle allows you to use a specific version of Capacitor that Portals or a Capacitor Plugin dependency will use.

:::warning
Use the version compatibility matrix at the bottom of the page when choosing a version of Capacitor to ensure it will be compatible. When balancing a version between Portals and a Capacitor plugin, reference the documentation or change log for the plugin to make sure the Capacitor version will be compatible.
:::

The following example will use the version of the Capacitor dependency included via the Capacitor Camera plugin.

```groovy
dependencies {
  implementation('io.ionic:portals:0.8.0') {
    exclude group: 'com.capacitorjs', module: 'core'
  }

  implementation 'com.capacitorjs:camera:5.0.7'
}
```

The following example will use the version of the Capacitor dependency specifified in the dependencies block. Neither of the Capacitor versions included with Portals or the Capacitor Camera plugin will be used.

```groovy
dependencies {
  implementation('io.ionic:portals:0.8.0') {
    exclude group: 'com.capacitorjs', module: 'core'
  }

  implementation('com.capacitorjs:camera:5.0.7') {
    exclude group: 'com.capacitorjs', module: 'core'
  }

  implementation 'com.capacitorjs:core:5.5.0'
}
```

For more information refer to the Gradle documentation pages:
- https://docs.gradle.org/current/userguide/dependency_downgrade_and_exclude.html
- https://docs.gradle.org/current/userguide/dependency_constraints.html

## SDK Version Compatibility Matrix

| Android SDK | Web Plugin Version | Compiled Capacitor Version | Compatible Capacitor Versions | Compatible Live Updates Versions |
| :----:      | :----:             | :----:                     | :----:                        | :----:                           |
| 0.8.4       | 0.9.0              | 5.7.+                      | 5.0.3 - 5.7.2                 | 0.5.+                            |
| 0.8.3       | 0.8.1              | 5.5.+                      | 5.0.3 - 5.7.2                 | 0.0.5 - 0.4.1                    |
| 0.8.2       | 0.8.1              | 5.4.2                      | 5.0.3 - 5.7.2                 | 0.0.5 - 0.4.1                    |
| 0.8.1       | 0.8.1              | 5.4.2                      | 5.0.3 - 5.7.2                 | 0.0.5 - 0.4.1                    |
| 0.8.0       | 0.8.1              | 5.0.3                      | 5.0.3 - 5.7.2                 | 0.0.5 - 0.4.1                    |
| 0.7.5       | 0.7.1              | 4.7.3                      | 4.7.0 - 4.8.0                 | 0.0.5 - 0.4.1                    |
| 0.7.4       | 0.7.1              | 4.7.0                      | 4.7.0 - 4.8.0                 | 0.0.5 - 0.4.1                    |
| 0.7.3       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 0.0.5 - 0.4.1                    |
| 0.7.2       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 0.0.5 - 0.4.1                    |
| 0.7.1       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 0.0.5 - 0.4.1                    |
| 0.7.0       | 0.7.0              | 4.5.0                      | 4.4.0 - 4.6.3                 | 0.0.5 - 0.4.1                    |
| 0.6.4       | 0.6.0              | 3.9.0                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.6.3       | 0.6.0              | 3.7.0                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.6.2       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.6.1       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.6.0       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.5.1       | 0.5.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 0.0.5 - 0.4.1                    |
| 0.5.0       | 0.5.0              | 3.4.1                      | 3.3.0 - 3.5.0                 | 0.0.5 - 0.4.1                    |
| 0.4.1       | 0.4.1              | 3.4.0                      | 3.3.0 - 3.5.0                 | 0.0.5 - 0.4.1                    |
| 0.3.1       | 0.3.1              | 3.3.3                      | 3.3.0 - 3.5.0                 | 0.0.5 - 0.4.1                    |
| 0.3.0       | 0.3.0              | 3.3.2                      | 3.3.0 - 3.5.0                 | 0.0.5 - 0.4.1                    |
| 0.2.2       | 0.2.2              | 3.2.5                      | 3.2.2 - 3.2.5                 | 0.0.5 - 0.4.1                    |
| 0.2.1       | 0.2.1              | 3.2.4                      | 3.2.2 - 3.2.5                 | 0.0.5 - 0.4.1                    |
| 0.2.0       | 0.2.0              | 3.2.2                      | 3.2.2 - 3.2.5                 | 0.0.5 - 0.4.1                    |