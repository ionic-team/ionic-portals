---
title: Self-hosted Live Updates
sidebar_label: Self-hosted Live Updates
---

## Overview

For our customers with strict security requirements, Self-hosted Live Updates includes enhanced security features built on top of Appflow's already secure delivery mechanisms.

Rather than building your web apps on Appflow's infrastructure, Self-hosted Live Updates allows customers to build and host their web artifacts then deploy them as Live Updates to app users. To help ensure secure end-to-end delivery, code signing and signature verification steps are included as well.

This guide outlines the one-time setup process for Self-hosted Live Updates and instructions on how to include them within your existing CI/CD pipeline.

## Requirements

**Mobile:**
- User devices running the [minimum supported platform version](../../getting-started.md#supported-platform-versions).

**Cloud infrastructure:**
- High-availability servers that can handle low to medium levels of traffic (varies based on number of app users). Any modern CI/CD platform will suffice, such as AWS, Azure DevOps, Jenkins, etc.
- Integration of the [Appflow CLI](https://ionic.io/docs/appflow/cli/overview) into a pre-existing or new CI/CD pipeline.
- Hosting the web build artifacts in Appflow or your cloud storage provider of choice (such as AWS S3 buckets or Azure Storage Blobs)
- [Optional] Leveraging a CDN to distribute live updates around the world and enable faster downloads to end users of your apps


## Workflow

Much of the self-hosted live update process is completed within your CI/CD infrastructure, with Appflow and a live update plugin managing the deployments of live updates.

Starting in your CI/CD system, a web build is performed. The web build is packaged up into a live update bundle and signed with a private key using the Appflow CLI. Next, the live update is uploaded to your storage provider of choice. Then, the live update is registered with Appflow so it knows that a new live update is available. Various metadata, such as the web URL of the live update, is shared with Appflow. Finally, the live update can be deployed immediately if desired using the Appflow CLI.

Customers can choose to deploy the live update at a later time using the Appflow web UI or the Appflow CLI. Within Appflow, the same capabilities of the classic live update solution are available, including viewing the complete list of live updates, the ability to set native versioning restrictions, and even rollback to previous live updates.

When an app user reopens your mobile app, the live update plugin calls back to Appflow to see if a new live update is available. If it is, then it is downloaded to the device. Using a public key embedded in the app, the live update bundle is verified. If the contents are successfully verified, the live update is applied to the mobile app. The next time the user opens the app they will see the new live update changes.


## App Setup

The following steps explain the one-time setup process required to configure your app.

### Create an App in Appflow

While many of these features are performed within your infrastructure, Appflow still needs to be aware of your app. You'll also manage live update deployments and channels from within the Appflow dashboard. On the Apps screen within Appflow, click the New button then choose "Import existing app." Enter your app's name, select Capacitor as the mobile architecture, then click "Connect git host later." You won't connect your app's code to Appflow at any point.

With the app created, note the App ID that appears at the top of the screen, such as "042a1261." You'll need it shortly.

### Download and Configure the Appflow CLI

Use of Self-hosted Live Updates requires using the Appflow CLI for signing, bundling, and uploading Live Update artifacts. It can also generate signing keys for you if you need it to. The Appflow CLI was purpose-built for use within CI/CD systems; it's small and easy to download. Please reference the [one-line install instructions](https://ionic.io/docs/appflow/cli/overview#install).

You'll also need to supply the Appflow CLI with a [Personal Access Token](https://ionic.io/docs/appflow/personal-access-tokens) for authentication with your Appflow account. The [Appflow CLI documentation](https://ionic.io/docs/appflow/cli/overview#authentication) outlines the available configuration options.

### Code Signing: Generate Live Update Signing Keys

Code signing guarantees that the code your developers wrote is the code that is shipped and applied to user devices. Each Live Update web artifact is signed with your private key, then the Live Updates plugin uses the public key to verify integrity of the new update. It is only applied to the user's device if nothing has been modified.

The Appflow CLI includes a command for generating signing keys. This command generates a public and private key pair. The key files are written to the current working directory; these files can be named by passing additional arguments to the following command.

```shell
appflow live-update generate-signing-key
```

The private key is used by the Appflow CLI to sign the Live Update artifact before uploading the artifact to Appflow. The public key needs to be published with your app via the Live Update plugin configuration to verify the signature of the Live Update artifact upon download.

### Code Signing: Store Your Private Key

You only need to generate your signing keys once. After generating your key pair, ensure you store your private key somewhere secure and durable. If your private key is lost, you will need to generate a new signing key pair and publish the new public key to your app via a native binary release.

Make sure you also store the private key somewhere that is accessible from your CI/CD system. The private key will need to be passed to the Appflow CLI each time you upload a new Live Update artifact.


## CI/CD Pipeline Setup

The following sections outline the additional steps to add to your CI/CD pipeline to publish a Self-hosted Live Update to your app.

### Build a Live Update

Using your preferred CI/CD system, perform a build of your app's web resources.

### Host a Live Update

Customers can choose to have live update web artifacts stored and hosted in Appflow ("Appflow-hosted") or their cloud storage solution of choice ("self-hosted").

#### Appflow-hosted

If you choose to have Appflow host your live update web artifacts, your app's build directory will be signed, bundled, and uploaded to Appflow.

The Appflow CLI does the heavy lifting here:

```
appflow live-update upload-artifact
  --app-id=APP_ID
  --build-dir=DIR
  --commit-ref=BRANCH
  --commit-sha=SHA
  --commit-message=MESSAGE
  --signing-key=IONIC_SIGNING_KEY
  --token=TOKEN
  --artifact-type=ARTIFACT_TYPE
```

- `app-id`: The Appflow App ID created at the top of this guide, such as 042a1261.
- `build-dir`: The directory where your compiled web app is found, such as www for Angular apps.
- `commit-ref`: The branch name of the commit, such as "main" or "production."
- `commit-sha`: The Git commit SHA, such as "adf9137y45".
- `commit-message`: The Git commit message, such as "Fix login bug."
- `signing-key`: Pass the entire private key as a string or the complete file path/name.
- `token`: The Appflow personal access token.
- `artifact-type`: Set to `zip` to zip the entire application and `manifest` (recommended) to create a differential manifest. Defaults to `zip` if omitted (will default to `manifest` in a future release - it is recommended to explicitly specify the method you are using).

#### Self-hosted

If you choose to host live update web artifacts in your infrastructure, your app's build directory will be signed, bundled, and uploaded to your storage mechanism of choice. Finally, you'll inform Appflow that a new live update is available.

:::note
Complete pipeline examples are available, such as [Azure DevOps](https://ionic.io/docs/appflow/cli/examples/self-hosted-live-updates/azure-devops) and [Github Actions](https://ionic.io/docs/appflow/cli/examples/self-hosted-live-updates/github-actions).
:::

##### Generate a Manifest File

A manifest file contains a base64-encoded list of the bundle contents and their respective hashes. To generate a manifest file, use the `appflow live-update generate-manifest` command:

```
appflow live-update generate-manifest
  --build-dir=BUILD_DIR
  --signing-key=PRIVATE_KEY
```

- `build-dir`: The relative path to your build directory (ie `dist`, `build`, etc.)
- `signing-key`: Optional. The path to your private key or the contents as a string. Bundle signing is optional, so this can be omitted if signing is unnecessary.

This will add a `live-update-manifest.json` file to your web bundle.

##### Upload Live Update to Storage Provider

With the new live update created, upload it your storage provider of choice. Steps will vary depending on your provider of choice (AWS S3, Azure data storage, etc.). See [Azure data storage](https://ionic.io/docs/appflow/deploy/setup/self-hosted#upload-live-update-to-azure-blob-storage) as an example.

If using the differential strategy (recommended), upload the entire application's files, including the live-update-manifest.json file generated in the previous step. If using the zip strategy, upload the entire application and live update manifest in a zip file.

##### Register the Web Artifact

In this final step, inform Appflow that a new live update is available using the `register-artifact` command.

```
appflow live-update register-artifact
  --app-id=APP_ID
  --artifact-type=TYPE
  --artifact-url=URL
  --commit-ref=REF
  --commit-sha=SHA
  --commit-message=MESSAGE
  --token=TOKEN
```

- `app-id`: The Appflow App ID created at the top of this guide, such as 042a1261.
- `artifact-type`: The type of artifact being registered, either zip or manifest for differential live updates.
- `artifact-url`: The URL where the new live update artifact is stored. The Capacitor live update plugin will download the live update from your storage provider. When using manifest artifact-type, URL should end with live-update-manifest.json. When using zip artifact-type, URL should end with .zip.
- `token`: The Appflow personal access token.
- `commit-ref`: The branch name of the commit, such as "main" or "production."
- `commit-sha`: The Git commit SHA, such as "adf9137y45".
- `commit-message`: The Git commit message, such as "Fix login bug."

#### Deploy the Live Update
Upon completion, you'll find the new live update in your app's Builds list in Appflow. From there, you can follow the standard Live Update flow of [assigning the build to a Live Update Channel](https://ionic.io/docs/appflow/deploy/deploy-live-update#assign-the-build-to-a-channel).