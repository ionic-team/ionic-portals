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

### Installation

To get started with Portals for Capacitor the first thing you will need is Ionic Enterprise for you app. If you have not already setup Ionic Enterprise in your app, [follow the one-time setup steps](https://ionic.io/docs/premier-plugins/setup).

Next, install the plugin:

```sh
npm install @ionic-enterprise/capacitor-portals
```
