---
title: Reload Portals with Live Updates
sidebar_label: Reload Portals with Live Updates
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When new Portal web content is downloaded from Appflow using Live Updates, the Portal will need to be reloaded before the app user sees the updated content. The default behavior of the Portals library is to continue displaying the existing web content to the user until the view is reloaded by the user. A Portal can be reloaded with code if you want the user to view the new content sooner.

:::tip
Consider that a user may be in the middle of doing work inside the Portal as new web content is downlaoded through Live Updates and reloading the Portal may interrupt them.
:::

The following examples show how an active Portal could be reloaded after a Live Update has finished downloading.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
/**
* This example is within a Fragment class that contains a PortalFragment.
*/
override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
): View {
    val root: View = binding.root

    // Trigger a repeating task to check for the Portal update if the state is appropriate
    val portalView = binding.portalview
    val portalFragment = portalView.getPortalFragment()
    val portal = portalFragment?.portal
    if (portal != null) {
        val liveUpdate = portal.liveUpdateConfig
        if (liveUpdate != null) {
            val appState = liveUpdate.appState
            if (appState != AppState.FAILED && appState  != AppState.CANCELED && appState != AppState.UPDATED){
                reloadOnFinish(portalFragment, liveUpdate)
            }
        }
    }

    return root
}

/**
* Start a repeating task that checks the status of the live update every 500ms.
* If an update for the web app is downloaded, refresh the Portal.
*
* @param portalFragment the PortalFragment to reload
* @param liveUpdate a live update instance to monitor the status of.
*/
private fun reloadOnFinish(portalFragment: PortalFragment, liveUpdate: LiveUpdate) {
    val coroutineScope = CoroutineScope(Dispatchers.Default)
    val mainScope = CoroutineScope(Dispatchers.Main)
    coroutineScope.launch {
        while(true) {
            val appState = liveUpdate.appState
            if (appState == AppState.UPDATED) {
                // App is finished updating, reload the portal
                mainScope.launch {
                    val context = context
                    if (context != null) {
                        // Force reload portal
                        portalFragment.reload()
                    }
                }
                break
            } else if (appState == AppState.FAILED || appState == AppState.CANCELED) {
                Log.e("LiveUpdates", "Live update failed or canceled, reload not triggered.")
                break
            } else if (appState == AppState.CHECKED){
                Log.d("LiveUpdates", "No app update!")
                break
            }

            // Wait before checking state again
            delay(500)
        }
    }
}
```

</TabItem>

<TabItem value="java">

```java
/**
* This example is within a Fragment class that overrides PortalFragment.
*/
@Override
public void onViewCreated(@NotNull View view, Bundle savedInstanceState) {
    super.onViewCreated(view, savedInstanceState);
    setHasOptionsMenu(false);

    // Trigger a repeating task to check for the Portal update if the state is appropriate
    Portal profilePortal = getPortal();
    if (profilePortal != null) {
        LiveUpdate liveUpdate = profilePortal.getLiveUpdateConfig();
        if (liveUpdate != null) {
            AppState appState = liveUpdate.getAppState();
            if (appState != AppState.FAILED && appState != AppState.CANCELED && appState != AppState.UPDATED) {
                reloadOnFinish(liveUpdate);
            }
        }
    }
}

/**
* Start a repeating task that checks the status of the live update every 500ms.
* If an update for the web app is downloaded, refresh the Portal.
*
* @param liveUpdate a live update instance to monitor the status of.
*/
private void reloadOnFinish(LiveUpdate liveUpdate) {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.scheduleWithFixedDelay(() -> {
        AppState appState = liveUpdate.getAppState();
        if (appState == AppState.UPDATED) {
            // App is finished updating, reload the portal
            if (getContext() != null) {
                // Force reload portal
                Log.d("LiveUpdates", "Reloading profile page with downloaded update!");
                reload();
            }
            throw new RuntimeException("Successful");
        } else if (appState == AppState.FAILED || appState == AppState.CANCELED) {
            Log.e("LiveUpdates", "Live update failed or canceled, reload not triggered.");
            throw new RuntimeException("Failed or Canceled");
        } else if (appState == AppState.CHECKED) {
            Log.d("LiveUpdates", "No update to the profile page. No reload needed.");
            throw new RuntimeException("Checked");
        }
    }, 0, 500, TimeUnit.MILLISECONDS);
}
```

</TabItem>

</Tabs>
