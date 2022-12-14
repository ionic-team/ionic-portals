---
title: How to Use Portals in an Android Library
sidebar_label: Use Portals in an Android Library
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

In larger teams and organizations, teams may be split to work on one or more feature frameworks. In those situations, it may be arduous or impossible to have web builds integrated as part of the applications main bundle.

## Web Asset Location

Web Applicaiton Assets can be placed into library dependencies with accompanying native code. Android will automatically [merge assets](https://developer.android.com/studio/write/add-resources.html#resource_merging) placed in the `src/main/assets` directory from dependenices into the Application when building.

## Configuration

The `PortalManager` and `LiveUpdateManager` are both [Singletons](https://en.wikipedia.org/wiki/Singleton_pattern) and the instance used by libraries will be the same as the one used by the application. 

:::warning
Since the Manager classes are singletons, care should be taken to avoid conflicts between one or many Library modules using Portals, and also the parent Application. For example, if a module adds a Portal called "MyPortal" and a different module tries to add a Portal with the same name, it will replace the first one. If multiple modules use Live Updates and one calls the [LiveUpdateManager.sync()](../reference/live-updates/live-update-manager#sync) function, it will sync all registered apps across your project.
:::

Create a module and place the desired Portals and Live Updates code inside:

```kotlin
class MyPortalLib {
    private val portalName = "MyPortalLib1"

    private fun makePortal(name: String): Portal {
        return PortalBuilder(name).create()
    }

    fun getMyFragment(): Fragment {
        return PortalFragment(PortalManager.getPortal(portalName))
    }

    fun init(key: String) {
        PortalManager.register(key)
        PortalManager.addPortal(makePortal(portalName))
    }
}
```

Your library module can be [published independently](https://developer.android.com/studio/publish-library), or imported as a [local dependency](https://developer.android.com/studio/projects/android-library). 

Make sure your module is imported into your project and is resolving. Then, in a custom `Application` class of the Android application project, initialize your library in the same way you would do so if using Portals directly.

```kotlin
class MyApplication: Application() {

    override fun onCreate() {
        super.onCreate()

        val myPortalsKey = "MY_PORTALS_KEY_HERE"

        // Init MyPortalLib
        MyPortalLib().init(myPortalsKey)
    }
}
```

If your library provides access to view construction as well, you could use it when building views:

```kotlin
val firstFragment: Fragment = MyPortalLib().getPortalFragment()
val transaction: FragmentManager = childFragmentManager
transaction.beginTransaction().replace(R.id.fragment_placeholder, firstFragment).commit()
```