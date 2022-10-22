---
title: How To Register for a Product Key
sidebar_label: Register for a Product Key
---

import { getCapacitorVersion, getPortalsVersion, getPortalsVersionIos, getPortalsVersionAndroid, getPortalsVersionRN, getiOSMinVersion, getAndroidMinSdk, getRnMinVersion } from '@site/src/util';

## Add configuration file

Assume you already have a Portals key.

Get started by having a web application ready.

Add `capacitor.config.json` file to the root of the project
Mostly for configuring the webDir

```json
{
  "appId": "com.ionicframework.featured-products",
  "appName": "Featured Products",
  "webDir": "build"
}
```

## Connect repo to Appflow

Add to AppFlow
![alt text](/img/appflow-step-one.png "Title")

Make first Build
Choose production live update deployment
![alt text](/img/appflow-step-two.png "Title")

## Setup local dev environment

Generate a token ( https://dashboard.ionicframework.com/settings/personal-access-tokens)
Account -> Personal Settings -> Personal Access Tokens
![alt text](/img/appflow-generate-token.png "Title")

Install the Ionic Cloud CLI (https://ionic.io/docs/appflow/cli/overview)

```bash
(export IONIC_CLOUD_VERSION=0.7.0; curl -sL https://ionic.io/get-ionic-cloud-cli | bash)
```

Create a yaml configuration file in your native project. Besure to set this to ignore in your .gitignore
https://ionic.io/docs/appflow/cli/overview#authentication

```yaml
# .ionic-cloud.yaml
TOKEN: my-token
```

## Install Portals into your iOS Application

Install the Cocoapod file

:::note
IonicPortals requires using Cocoapods 1.10 or greater.
:::

To add Portals to your iOS project, put the following line to your `Podfile`:

<CodeBlock className="language-ruby" title="Podfile">
{`pod 'IonicPortals', '~> ${getPortalsVersionIos()}'`}
</CodeBlock>

And then run `pod install`.

## Pull latest web application build from Appflow

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

## Configure our first Portal

Add our first Portal
https://ionic.io/docs/portals/getting-started/iOS

```swift title=AppDelegate.swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    PortalsRegistrationManager.shared.register(key: "MY_API_KEY")
    return true
}
```
