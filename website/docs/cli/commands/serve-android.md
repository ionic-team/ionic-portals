---
title: CLI Command - serve android
sidebar_label: serve android
---

The `portals serve android` command is a tool for web developers to debug and test their
web code in different Portal configurations on an emulator or a device without having
to go through the build process of a native application or even have access to its
source code. The command allows web developers to run their web code from their local
dev server and see the changes on the fly.

:::note

The serve command requires Ionic Portals 0.9.0 or higher and requires that the portal
has [`devMode`](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal/index.html#-813353364%2FProperties%2F-149544105) set to `true`.

:::

### Requirements

The following environment variables must be set in order for the `portals serve android` command to function correctly:

- Set the `$ANDROID_HOME` variable to the path of the Android SDK installation directory.
- Set the `$JAVA_HOME` variable to the path of the Java SDK installation directory.

### Usage
```bash
portals serve android \
   --application /path/to/your/android-app.apk \
   --dev-server http://10.0.2.2:8100
```
This command will present an interactive list of eligible destinations since no specific device details were provided. When selected, the command will launch the Android app to the selected device and will override all portals with the content served from the development server URL by default. If a capacitor.config.&lcub;json, ts, js} file is located in the current working directory, it will use that, otherwise it will fallback to any configuration potentially shipped in the application.

:::note

If the local dev server is set to `localhost` the CLI will attempt to help you by correcting this host to `10.0.2.2` for running in an emulator. Android emulators are unable to reach the host machine through `localhost` as this is reserved as the loopback address for reaching the emulator itself. Make sure to set the dev server address correctly if you need to reach it via your local network from a real Android device.

:::

### Examples

#### Specify capacitor configuration file

```bash
portals serve android \
  --application /path/to/your/android-app.apk \
  --dev-server http://10.0.2.2:8100 \
  --capacitor-config /path/to/your/capacitor.config.ts
```

#### Specify device details

If you know the specific device ID of the emulator or device you want to target, you can use the `--device-id` flag:

```bash
portals serve android \
  --application /path/to/your/android-app.apk \
  --dev-server http://10.0.2.2:8100 \
  --device-id "emulator-5554"
```

:::note

The ID of the emulator or device is the ID shown when running [`adb devices`](https://developer.android.com/tools/adb#devicestatus).

:::

#### Specify portal name

If you want to override only portals with a specific name, use the `--portal-name` flag:

```bash
portals serve android \
  --application /path/to/your/android-app.apk \
  --dev-server http://10.0.2.2:8100 \
  --portal-name "profile"
```
### Flags:
- `--device-id` **(string)**     The ID of the target device.
- `-h, --help`             help for android

### Global Flags:
- `--application` **(string)**        Path to the native application. (required)
- `--dev-server` **(string)**         URL of the development server. (required)
- `--capacitor-config` **(string)**   Path to the capacitor configuration file.
- `--portal-name` **(string)**        The name of the target Portal. (default "PORTAL")
- `--config` **(string)**             config file (default $PWD/.portals.yaml)

### Troubleshooting connectivity issues

The Android emulator should be able to reach web servers running on the host machine through the IP address `10.0.2.2`. This sometimes may not work due to firewall policies, VPN settings, or other environmental changes. If you are having trouble connecting to your local web server from an emulator, try these troubleshooting steps.

#### Make sure your application supports Internet connectivity

The Android manifest file should contain the following permission

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

#### Cleartext web content

If you are testing with an http server you may encounter an issue displaying a cleartext web page due to the default Android security settings. There are two ways to permit this content to load:

- Add `android:usesCleartextTraffic="true"` to your Android manifest `application` tag, or
- Create a more narrowly scoped [Network Security Config](https://developer.android.com/privacy-and-security/security-config#CleartextTrafficPermitted) that permits cleartext traffic on your specific test domain only.

#### Emulator network troubleshooting

If the local web server fails to load with errors like `net::ERR_CACHE_HIT` or `net::ERR_CONNECTION_REFUSED`, you may have network settings preventing the emulator/device from using Android’s loopback address. One way to confirm if this is your problem is to try loading your local web server from the emulator web browser. Double check that your local web server is actually running, then open Chrome in the emulator and go to the URL for your web app. If it loads, then the issue is related to your app specifically. If it does not load, then the emulator as a whole is having issues connecting to the web server on your local machine through the virtual network.

:::note

Reminder: the emulator does not reach your local development machine through the `localhost` url, as this is the loopback address for the emulator virtual machine itself. The IP address for your local machine from the emulator is `10.0.2.2`.

:::

If you are unable to reach your web server, try creating a proxy connection through the Android Debug Bridge app (adb). This is done using the terminal. For example:

To link `localhost:8080` on your emulator to `localhost:8080` on your development machine, open the terminal and run:

```sh
$ANDROID_HOME/platform-tools/adb reverse tcp:8080 tcp:8080
```

This will create a proxy through to the emulator and should allow the web content to load on the emulator through `localhost:8080` in the emulator web browser. Since the Portals CLI tries to be helpful by changing `localhost` to `10.0.2.2` in your app dev-server setting, you can force the localhost IP in your app by setting the development server to `127.0.0.1`, such as:

```bash
portals serve android \
   --application /path/to/your/android-app.apk \
   --dev-server http://127.0.0.1:8080
```