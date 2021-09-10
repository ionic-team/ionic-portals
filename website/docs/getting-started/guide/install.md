---
title: Install
sidebar_label: Install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ionic Portals is publicly available on both Maven Central and Cocoapods. To add it to your project, you just need to add the following line to your `Podfile` on iOS or your app level `build.gradle` file for Android.

<Tabs 
    defaultValue="ios" 
    values={[
        { label: 'iOS', value: 'ios', },
        { label: 'Android', value: 'android', },
    ]}
>
<TabItem value="ios">

```ruby
# Podfile
pod 'IonicPortals', '~> 0.0.5'
``` 

</TabItem>
<TabItem value="android">

```java
// build.gradle
implementation 'io.ionic:portalslibrary:0.0.5'
``` 

</TabItem>
</Tabs>
