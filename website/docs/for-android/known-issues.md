---
title: Known Issues
sidebar_label: Known Issues
---

### IonicPortals as a single target dependency

Capacitor v3.5.1 has an issue where it has an embedded `Cordova.framework`. This causes uploading to App Store Connect to fail with error codes `ITMS-90205` and `ITMS-90206`. The workaround is to delete the embedded framework as part of your build process:

First, select the affected scheme in Xcode and click "Edit Scheme...":

![XCode scheme selector](/img/known-issues/spm-workarounds/01-scheme-edit.png)

Next, expand the "Build" drop down and select "Post-actions" to run the script after your build has completed:

![Scheme editor with build drop down expanded and post-actions selected](/img/known-issues/spm-workarounds/02-post-actions-select.png)

Then, click the "+" button and select "New Run Script Action":

![Post-actions scheme editor with plus button selected and New Run Script Action highlighted](/img/known-issues/spm-workarounds/03-run-script-select.png)

In the Run Script Action editor, select the target whose build settings you need to inherit:

![Run script action editor with build settings drop-down selected](/img/known-issues/spm-workarounds/04-build-settings-select.png)

Finally, add the following script in the script editor:

```bash
rm -rf "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/Frameworks/Capacitor.framework/Frameworks"
```

![script entered into script editor](/img/known-issues/spm-workarounds/05-script-entry.png)

### IonicPortals as a multi-target dependency

When using IonicPortals as a multi-target dependency across Application and Framework targets, Xcode embeds `Capacitor.framework`, `Cordova.framework`, `IonicLiveUpdates.framework`, and `IonicPortals.framework` into your Framework targets as well.

To avoid this altogether, you can migrate your Frameworks to be Swift Packages. However, if migrating framework targets to be Swift Packages isn't an option, then in addition to the steps outlined in [IonicPortals as a single target dependency](#ionicportals-as-a-single-target-dependency) add the following to the "Run Script Action" configured in that section:

```bash
rm -rf "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/Frameworks/YourFrameworkUsingPortals.framework/Frameworks"
```

![additional script entered into script editor](/img/known-issues/spm-workarounds/06-script-entry.png)
