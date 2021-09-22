---
title: Ionic Portals
sidebar_label: Overview
---

import WistiaVideo from '@site/src/components/WistiaVideo';

Ionic Portals is a supercharged native Web View component for iOS and Android that lets you add web-based experiences to native mobile apps. It enables native and web teams to better collaborate and bring new and existing web experiences to mobile in a safe, controlled way.

todo: direct portals signup link:
Ionic Portals is free. [Try it now](http://dashboard.ionicframework.com/personal/apps?native_trial=1).

<WistiaVideo videoId="jz6bwia807" />

## Why Ionic Portals?

The vast majority of apps in the app stores need to integrate web assets for specific screens and experiences. It could be for authentication forms, features such as mortgage applications, or to bring web experiences to mobile without needing to port them to native. This is the case even for teams that are fully invested in a traditional native app development stack.

Despite how common this need is, bringing these web experiences to native mobile apps and code bases is anything but straightforward. Teams struggle to integrate web apps with native functionality and do it in a safe, controlled way that doesn’t disrupt the roadmap of the traditional native development teams, so they are stuck reinventing the wheel by extending stock Web View controls such as WKWebView.

Enter Ionic Portals, a supercharged native Web View component for iOS and Android. With Portals, you can:

- **Extend native apps with web content.** Portals enables users to add web-based features and experiences to an existing native mobile app.
- **Access native features via the Capacitor bridge.** Safely and securely access features like camera, geolocation, haptics, and more — all from the WebView, to deliver truly native mobile experiences using the web.
- **Safely control access to native features and data.** Native development teams get granular control over which parts of the app - including specific features and data - web teams can access when collaborating on a mobile project.
- **Keep pace with platform changes and version updates.** Ionic’s solution is fully managed and updated over time. Focus on what matters most - your app.
- **Get access to enterprise-grade support and services.** Keep your project on track by working with our mobile experts to resolve any issues occurring during development or while the app is in production.

## How It Works

Ionic Portals is built on the industry leading [Capacitor](https://capacitorjs.com) Web Native app runtime. There's just a handful of steps required to embed web experiences into your native apps:

- Drop the Portals iOS and Android libraries [into your app](/docs/portals/getting-started/guide).

- Choose the web experiences you want to integrate with. Open a Portal within an [iOS](/docs/portals/getting-started/iOS) or [Android](/docs/portals/getting-started/android) native app to embed/expose web app.

- Set granular permissions that designate which parts of the native app your web teams can touch.

- Choose from [pre-built native plugins](/docs/portals/how-to/using-a-capacitor-plugin) to unlock the full power of the native mobile device in your web-based experiences. 

- Build and ship! 🚀

## Reference Apps

While implementing Ionic Portals, refer to various reference apps including an [E-commerce demo application](/docs/portals/examples/ecommerce-app) for Android and iOS that uses both native layouts and web-based portals. The Android application uses Fragments while the iOS application uses Storyboard/ViewController based views.
