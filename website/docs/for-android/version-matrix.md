---
title: Android SDK Version Compatibility Guide
sidebar_label: SDK Version Compatibility
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

This guide is designed to help you align versions of the Native Android Portals SDK with the Portals Web Plugin and Capacitor.

## Matching Dependency Versions

Ideally, the version of Capacitor used by the Web App from NPM should match the version of Capacitor used by Portals in the native SDK. The `Compatible Capacitor Versions` column shows versions of Capacitor that are generally compatible with that version of Portals and should not cause any issues. If you are trying to target a specific version of Capacitor that contains a fix or feature you need, make sure you use the appropriate version of Portals and the Portals Plugin that is compatible.

For example, referencing the matrix below, if you are using Portals versions 0.7.1 to 0.7.3, the web plugin version should be 0.7.0 and ideally you would be using Capacitor version 4.6.1. However, Capacitor versions 4.6.3 to 4.7.0 would work. 

## SDK Version Compatibility Matrix

| Android SDK | Web Plugin Version | Compiled Capacitor Version | Compatible Capacitor Versions |
| :----:      | :----:             | :----:                     | :----:                        |
| 0.8.3       | 0.8.1              | 5.5.+                      | 5.0.3 - 5.5.0                 | 
| 0.8.2       | 0.8.1              | 5.4.2                      | 5.0.3 - 5.5.0                 | 
| 0.8.1       | 0.8.1              | 5.4.2                      | 5.0.3 - 5.5.0                 | 
| 0.8.0       | 0.8.1              | 5.0.3                      | 5.0.3 - 5.5.0                 | 
| 0.7.5       | 0.7.1              | 4.7.3                      | 4.7.0 - 4.8.0                 | 
| 0.7.4       | 0.7.1              | 4.7.0                      | 4.7.0 - 4.8.0                 | 
| 0.7.3       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 
| 0.7.2       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 
| 0.7.1       | 0.7.0              | 4.6.1                      | 4.4.0 - 4.6.3                 | 
| 0.7.0       | 0.7.0              | 4.5.0                      | 4.4.0 - 4.6.3                 | 
| 0.6.4       | 0.6.0              | 3.9.0                      | 3.5.1 - 3.9.0                 | 
| 0.6.3       | 0.6.0              | 3.7.0                      | 3.5.1 - 3.9.0                 | 
| 0.6.2       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 
| 0.6.1       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 
| 0.6.0       | 0.6.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 
| 0.5.1       | 0.5.0              | 3.5.1                      | 3.5.1 - 3.9.0                 | 
| 0.5.0       | 0.5.0              | 3.4.1                      | 3.3.0 - 3.5.0                 | 
| 0.4.1       | 0.4.1              | 3.4.0                      | 3.3.0 - 3.5.0                 | 
| 0.3.1       | 0.3.1              | 3.3.3                      | 3.3.0 - 3.5.0                 | 
| 0.3.0       | 0.3.0              | 3.3.2                      | 3.3.0 - 3.5.0                 | 
| 0.2.2       | 0.2.2              | 3.2.5                      | 3.2.2 - 3.2.5                 | 
| 0.2.1       | 0.2.1              | 3.2.4                      | 3.2.2 - 3.2.5                 | 
| 0.2.0       | 0.2.0              | 3.2.2                      | 3.2.2 - 3.2.5                 | 

## How Gradle Resolves Dependency Versions

By default, Gradle will use the version of Capacitor that the Portals SDK depends on. If the app includes multiple dependencies that depend on different versions of Capacitor, Gradle will try to resolve the conflict by using the highest version in the dependency tree. 

Reference: https://docs.gradle.org/current/userguide/dependency_resolution.html

## Overriding Compiled Capacitor Versions in Gradle

Gradle allows you to override and use a specific version of Capacitor that Portals or a Capacitor Plugin dependency will use.

:::warning
Use the version compatibility matrix above when choosing a version of Capacitor to override to ensure the version will be compatible. If balancing a version between Portals and a Capacitor Plugin, reference the documentation or change log for the Plugin to make sure the Capacitor version chosen will be compatible.
:::