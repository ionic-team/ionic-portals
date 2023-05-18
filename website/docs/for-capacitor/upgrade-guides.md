---
title: Upgrade Guides
sidebar_label: Upgrade Guides
---

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
