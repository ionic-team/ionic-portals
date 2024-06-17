---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## Using your Product Key

To use Ionic Portals, you need to have a product key. If you don't have a product key please [contact sales](https://ionic.io/demo?source=portals) to run a pilot.

Once you have been provided access to a key head over to the [Ionic Dashboard](https://dashboard.ionicframework.com/portals).

Clicking the copy button will copy the entire key to your clipboard:

<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/portals-key-screenshot-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/portals-key-screenshot.webp")} width="75%"/></em>

:::tip
Later in these docs this key will be referred to as `YOUR_PORTALS_KEY`.
:::

From here, continue on to configuring the key in your Portals application.

- [Getting Started Guide iOS](./for-ios/quick-start.md)
- [Getting Started Guide Android](./for-android/guide.md)
- [Getting Started Guide React Native](./for-react-native/guide.md)
- [Federated Capacitor](./for-capacitor/overview.md)

:::note
You only need to register for a product key once for each organization you belong to. You can return to the Portals Key section of the Ionic Dashboard to retrieve your key at any time.
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
