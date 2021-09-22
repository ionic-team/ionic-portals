---
title: Communication Mechanisms
sidebar_label: Communication Mechanisms
---

This page explores the different kinds of Communication Mechanisms in Ionic Portals and where you may wish to use one kind over another. For a more general overview, see the [Portals Communication](./portal-communication) page.

## Data Messages and UI Control

Communicating data through a Portal from web to native, or vice versa, creates immersive experiences that blurs the boundary between where native ends and web starts. Portals provides two different ways to pass data: the Portals Plugin, and writing a custom Capacitor Plugin.

### Portals Plugin

The Portal Plugin is part of the Portals library and provides a helpful, lightweight way to publish and subscribe to messages through a Portal without needing to write a custom Capacitor Plugin in your native application.

We recommend this approach when performing small UI tasks like dismissing a native modal from inside the web application, or passing short messages. This mechanism may also be more appealing to small teams or solo developers who want to communicate through a Portal without the desire to build a Custom Plugin.

See our guide on [How To Use The Portal Plugin](./how-to/using-the-portal-plugin).

### Custom Plugin

Developing a custom Capacitor Plugin is a great way to have more structured communication through a Portal. The Capacitor Bridge is used under the hood in Portals and this allows any Capacitor Plugin to be used, even the [Core Plugins](##capacitor-core-plugins). 

For custom communication between your web and native application, you can write a Capacitor Plugin inside your native code and provide the web code with a Typescript API that will use the plugin.

We recommend this approach for larger teams or developers who prefer to separate logic in their applications, share functionality between multiple portals, or even develop their custom plugin separately outside the native application code.

See our guide on [How To Define a Portal API](./how-to/define-api-in-typescript).

## Initial Context

The Ionic Portals library provides a way to set initial context data for the web application in a Portal. This is helpful when you need to pass some data in so that it is available before the web application loads. Examples where this is useful include:

- Passing session information or data to the application so that the page is pre-filled as it loads. This avoids any delay between the page loading and data being populated after by other means.

- You may wish to use a single-page web application in your project and navigate to different sections depending on which Portal is displayed in the native application. Navigating after the Portal is loaded reveals the page reload event to the user, whereas using the initial context mechanism to navigate before the page is loaded in the Portal provides a more immersive experience.

For more information about using the initial context mechanism, see our guide on [How To Use The Portal Plugin](./how-to/using-the-portal-plugin).

## Capacitor Core Plugins

The library of [Core Capacitor Plugins](https://capacitorjs.com/docs/apis) is available out of the box and ready to use with Portals. We have made all core plugins available as native dependencies through Maven Central and CocoaPods so that when added to a native project, they will allow web applications in Portals to use them with no custom code required. By using the Capacitor Core Plugins you can save time by not having to write your own native code to take a photo or store files, for example.

See our guide on [How To Use a Capacitor Plugin](./how-to/using-a-capacitor-plugin).

## Examples

Examples of the different communication mechanisms described in this page can be seen in our [E-Commerce App](./examples/ecommerce-app) demo.
