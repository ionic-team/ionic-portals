---
title: Overview
sidebar_label: Overview
---

Portals for Capacitor is a flavor of Portals that works within [Capacitor](https://capacitorjs.com/).

## Why use micro frontends

Traditional development of a monolithic frontend applications have required all developers to collaborate within a single codebase and also ship updates together using a release process. As an application grows over time and more teams are added this can slow the development of the overall system.

One way of alleviating this is to divide the larger monolith into smaller applications. This way each team can develop in isolation and then ship updates on their own timeline. There are many existing tools for frontend developers that do just that. The most common is [Module Federation](https://ionic.io/resources/articles/micro-frontends-with-module-federation). This tool allows for teams to develop web applications independently and then bring the builds dependencies together at run-time. It works great for hosted web applications. For most teams a tool like this is probably not needed, but when you have multiple teams trying to collaborate and ship updates independently it can offer a lot of autonomy and value.

## Purpose of Portals for Capacitor

Micro frontends work great for the web because developers can deploy in real time. Each application lives on a different server or directory location so this separation is inherent on the web, but the same can not be said for mobile applications.

Mobile applications (Native or Hybrid) are monoliths by their very nature. They are built, packaged, and released through a single release pipeline straight to an app store or to a Mobile Device Management solution.

Portals for Capacitor complements existing micro frontend tools like Module Federation to break down mobile monoliths into a micro frontend architecture. These applications can be developed in isolation and then released independently using Appflow with over the air live updates.

**Steps for implementing Portals for Capacitor**

1. Setup Module Federation between your mobile applications. Ensure that it works in a browser.
2. Configure the shell application to work in Capacitor. Ensure that it works in a mobile emulator.
3. Setup Appflow live updates so that you can publish updates to each application independently.

## Getting Started

To begin with Portals for Capacitor you will need to [signup for a key.](../getting-started)

Before we can install the plugin we need to create an `.npmrc` file in the shell project root. This is the main application. After the file is created we can install from the `@ionic-enterprise` registry. Note that the `authToken` value will need to be set to `YOUR_PORTALS_KEY` from the Appflow dashboard.

```bash {2} title=.npmrc
@ionic-enterprise:registry=https://registry.ionicframework.com/
//registry.ionicframework.com/:_authToken=YOUR_PORTALS_KEY
```

:::caution
If you are using other plugins from the `@ionic-enterprise` registry in your Capacitor app then you will need to have your account provisiioned with access to Portals by contacting support.
:::

Next, install the plugin from command line:

```bash
npm install @ionic-enterprise/capacitor-portals
```
