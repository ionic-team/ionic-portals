---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## Signup for access

To use Ionic Portals, you need to register for a product key. Getting a key is free and takes just a moment.

Head over to the [Ionic Dashboard](https://dashboard.ionicframework.com/portals). If you do not already have an Ionic account, sign up for one.

On the Ionic Portals screen, click the "Get access" button. You will be asked to fill out a short form:
Your key will now be available. Clicking the copy button will copy the entire key to your clipboard:

<em><img src={useBaseUrl("/img/portals-key-signup-screenshot.webp")} width="50%"/></em>
<em><img src={useBaseUrl("/img/portals-key-screenshot.webp")} width="50%"/></em>

:::tip
Later in these docs this key will be referred to as `YOUR_PORTALS_KEY`.
:::

From here, continue on to configuring the key in your Portals application.

- [Getting Started Guide iOS](./for-ios/quick-start)
- [Getting Started Guide Android](./for-android/guide)
- [Getting Started Guide React Native](./for-react-native/guide)
- [Portals for Capacitor](./for-capacitor/overview)

:::note
You only need to register for a product key once for each organization you belong to. You can return to the Portals Key section of the Ionic Dashboard to retrieve your key again at a later date.
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
