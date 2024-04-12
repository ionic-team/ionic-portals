---
title: Using Appflow To Build Your Web Project
sidebar_label: Using Appflow To Build Your Web Project
---

In the previous tutorial, we used a demo web app to understand the basics of Appflow. This guide will serve as a rough overview of the features Appflow offers for building your web apps. This information will primarily be relevant to web development teams who are building their web apps in Appflow.

## Build Parameters

### Environments

Any enviornment variables required for your build process can be provided via an Appflow Environment. Environments are collections of environment variables and secrets that can be dynamically set at build time. Environment variables can also be used to change the behavior of the build runners, such as setting the version of Node used in the build process.

You can read more about Appflow Environments [here](https://ionic.io/docs/appflow/tutorial/environments).

:::tip
You can also provide environment variables at build time through the Appflow CLI using the `--env` flag.
:::

### Webhooks

When triggering a new build, you can provide Appflow with a webhook URL to notify once the build is complete. The resulting webhook will contain build metadata such as the build ID, the status of the build, and an authenticated URL to the available build artifact(s). 

The webhook can also be used to alert your team via Slack or Teams. 

You can read more about webhooks [here](https://ionic.io/docs/appflow/package/webhooks).


## Configuration File

To better tune the behavior of the Appflow build runners, you can provide an `appflow.config.json` file at the root of your repository. This file allows you to:
- Utilize a monorepo in Appflow by specifying the project path.
- Provide a custom command for installing dependencies.
- Provide a custom command for building the web project.

We will review each use case below. You can read more about this file [here](https://ionic.io/docs/appflow/cookbook/appflow-config).

### Monorepo support

If you are working in a monorepo, you can inform Appflow of the path to your web project by defining the `root` property for your app. In the example below, the web project is present in `apps/my-app`. All subsequent commands for installing the project dependencies and building the web project will be run from `apps/my-app`.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "root": "apps/my-app"
        }
    ]
}
```

The apps in the configuration file are uniquely identified using their Appflow app ID. You can provide multiple apps within the same configuration file.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "root": "apps/my-app"
        },
        {
            "appId": "a1111a1a",
            "root": "apps/my-other-app"
        }
    ]
}
```

### Customizing the dependency install command

By default, Appflow will use either `npm ci` or `yarn --frozen-lockfile` if the relevant lockfile (either `package-lock.json` or `yarn.lock`) is present in the repository. Otherwise, Appflow will fall back to `npm install` or `yarn` respectively.

You can customize the command used by providing the `dependencyInstallCommand` property for your app. In the example below, we are installing project-level dependencies and `cd`-ing two directories up and installing the root-level dependencies. This workflow is particularly useful for monorepos but can be used independenly if needed.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "root": "apps/my-app",
            "dependencyInstallCommand": "npm ci && cd ../../ && npm ci"
        }
    ]
}
```

You arbitrarily run any shell commands here if needed.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "dependencyInstallCommand": "echo \"Hello world!\" && npm ci"
        }
    ]
}
```

### Customizing the web build command

By default, Appflow will run the `appflow:build` npm script to build your web project. If there is no `appflow:build` script present, it will use the `build` script. You can override this behavior by providing a `webBuildCommand` property for your app. In the example below, we are running the `build:web` npm script.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "webBuildCommand": "npm run build:web"
        }
    ]
}
```

You arbitrarily run any shell commands here if needed.

```json
{
    "apps":
    [
        {
            "appId": "a0000a0a",
            "webBuildCommand": "echo \"Hello world!\" && npm run build:web"
        }
    ]
}
```

## Using NPM Lifecycle Scripts

Appflow supports the use of NPM lifecycle scripts to handle additional functionality during the build process. The most commonly used lifecycle scripts are `preinstall`, `postinstall`, `prebuild`, and `postbuild`.

To add these to your app, simply define them in your `package.json`.

```json
  "scripts": {
    ...
    "preinstall": "echo \"Executing before npm ci/install...\"",
    "postinstall": "echo \"Executing after npm ci/install...\"",
    "prebuild": "echo \"Executing before npm run build...\"",
    "postbuild": "echo \"Executing after npm run build...\"",
    ...
  },
```