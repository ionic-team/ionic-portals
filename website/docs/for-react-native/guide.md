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

<Tabs
defaultValue="react-native"
values={[
{ label: 'React Native', value: 'react-native' },
{ label: 'Web', value: 'web', }
]}>
<TabItem value="web">

To add Portals to your web project, install it via NPM:

<CodeBlock className="language-bash">
{`npm install @ionic/portals@${getPortalsVersion()}`}
</CodeBlock>

</TabItem>

<TabItem value="react-native">

To add Portals to your React Native project, install it via NPM:

<CodeBlock className="language-bash">
{`npm install @ionic/portals-react-native@${getPortalsVersionRN()}`}
</CodeBlock>

</TabItem>

</Tabs>

## Configure

After installing the dependency you need to register your copy of Ionic Portals at runtime. This works both offline and in production. You'll need to call [register(myApiKey)](https://react-native-ionic-portals.vercel.app/functions/register.html) before rendering any Portals in your app. Below is a simple example of how to bootstrap Ionic Portals before loading any Portal instances in your app. To get an API Key, refer to the [Sign Up](#signup) section.

```javascript title=App.tsx
import { register } from "@ionic/portals-react-native";

await register("YOUR_PORTALS_KEY");
```

:::warning
Avoid committing your Portals key to source code repositories where it may be publicly visible!
On Android, you can use the [Secrets Gradle Plugin](https://github.com/google/secrets-gradle-plugin) to keep it out of a public repository.
On iOS, you can use an [`.xcconfig` file](https://nshipster.com/xcconfig/) to keep it out of a public repository.
:::

## Supported Platform Versions

<table>
  <tr>
    <th>Platform</th>
    <th>Latest Portals Version</th>
    <th>Minimum Supported Platform Version</th>
  </tr>
  <tr>
    <td>iOS</td>
    <td>{getPortalsVersionIos()}</td>
    <td>iOS {getiOSMinVersion()}</td>
  </tr>
  <tr>
    <td>Android</td>
    <td>{getPortalsVersionAndroid()}</td>
    <td>Android SDK {getAndroidMinSdk()}</td>
  </tr>
  <tr>
    <td>React Native</td>
    <td>{getPortalsVersionRN()}</td>
    <td>React Native {getRnMinVersion()}</td>
  </tr>
</table>
