---
title: CLI Command - serve ios
sidebar_label: serve ios
---

The `portals serve ios` command is a tool for web developers to debug and test their
web code in different Portal configurations on a simulator or a device without having
to go through the build process of a native application or even have access to its
source code. The command allows web developers to run their web code from their local
dev server and see the changes on the fly.

:::note

The serve command requires IonicPortals 0.9.0 or higher and requires that the portal
has [`devModeEnabled`](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portal/devmodeenabled) set to `true`.

:::

### Usage
```bash
portals serve ios [simulator | device] \
   --application /path/to/your/ios.app \
   --dev-server http://localhost:8100
```
This command will present an interactive list of eligible destination since no specific device details were provided. When selected, the command will launch the iOS app to the selected device and will override all portals with the content served from the development server URL by default. If a capacitor.config.&lcub;json, ts, js} file is located in the current working directory, it will use that, otherwise it will fallback to any configuration potentially shipped in the application.

### Examples

#### Specify capacitor configuration file

```bash
portals serve ios [simulator | device] \
  --application /path/to/your/ios.app \
  --dev-server http://localhost:8100 \
  --capacitor-config /path/to/your/capacitor.config.ts
```

#### Specify device details

If you know the specific device ID of the device you want to target, you can use the `--device-id` flag:

```bash
portals serve ios [simulator | device] \
  --application /path/to/your/ios.app \
  --dev-server http://localhost:8100 \
  --device-id "deadbeef-dead-beef-dead-beefdeadbeef"
```

Alternatively, you can use a combination of device name and OS version to target an eligible simulator:

```bash
portals serve ios simulator \
  --application /path/to/your/ios.app \
  --dev-server http://localhost:8100 \
  --device-name "iPhone 12" \
  --device-os-version "14.0"
```

Or you can specify the device name to target an eligible physical device:

```bash
portals serve ios device \
  --application /path/to/your/ios.app \
  --dev-server http://localhost:8100 \
  --device-name "Carl's iPhone 15"
```

#### Specify portal name

If you want to override only portals with a specific name, use the `--portal-name` flag:

```bash
portals serve ios [simulator | device] \
  --application /path/to/your/ios.app \
  --dev-server http://localhost:8100 \
  --portal-name "profile"
```
### Flags:
- `--device-id` **(string)**     The ID of the target device.
- `--device-name` **(string)**   The name of the device. ('iPhone 13 Pro Max')
- `-h, --help`             help for ios

### Global Flags:
- `--application` **(string)**        Path to the native application. (required)
- `--dev-server` **(string)**         URL of the development server. (required)
- `--capacitor-config` **(string)**   Path to the capacitor configuration file.
- `--portal-name` **(string)**        The name of the target Portal. (default "PORTAL")
- `--config` **(string)**             config file (default $PWD/.portals.yaml)

