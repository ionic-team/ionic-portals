---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

## @ionic-enterprise/federated-capacitor 0.3.0

This update supports Capacitor version 7.

## @ionic-enterprise/federated-capacitor 0.2.4

Adds a new function `refreshMicroApps()` to allow for the update of web apps through Live Updates without refreshing the currently loaded apps.

## @ionic-enterprise/federated-capacitor 0.2.3

Changes the use of Appflow CLI to the new Portals CLI internally.

## @ionic-enterprise/federated-capacitor 0.2.2

Provides ability for iOS users to override `capacitorDidLoad()` on iOS.

## @ionic-enterprise/federated-capacitor 0.2.1

Addressed a bug where the config was not correctly loaded on Android.

## @ionic-enterprise/federated-capacitor 0.2.0

This update supports Capacitor version 6.

## @ionic-enterprise/federated-capacitor 0.1.7

### Differential Support
Differential Live Update support has been added with this release. See the [Live Updates](live-updates) documentation for more information on how to configure this feature.

## @ionic-enterprise/federated-capacitor 0.1.0

'Portals for Capacitor' has been rebranded as 'Federated Capacitor'. This has come with
a number of breaking changes.`@ionic-enterprise/capacitor-portals` has been renamed to `@ionic-enterprise/federated-capacitor`.
You will need to update your dependency to reflect the package name.

### Configuration

The plugin itself has been renamed from `Portals` to `FederatedCapacitor` and the requirement for `webDir` for the shell app to be redefined has been removed.

Using `@ionic-enterprise/capacitor-portals`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.foo',
  appName: 'Foo',
  webDir: './build',
  plugins: {
    Portals: {
      shell: {
        name: 'shell',
        webDir: './build'
      }
    }
  }
}
```

Using `@ionic-enterprise/federated-capacitor`:
```typescript
const config: CapacitorConfig = {
  appId: 'com.foo',
  appName: 'Foo',
  webDir: './build',
  plugins: {
    FederatedCapacitor: {
      shell: {
        name: 'shell'
      }
    }
  }
}
```

### Plugin Methods

`syncOne`, `syncSome`, and `syncAll` now provide more metadata when a sync has completed.
The most useful piece of information is whether or not the active application path for a
microfrontend has changed, which can be used to determine whether or not a reload needs to
occur.

### MainActivity and UIViewController subclass name changes

In your Android project, update `MainActivity` to extend `FederatedCapacitorBridgeActivity` instead of `PortalsBridgeActivity`
In your iOS project, update the ViewController in Main.storyboard to subclass `FederatedCapacitorViewController` instead of `PortalsViewController`.

