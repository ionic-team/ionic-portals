---
title: iOS Quick Start Walkthrough
sidebar_label: iOS Quick Start Walkthrough
---

import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

# iOS Quick Start Walkthrough

This is a walkthrough on how to get a single Portal + web application setup. To begin this walkthrough it will be assumed that you have already signed up for access to Portals and you have your Portals key ready.

First have your web application ready. We will add some configuration to it and then get it setup in Appflow.

## 1. Create a capacitor config

Create a `capacitor.config.json` file to the root of your web project. We will not need to add Capacitor to the web project but this configuration file will help us configure some options for the Portals that is displaying this web application.

```json
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

Now that we have the application source configured we will need to add it to Appflow. Appflow will be used for deploying the web application into the Portal. Initially this will be done during the Native App build process and then after the Native App has gone through the App Store release process it will be updated via LiveUpdates.

#### Connect the repo

_![alt text](/img/appflow-step-one.png "Title")_

#### Build the connected application

_![alt text](/img/appflow-step-two.png "Title")_

## 3. Setup local dev environment

Generate a token ( https://dashboard.ionicframework.com/settings/personal-access-tokens)

_![alt text](/img/appflow-generate-token.png "Title")_

#### Install the Ionic Cloud CLI

(https://ionic.io/docs/appflow/cli/overview)

```bash
(export IONIC_CLOUD_VERSION=0.7.0; curl -sL https://ionic.io/get-ionic-cloud-cli | bash)
```

#### Create a cloud configuratoin file

Create a yaml configuration file in your native project. Besure to set this to ignore in your .gitignore
https://ionic.io/docs/appflow/cli/overview#authentication

```yaml title=.ionic-cloud.yaml
TOKEN: my-token
```

## 4. Install Portals into your iOS Application

Install the Cocoapod file

:::note
IonicPortals requires using Cocoapods 1.10 or greater.
:::

To add Portals to your iOS project, put the following line to your `Podfile`:

```ruby title=Podfile
pod 'IonicPortals', '~> ${getPortalsVersionIos()}'
```

And then run `pod install`.

#### Pull latest web application build from Appflow

Now let’s go to the iOS project in XCode.

Setup the build script

```bash
# APP_ID - AppFlow AppId for your web application
# CHANNEL - AppFlow distribution channel. production is the default channel
# PORTAL_NAME - Choose a name for the portal

APP_ID=c65939c1
CHANNEL=production
PORTAL_NAME=featured_product

ionic-cloud live-update download \
  --config="${SOURCE_ROOT}/.ionic-cloud.yaml" \
  --app-id ${APP_ID} \
  --channel-name ${CHANNEL} \
  --zip-name ${PORTAL_NAME}.zip


unzip ${PORTAL_NAME}.zip -d \
  ${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.app/${PORTAL_NAME}
rm ${PORTAL_NAME}.zip
```

#### Configure our first Portal

Add our first Portal
https://ionic.io/docs/portals/getting-started/iOS

```swift title=AppDelegate.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    PortalsRegistrationManager.shared.register(key: "MY_API_KEY")
    return true
}
```
