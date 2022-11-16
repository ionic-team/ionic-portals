---
title: How to Use a Web App in a Portal
sidebar_label: Use a Web App in a Portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In order to use web applications in your native applications, you'll need to properly setup your project to be able to include a web bundle.

## Setup the Web Asset Directory

In Android, your web application needs to be in the assets folder; which by default is `src/main/assests`. For example, if your web application is a help page, you can put your web application in the `src/main/assets/help` folder. From there, you can either set the `portalId` for the Portal to `help` or you can manually specify `help` as the directory using the [.setStartDir()](../reference/api/portal-builder#setStartDir) function.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
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

## Automating the Process

Once you have your web code and native code linked up, you will need a process to continually copy in new versions of the web application into your mobile projects.

We recommend having some type of automation set up so the mobile developer doesn't have to manually copy over the web code every time there is a new change. We have a few guides for ideas to do so in a [monorepo](../tutorials/monorepo-example) or [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).
