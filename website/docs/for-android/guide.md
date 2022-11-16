---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## Signup

Ionic Portals requires a product key to use. Getting a key is easy.
Just head to the [Ionic Dashboard](https://ionic.io/register-portals) and click "Get Access".

This will present you with a form asking for some additional information.
After submitting the page will refresh and you will immediately see the key that can be used to unlock the use of Portals in your app.

:::info
You can always use this shareable link to signup for a Product Key: [ionic.io/register-portals](https://ionic.io/register-portals)
:::

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

## Configure

After installing the dependency you need to register your copy of Ionic Portals at runtime. This works both offline and in production. You'll need to call [PortalManager.register(myApiKey)](./reference/api/portal-manager#register) before creating any Portals in your app. Below is a simple example of how to bootstrap Ionic Portals before loading any Portal instances in your app. To get an API Key, refer to the [Sign Up](#signup) section.

```kotlin title=MyApplication.kt
import android.app.Application
import io.ionic.portals.PortalManager

class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("MY_API_KEY")
        // setup portals...
    }}
}
```

:::warning
Avoid committing your Portals key to source code repositories where it may be publicly visible!
On Android, you can use the [Secrets Gradle Plugin](https://github.com/google/secrets-gradle-plugin) to keep it out of a public repository.
:::
