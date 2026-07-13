---
title: Getting Started Guide
sidebar_label: Getting Started Guide
---

import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## License

Use of Ionic Portals requires a valid and active commercial agreement with Ionic. [Contact sales](https://ionic.io/demo?source=portals) to get started.

From here, continue on to your platform's getting started guide:

- [Getting Started Guide iOS](./for-ios/quick-start.md)
- [Getting Started Guide Android](./for-android/guide.md)
- [Getting Started Guide React Native](./for-react-native/guide.md)
- [Federated Capacitor](./for-capacitor/overview.md)

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
