---
title: How To Pull In A Web Bundle
sidebar_label: Integrate Web Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to use web applications in your native applications, you'll need to properly setup your project to be able to include a web bundle.

## Setup the Web Asset Directory

<Tabs 
    defaultValue="ios" 
    values={[
        { label: 'iOS', value: 'ios', },
        { label: 'Android', value: 'android', },
    ]}
>
<TabItem value="ios">

In iOS, your web application needs to be in the assets folder; which by default is `App/App` folder(???).

TODO: Figure this out. iOS Demo on my machine not installing for some weird reason :)

```swift
PortalManager.newPortal("help").create()

// or...

PortalManager.newPortal("MY_PORTAL_ID")
    .setStartDir("help")
    .create()
```

</TabItem>
<TabItem value="android">

In Android, your web application needs to be in the assets folder; which by default is `src/main/assests`. For example, if your web application is a help page, you can put your web application in the `src/main/assets/help` folder. From there, you can either set the `portalId` for the Portal to `help` or you can manually specify `help` as the directory using the [.setStartDir()](../reference/android/portal-builder#setStartDir) function.

<Tabs 
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
PortalManager.newPortal("help").create()

// or...

PortalManager.newPortal("MY_PORTAL_ID")
    .setStartDir("help")
    .create()
```

</TabItem>
<TabItem value="java">

```java
PortalManager.newPortal("help").create();

// or...

PortalManager.newPortal("MY_PORTAL_ID")
    .setStartDir("help")
    .create();
```

</TabItem>

</Tabs>

</TabItem>
</Tabs>

## Automating the process

Once you have your web code and native code linked up, the job of the mobile developer is done. We recommend having a CI system or automated system of updating web code so the mobile developer doesn't have to manually copy over the web code every time there is a new change. This can be accomplished with something like a [Monorepo](../tutorials/monorepo-example) or [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
