---
title: Portal Communication
sidebar_label: Portal Communication
---

Ionic Portals provides multiple ways to communicate between the web and native parts of your application.

## Portal Plugin

The Ionic Portals library comes packaged with a plugin called the Portal Plugin that provides a way to communicate between the web and native parts of your application in a publish-subscribe fashion. This method provides a way to pass data or control elements of the native UI without needing to write a custom Capacitor plugin.

See our guide on [How To Use The Portal Plugin](./how-to/using-the-portal-plugin)

## Capacitor Core Plugins

Ionic Portals uses [Capacitor](https://capacitorjs.com) as the bridge between your web and native application. One of the main benefits of this is that you can use Capacitor Plugins in applications using Portals. All of the [Core Capacitor Plugins](https://capacitorjs.com/docs/apis) are available out of the box via NPM for the web application and as native dependencies from Maven Central and Cocoapods.

See our guide on [How To Use a Capacitor Plugin](./how-to/using-a-capacitor-plugin)

## Custom Plugins

Using the Capacitor Plugin system you can develop a custom interface for the communication through Portals inside your native application and provide the web part of your application a Typescript interface to use that plugin as you would any Capacitor Plugin.

See our guide on [How To Define a Portal API](./how-to/define-api-in-typescript)

## Which Should I Choose?

See our page on [Communication Mechanisms](./choosing-a-communication) to explore the different Portal Communication options in more detail and see which might best fit your use case.
