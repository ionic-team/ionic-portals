---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## @ionic/portals 0.6.x -> 0.7.0

IonicPortals Android version 0.7.0 is compatible with '@ionic/portals' version 0.7.x

:::caution
Ionic Portals 0.7.0 is a notable update that upgrades the Capacitor dependency to version 4. Care should be taken to update dependencies across your web content and native apps to ensure compatibility.
:::

First review the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0) for an overview of necessary changes. Some will not be relevant for Portals apps, but this will be a useful reference in case you encounter issues with your upgrade.

### Updating Web Content

Update the Portals Plugin in your web content to `0.7.0`. Then, follow the [Capacitor 4 Update Guide](https://capacitorjs.com/docs/updating/4-0#using-the-cli-to-migrate) CLI migration steps to update your web content that uses Capacitor.

### Update Native Projects

#### Dependency Version Alignment

IonicPortals for Android version 0.7.0 is compatible with the following dependency versions. Update as needed:

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

## @ionic/portals 0.0.x -> 0.6.0

### `Portals.publish()`

The method signature of `Portals.publish()` now allows generic typing over `PortalMessage` instead of restricting generic typing to the `data` parameter of `PortalMessage`. The `message` parameter must be of type `string` but can be predefined to prevent typos, invalid topic names, etc.

Before:

```typescript
Portals.publish<string>({ topic: "foo", data: "bar" });
```

After:

```typescript
type ValidMessage = { topic: "foo"; data: string };

// TypeScript will reject the following statement:
Portals.publish<ValidMessage>({ topic: "food", data: 1 });
```

### `Portals.getInitialContext()`

`Portals.getInitialContext()` is no longer asynchronous and has been moved out of the `Portals` class.

Before:

```typescript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Portals from "@ionic/portals";
import { Capacitor } from "@capacitor/core";

if (!Capacitor.isNativePlatform()) {
  // do something
  (window as any).portalInitialContext = {
    value: { startingRoute: "/" },
  };
}

Portals.getInitialContext<{ startingRoute: string }>().then((context) => {
  ReactDOM.render(
    <React.StrictMode>
      <App context={context.value} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
```

After:

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Portals, { getInitialContext } from '@ionic/portals';
import { Capacitor } from '@capacitor/core';

const initialContext = getInitialContext<{ startingRoute: string }>;
const startingRoute = initialContext?.value ?? { startingRoute: '/' };

ReactDOM.render(
  <React.StrictMode>
    <App context={startingRoute} />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

## @ionic/portals-react-native 0.0.x -> 0.1.0

The props on `PortalView` have changed from having individual props of `name` and `initialContext` to a single prop named `portal`.

Before:

```javascript
<PortalView name="foo" initialContext={{ bar: "baz" }} />
```

After:

```javascript
<PortalView
  portal={{
    name: "foo",
    initialContext: {
      bar: "baz",
    },
  }}
/>
```

## IonicPortals iOS 0.6.0 -> 0.6.1

IonicPortals iOS version 0.6.1 is compatible with '@ionic/portals' version 0.5.x

### Swift Package Manager Support

Add https://github.com/ionic-team/ionic-portals-ios in the Xcode "Swift Package Dependencies" tab in the project configuration. The suggested version range
is "Up to Next Minor Version" to prevent auto-updating to a breaking version before Ionic Portals iOS reaches version 1.0

### iOS 13.0 Support

The 0.5.x versions of Ionic Portals iOS required iOS 14.0. In this release we have included support for iOS 13.0 and up. To support iOS 13.0 in your app,
you should update your target to support the OS.