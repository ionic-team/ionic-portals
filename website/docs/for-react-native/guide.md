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
