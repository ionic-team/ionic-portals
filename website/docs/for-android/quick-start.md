---
title: Android Quick Start
sidebar_label: Android Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

# Android Quick Start

This is a walkthrough on how to get a single Portal + web application setup. To begin this walkthrough it will be assumed that you have already signed up for access to Portals and you have your Portals key ready.

First have your web application ready. We will add some configuration to it and then get it setup in Appflow. At the end of this walkthrough:

- the web application will be setup in Appflow
- each new Android application build will pull the latest version of the web application from Appflow
- the Android application will have a Portal setup pointing to the web application files.

## 1. Create a capacitor config

Create a `capacitor.config.json` file to the root of your web project. We will not need to add Capacitor to the web project but this configuration file will help us configure some options for the Portals that are displaying this web application.

```json showLineNumbers
{
  "appId": "com.ionicframework.featured-products",
  "appName": "Featured Products",
  "webDir": "build"
}
```

These configuration values are required for web applications added to Appflow.

- `appId`, a unique id that you provide to your web application
- `appName`
- `webDir`, the directory where your compiled web code will be placed

:::note
There are many options that you can provide to a Capacitor configuration file we will only need a few to get started. These options are defined in the [config schema](https://capacitorjs.com/docs/config#schema).
:::

## 2. Add the web application to Appflow

Now that we have the application source configured we will need to add it to Appflow. Appflow can be used for deploying the web application into the Portal later using Live Updates.

During the Native App build process the most recent build of the web application will be used to seed the Portal, and then after the Native App deployment every subsequent build can be deployed as an over the air Live update.

### Connect the repo

After logging into your [Appflow](https://dashboard.ionicframework.com/) account go to the Apps page.

In the upper right hand corner you will be able to select `Import existing app`.

<em><img src={useBaseUrl("/img/start-by-adding-an-app-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/start-by-adding-an-app.webp")} width="50%"/></em>
<em><img src={useBaseUrl("/img/import-existing-app-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/import-existing-app.webp")} width="50%"/></em>

- Provide an `App Name`. Most likely using the same you provided in the `capacitor.config.json` file in the previous step.
- `Capacitor`, as the mobile architecture
- Choose your git host. In this example we have selected `Github`

### Web application builds

After the app has been created you will want to go to the `Builds` page. This is where you will create new builds and see previous builds. Anytime you want to deploy a new version of the web application you will need to create a build from this screen or by using the Ionic Cloud CLI (which we will cover later).

<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/builds-screen-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/builds-screen.webp")} width="75%"/>
</em>

:::tip
Also in the top left corner of these screens you will see the Appflow App id. In this case it is `11a0971f`. This id will be used when we configure the native application.
:::

### Build the connected application

After the application has been added to Appflow you will need to create your first build so that it is available to seed the Portal in the Native App.

This can be done by hitting the `New Build` button on the 'Builds' page. Then you will choose a the most recent commit to create the build from.

<em><img src={useBaseUrl("/img/create-a-new-build-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/create-a-new-build.webp")} width="50%"/></em>
<em><img src={useBaseUrl("/img/create-a-new-build-selected-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/create-a-new-build-selected.webp")} width="50%"/></em>

When creating a new build there are a few values that we need to change on the initial build for the app.

- `Target Platform` should be `Web`
- `Build Stack` should just be the default which is the latest.
- `Live update` should be turned on and `Channel` should be set to `production`

## 3. Setup local dev environment

### Create a Personal Access Token

Now that we have the web application all setup in Appflow and built we need to get our local environment setup to be able to pull it from Appflow.

The first step in setting up our local environment is [generating a personal access token](https://dashboard.ionicframework.com/settings/personal-access-tokens).

This is done from `Personal Settings` in the `Personal Access Token` tab.

<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/personal-access-token-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/personal-access-token.webp")} width="75%"/>
</em>

Click the `Generate new token` button. While creating the token it is a best practice to give it an optional expiration date but not required.

:::tip
After the token is generated you will need to copy it to clipboard because it will be required for the next step. Usually the token follows the format of `ion_XXXXXXXXXXXXX`.
:::

### Create a cloud configuration file

Now create a yaml configuration file in your native project. This file will be used to authenticate against Appflow for your cloud interactions. Place this file in the `app` directory for your project in the same location as your module level `build.gradle` file. It will be referenced by a build script in your native application.

```yaml title=.ionic-cloud.yaml
TOKEN: ion_XXXXXXXXXXXXX
```

:::note
Be sure to set this to ignore in your `.gitignore` [Learn more about the configuration file.](https://ionic.io/docs/appflow/cli/overview#authentication)

:::

### Install the Ionic Cloud CLI

Install the Ionic Cloud CLI within your local dev environment. This CLI will allow us to interact with Appflow programmatically. So that we can pull the latest Build files during native builds.
(https://ionic.io/docs/appflow/cli/overview)

```bash
(export IONIC_CLOUD_VERSION=0.7.0; curl -sL https://ionic.io/get-ionic-cloud-cli | bash)
```

### Create web application download script

The last step in setting up the local environment is adding a script to the project in Gradle so that it will download the latest web application build from Appflow every time the Android application is built.

Open Android Studio and place the following script at the bottom of your module Gradle script.
<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/android-run-script-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/android-run-script.webp")} width="75%"/>
</em>

The scripts are slightly different depending on if you are building on a Windows or *nix based system.

<Tabs
defaultValue="nix"
values={[
{ label: 'MacOS/Linux', value: 'nix', },
{ label: 'Windows', value: 'win', },
]}>
<TabItem value="nix">

```groovy title=build.gradle

// ...

// Make the preBuild task depend on getLiveUpdate so it runs every build
preBuild.dependsOn 'getLiveUpdate'

tasks.register('getLiveUpdate') {
    doLast {
        String appId = "0ee57266"
        String channel = "PRODUCTION"
        String portalName = "MY_FIRST_PORTAL"

        String assetPath = rootDir.getPath() + '/app/src/main/assets/' + portalName
        if (new File(assetPath).exists()) {
            // If the web app already exists, replace with fresh download
            project.exec {
                commandLine 'rm', '-rf', assetPath
            }
            project.exec {
                commandLine 'mkdir', '-p', assetPath
            }
        } else {
            project.exec {
                commandLine 'mkdir', '-p', assetPath
            }
        }

        project.exec {
            commandLine 'ionic-cloud', 'live-update', 'download', '--config=.ionic-cloud.yaml', '--app-id', appId, '--channel-name', channel, '--zip-name', portalName + '.zip'
        }
        project.exec {
            commandLine 'unzip', portalName + '.zip', '-d', assetPath
        }
        project.exec {
            commandLine 'rm', portalName + '.zip'
        }
    }
}
```

</TabItem>
<TabItem value="win">

```java title=build.gradle

// ...

// Make the preBuild task depend on getLiveUpdate so it runs every build
preBuild.dependsOn 'getLiveUpdate'

tasks.register('getLiveUpdate') {
    doLast {
        String appId = "0ee57266"
        String channel = "PRODUCTION"
        String portalName = "MY_FIRST_PORTAL"

        String assetPath = rootDir.getPath() + '\\app\\src\\main\\assets\\' + portalName
        if (new File(assetPath).exists()) {
            // If the web app already exists, replace with fresh download
            project.exec {
                commandLine 'cmd', '/c', 'rm', '-r', assetPath
            }
            project.exec {
                commandLine 'cmd', '/c', 'mkdir', assetPath
            }
        } else {
            project.exec {
                commandLine 'cmd', '/c', 'mkdir', assetPath
            }
        }

        project.exec {
            commandLine 'cmd', '/c', 'ionic-cloud', 'live-update', 'download', '--config=".ionic-cloud.yaml"', '--app-id', appId, '--channel-name', channel, '--zip-name', portalName + '.zip'
        }
        project.exec {
            commandLine 'cmd', '/c', 'unzip', portalName + '.zip', '-d', assetPath
        }
        project.exec {
            commandLine 'cmd', '/c', 'rm', portalName + '.zip'
        }
    }
}
```

</TabItem>
</Tabs>

There are a few variables that you will need to setup at the beginning of script.

- `APP_ID` - Web application id from Appflow
- `CHANNEL` - Live update distribution channel.
- `PORTAL_NAME` - Choose a name for the portal, no spaces.

## 4. Setup Portals in your Android App

### Install the Portals Dependency

To add Portals to your Android project, add the dependency to your `build.gradle` file

<CodeBlock className="language-groovy" title="build.gradle">
{
`
// ----------------------------------------------
//  Module-level build.gradle
// ----------------------------------------------
dependencies {
    implementation 'io.ionic:portals:${getPortalsVersionAndroid()}'
}`.trim()
}
</CodeBlock>

### Add the Portals key

After installation of Portals we can setup the Portals key. Then the application is ready to have its first Portal configured. To do this, a custom [Application](https://developer.android.com/reference/android/app/Application) class is recommended. In this Application class, you can override `Application#onCreate()` to register and create Portals. 

You'll need to call [PortalManager.register(myApiKey)](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html#-1847662668%2FFunctions%2F-149544105) before creating any Portals in your app. Below is a simple example of how to bootstrap Ionic Portals before loading any Portal instances in your app. Putting this registration call in an `Application` class is a good way to guarantee it is called before any Portals are created, but you can call it anywhere in your app as long as it happens before Portals are loaded. To get an API Key, refer to the [Sign Up](#signup) section.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin title=MyApplication.kt
class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("YOUR_PORTALS_KEY")
        // setup portals
    }
}
```

</TabItem>
<TabItem value="java">

```java title=MyApplication.java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PortalManager.register("YOUR_PORTALS_KEY");
        // setup portals
    }
}
```

</TabItem>
</Tabs>

:::caution
Avoid committing your Portals key to source code repositories where it may be publicly visible!
On Android, you can use the [Secrets Gradle Plugin](https://github.com/google/secrets-gradle-plugin) to keep it out of a public repository.
:::

After creating a custom Application class, be sure to add the `android:name` attribute to your `application` tag in the `AndroidManifest.xml`.

```xml title=AndroidManifest.xml {7}
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.example.my.app">

    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name">
        /* ... */
        /* other manifest code here */
        /* ... */
    </application>
</manifest>
```

### Create the first Portal

After registering via the [PortalManager.register()](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html#-1847662668%2FFunctions%2F-149544105) function, you can create Portals. This Quick Start guide shows how to use Portals directly in an XML layout, but there are also [other ways to do this](./getting-started.md#using-a-portal-in-code). 

Use the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html) to quickly create a [Portal](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal/index.html) and link it to an XML layout.

<Tabs
defaultValue="kt"
values={[
{ label: 'Kotlin', value: 'kt', },
{ label: 'Java', value: 'java', },
]}>
<TabItem value="kt">

```kotlin
class MyApplication : Application() {
    override fun onCreate(): Unit {
        super.onCreate()
        PortalManager.register("YOUR_PORTALS_KEY")

        val portalId = "MY_FIRST_PORTAL"
        PortalManager.newPortal(portalId).create()
    }
}
```

</TabItem>
<TabItem value="java">

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        PortalManager.register("YOUR_PORTALS_KEY");

        String portalId = "MY_FIRST_PORTAL";
        PortalManager.newPortal(portalId).create();
    }
}
```

</TabItem>
</Tabs>

Now, the [Portal](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal/index.html) is successfully created and managed by the [PortalManager](https://ionic.io/docs/portals-android-api-ref/-ionic-portals/io.ionic.portals/-portal-manager/index.html).

Add a PortalView to a layout XML file in your Application. Use the `portalId` attribute in the XML tag as shown below to link it to the Portal you created.

```xml
<?xml version="1.0" encoding="utf-8"?>
<io.ionic.portals.PortalView
    app:portalId="MY_FIRST_PORTAL"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

The `strings.xml` resources file can be used to ensure the Portal ids match up, but it isn't necessary to do so.

### Finished with setup

Thats it! Portals is now setup in your application and you can add new Portals at any time. Now it is time to build the Android app in Android Studio and see it working in the emulator or on device. Now any time a new deployment is done to the `production` channel subsequent Gradle builds will pull in the latest version.

Next step would be to setup Live Updates within your application.
