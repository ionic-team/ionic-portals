---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

If you need help configuring specific versions of Portals with Capacitor or Capacitor Plugins, check out our [SDK Version Compatibility](./version-matrix.md) page.

## Portals for Android 0.10.0 → 0.12.0

- Portals for Android version `0.12.0` is compatible with Portals Web Plugin version `0.12.x`.

:::note
Portals version 0.11.0 was skipped for Android in order to bring the release version numbers for Portals iOS, Android, and Web Plugin in alignment.
:::

:::caution
Portals 0.12.0 is a notable update that upgrades the Capacitor dependency to version 7. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 7 Update Guide](https://capacitorjs.com/docs/updating/7-0#android) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

## Portals for Android 0.9.0 → 0.10.0

- Portals for Android version `0.10.0` is compatible with Portals Web Plugin version `0.10.x`.

:::caution
Portals 0.10.0 is a notable update that upgrades the Capacitor dependency to version 6. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 6 Update Guide](https://capacitorjs.com/docs/updating/6-0#android) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

## Portals for Android 0.8.4 → 0.9.0

Portals for Android version `0.9.0` introduces support for the new [Portals CLI](../cli/overview.md). There are no dependency compatibility changes with this version.

## Portals for Android 0.8.3 → 0.8.4

- Portals for Android version `0.8.4` is compatible with Portals Web Plugin version `0.9.x`.

### Differential Live Update Support

Portals for Android 0.8.4 introduces support for differential live updates by requiring version 0.5.0 of the Live Updates SDK as the minimum supported version. This feature allows for updating only the changed files in a web asset bundle and between each update, reducing the amount of data that needs to be transferred to the device. This feature is _enabled by default_.

To opt-out, explicitly set the [`updateStrategy`](https://ionic.io/docs/live-updates-sdk-android/live-updates/io.ionic.liveupdates/-live-update/index.html#1386601516%2FProperties%2F685870619) property on the `LiveUpdate` configured for the Portal to [`ZIP`](https://ionic.io/docs/live-updates-sdk-android/live-updates/io.ionic.liveupdates/-strategy/index.html#-1559272545%2FClasslikes%2F685870619).

## Portals for Android 0.7.x → 0.8.0

- Portals for Android version `0.8.0` is compatible with Portals Web Plugin version `0.8.x`.

:::caution
Portals 0.8.0 is a notable update that upgrades the Capacitor dependency to version 5. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 5 Update Guide](https://capacitorjs.com/docs/updating/5-0) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Breaking Changes

#### PortalsPlugin

PortalsPlugin has had it's Pub/Sub functionality separated from the plugin implementation into a class called `PortalsPubSub`. It includes
a static `shared` singleton and it is the default `PortalsPubSub` instance used by both `PortalFragment` and `PortalsPlugin`. This change allows for providing a custom instance of `PortalsPubSub` to `PortalsPlugin` to limit visibility of events that are published to a given portal.
Here are a few examples of how to migrate from the previous API to the new API:

##### Subscribing

```kotlin
// Before 0.8.0
val subscriptionRef = PortalsPlugin.subscribe("eventName") { result ->
  // do something with the result
}

// After 0.8.0
val subscriptionRef = PortalsPubSub.shared.subscribe("eventName") { result ->
  // do something with the result
}
```

##### Publishing

```kotlin
// Before 0.8.0
PortalsPlugin.publish("eventName", "data")

// After 0.8.0
PortalsPubSub.shared.publish("evenName", "data")
```

##### Unsubscribing

```kotlin
// Before 0.8.0
PortalsPlugin.unsubscribe("eventName", subscriptionRef)

// After 0.8.0
PortalsPubSub.shared.unsubscribe("eventName", subscriptionRef)
```

### Android Studio Flamingo

We recommend updating your version of Android Studio to Flamingo (2022.2.1) or newer.

### Dependency Version Alignment

Portals for Android version 0.8.0 is compatible with the following dependency versions. Update as needed:

<CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation 'io.ionic:portals:0.8.0'
    implementation 'io.ionic:liveupdates:0.4.1'
    implementation 'com.capacitorjs:core:5.0.3'
    // Any Official Capacitor Plugins over version 5.0
}`.trim()
}
</CodeBlock>

### Gradle Compatibility

Make sure your Android project is using Gradle 8.0 or higher. If your project is using an older Gradle version, Android Studio may prompt you to use the [Android Gradle Plugin Upgrade Assistant](https://developer.android.com/studio/build/agp-upgrade-assistant) to update your project. You may use this tool.

### Java Version

Update your project `compileOptions` to use Java version 17

<CodeBlock className="language-groovy" title="build.gradle">
{
`
compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
}`.trim()
}
</CodeBlock>

Update the Kotlin JVM target if necessary

<CodeBlock className="language-groovy" title="build.gradle">
{
`
kotlinOptions {
    jvmTarget = "17"
}`.trim()
}
</CodeBlock>

### CompileSdk and TargetSdk Versions

Projects should be updated to compile and target Android SDK version 33 or higher (Android 13).

## Live Updates SDK 0.3.x → 0.4.0

A breaking change was introduced in the Live Updates SDK. The [SyncCallback](https://ionic.io/docs/live-updates-sdk-android/live-updates/io.ionic.liveupdates.network/-sync-callback/index.html) structure changed slightly to allow for more information to be returned about a sync.

If you are calling [sync](https://ionic.io/docs/live-updates-sdk-android/live-updates/io.ionic.liveupdates/-live-update-manager/sync.html) and using the callback to act on the results, make sure to adapt the structure of your callback when upgrading to version `0.4.x` of the Live Updates SDK.

## Portals for Android 0.6.x → 0.7.0

- Portals for Android version `0.7.0` is compatible with Portals Web Plugin version `0.7.x`.

:::caution
Ionic Portals 0.7.0 is a notable update that upgrades the Capacitor dependency to version 4. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Updating Web Content

Update the Portals Plugin in your web content to `0.7.0`. Then, follow the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0#using-the-cli-to-migrate) CLI migration steps to update your web content that uses Capacitor.

### Update Native Projects

#### Dependency Version Alignment

Portals for Android version 0.7.0 is compatible with the following dependency versions. Update as needed:

<CodeBlock className="language-groovy" title="build.gradle">
{
`
dependencies {
    implementation 'io.ionic:portals:0.7.0'
    implementation 'io.ionic:liveupdates:0.2.0'
    implementation 'com.capacitorjs:core:4.5.0'
    // Any Official Capacitor Plugins over version 4.0
}`.trim()
}
</CodeBlock>

#### Gradle Compatibility

Make sure your Android project is using Gradle 7.2.2 or higher. If your project is using an older Gradle version, Android Studio may prompt you to use the [Android Gradle Plugin Upgrade Assistant](https://developer.android.com/studio/build/agp-upgrade-assistant) to update your project. You may use this tool.

#### CompileSdk and TargetSdk Versions

Projects should be updated to compile and target Android SDK version 32 or higher (Android 12).

#### Add the android:exported tag

In your `AndroidManifest.xml` file you'll need to add the `android:exported` tag to the Activity. Launching activities should have the value set to `true`. For more details see [android:exported](https://developer.android.com/guide/topics/manifest/activity-element#exported) in the Android docs.

#### Resolving Dependency Issues

You may encounter further dependency version conflicts when building your app, such as the following:

```
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class androidx.lifecycle.ViewModelLazy found in modules jetified-lifecycle-viewmodel-ktx-2.3.1-runtime (androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1) and lifecycle-viewmodel-2.5.1-runtime (androidx.lifecycle:lifecycle-viewmodel:2.5.1)
     Duplicate class androidx.lifecycle.ViewTreeViewModelKt found in modules jetified-lifecycle-viewmodel-ktx-2.3.1-runtime (androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1) and lifecycle-viewmodel-2.5.1-runtime (androidx.lifecycle:lifecycle-viewmodel:2.5.1)
```

To resolve this, update any conflicting dependencies in your project. If you require newer dependency versions than those used in Portals that are conflicting, use Gradle to [override transitive dependencies](https://stackoverflow.com/questions/30728533/gradle-override-transitive-dependency-by-version-classifier).

### InitialContext Update

A default InitialContext is now always passed to the web content running in a Portal context such that the Portal name will always be accessible.

Before:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T;
}
```

After:

```typescript
export interface InitialContext<T> {
  name: string;
  value: T | undefined;
}
```
