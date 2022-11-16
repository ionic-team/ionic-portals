---
title: iOS Quick Start
sidebar_label: iOS Quick Start
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeBlock from '@theme/CodeBlock';
import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

# iOS Quick Start

This is a walkthrough on how to get a single Portal + web application setup. To begin this walkthrough it will be assumed that you have already signed up for access to Portals and you have your Portals key ready.

First have your web application ready. We will add some configuration to it and then get it setup in Appflow.

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
There are many options that you can provide to a Capacitor configuration file we will only need a few to get started.
:::

## 2. Add the web application to Appflow

Now that we have the application source configured we will need to add it to Appflow. Appflow will be used for deploying the web application into the Portal.

During the Native App build process the most recent build of the web application will be used to seed the Portal, and then after the Native App deployment every subsequent build can be deployed as an over the air Live update.

### Connect the repo

After logging into your [Appflow](https://dashboard.ionicframework.com/) account go to the Apps page.

In the upper right hand corner you will be able to select `Import existing app`.

<em><img src={useBaseUrl("/img/start-by-adding-an-app.webp")} width="50%"/></em>
<em><img src={useBaseUrl("/img/import-existing-app.webp")} width="50%"/></em>

- Provide an `App Name`. Most likely using the same you provided in the `capacitor.config.json` file in the previous step.
- `Capacitor`, as the mobile architecture
- Choose your git host. In this example we have selected `Github`

### Web application builds

After the app has been created you will want to go to the `Builds` page. This is where you will create new builds and see previous builds. Anytime you want to deploy a new version of the web application you will need to create a build from this screen or by using the Ionic Cloud CLI (which we will cover later).

<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/builds-screen.webp")} width="75%"/>
</em>

:::tip
Also in the top left corner of these screens you will see the Appflow App id. In this case it is `11a0971f`. This id will be used when we configure the native application.
:::

### Build the connected application

After the application has been added to Appflow you will need to create your first build so that it is available to seed the Portal in the Native App.

This can be done by hitting the `New Build` button on the 'Builds' page. Then you will choose a the most recent commit to create the build from.

<em><img src={useBaseUrl("/img/create-a-new-build.webp")} width="50%"/></em>
<em><img src={useBaseUrl("/img/create-a-new-build-selected.webp")} width="50%"/></em>

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
<img src={useBaseUrl("/img/personal-access-token.webp")} width="75%"/>
</em>

Click the `Generate new token` button. While creating the token it is a best practice to give it an optional expiration date but not required.

:::tip
After the token is generated you will need to copy it to clipboard because it will be required for the next step. Usually the token follows the format of `ion_XXXXXXXXXXXXX`.
:::

### Create a cloud configuration file

Now create a yaml configuration file in your native project. This file will be used to authenticate against Appflow for your cloud interactions. Usually you will place this file in your native applications source root. It will be referenced by a build script in your native application.

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

The last step in setting up the local environment is adding a script to the project in XCode so that it will download the latest web application build from Appflow every time the iOS application is built.

Open Xcode and go to your Project settings. Add a new build phase of type `New Run Script Phase`.
<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/xcode-run-script.webp")} width="75%"/>
</em>

The following bash code should be added to the build process.

```bash
APP_ID=11a0971f
CHANNEL=production
PORTAL_NAME=featured_products

ionic-cloud live-update download \
  --config="${SOURCE_ROOT}/.ionic-cloud.yaml" \
  --app-id ${APP_ID} \
  --channel-name ${CHANNEL} \
  --zip-name ${PORTAL_NAME}.zip


unzip ${PORTAL_NAME}.zip -d \
  ${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.app/${PORTAL_NAME}
rm ${PORTAL_NAME}.zip
```

There are a few variables that you will need to setup at the beginning of script.

- `APP_ID` - Web application id from Appflow
- `CHANNEL` - Live update distribution channel.
- `PORTAL_NAME` - Choose a name for the portal, no spaces.

## 4. Setup Portals in your iOS App

### Install the Cocoapod file

:::note
IonicPortals requires using Cocoapods 1.10 or greater.
:::

To add Portals to your iOS project, put the following line to your `Podfile`:

<CodeBlock className="language-ruby" title="Podfile">
{`pod 'IonicPortals', '~> ${getPortalsVersionIos()}'`}
</CodeBlock>

And then run `pod install`.

### Add the Portals key

After installation of Portals we can setup the Portals key. Then the application is ready to have its first Portal configured. A typical place to do so is in the `AppDelegate` `application(_:didFinishLaunchingWithOptions)` method. There, you can use the [PortalsRegistrationManager](https://ionic-portals-ios.vercel.app/documentation/ionicportals/portalsregistrationmanager) to register:

```swift {9} title=AppDelegate.swift
import UIKit
import IonicPortals

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(_ application: UIApplication, didFinishLaunchingWithOptions
  launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    PortalsRegistrationManager.shared.register(key: "YOUR_PORTALS_KEY")
    return true
  }
}
```

### Create the first Portal

Now that the application has been configured all we need to do is add the Portal to a view. By default, a `Portal` will use the `name` property as the directory to load web content from (relative to the root of `Bundle.main`). You can also specify another directory for the content.

```swift
class ViewController: UIViewController {
    override func loadView() {
        self.view = PortalUIView(portal: "featured_products")
    }
}
```

:::warning
Avoid committing your Portals key to source code repositories where it may be publicly visible!
On iOS, you can use an [`.xcconfig` file](https://nshipster.com/xcconfig/) to keep it out of a public repository.
:::

Thats it! Portals is now setup in your application and you can add new Portals at any time. Next step would be to setup LiveUpdates within your application.
