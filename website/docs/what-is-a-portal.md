---
title: What Is A Portal?
sidebar_label: What Is A Portal?
---

A "Portal" is a mobile view for iOS and Android projects capable of displaying and running a web based application; similar to the system webview. It uses [Capacitor](https://capacitorjs.com) as a bridge between the native code and the web code to allow for cross-communication between the two layers. Because Ionic Portals uses Capacitor under the hood, you are able to use any existing [Capacitor Plugins](https://capacitorjs.com/docs/plugins) and even most [Cordova Plugins](https://capacitorjs.com/docs/plugins/cordova) while continuing to use your existing native workflow.

## How Does It Work?

Ionic Portals uses [Capacitor](https://capacitorjs.com) as a bridge between the native code and the web code. This means that there is a production ready, battle tested solution for connecting these two codebases. The Ionic Portals library then provides tooling and functionality around Capacitor to easily embed Capacitor instances, known as "Portals," into your application. Each web application is sandboxed and has a separate connection to the native app. The native code will remain as the "source of truth" for your data as well as allowing your project to continue to use native layouts/views first and foremost.

## When Should I Use a Portal?

If your company has a complex web experience that they'd like to embed into an existing native application, then Ionic Portals is probably an excellent fit. Portals are, at their best, web experiences that should remain consistent on both Android and iOS applications. Ionic Portals allows you to quickly and safely embed those experiences in an Android or iOS application without massively impacting native developers workflows while also allowing web developers to test their code without needing a mobile device. This asynchronous workflow allows neither team to block each other's work until the time comes to glue it all together with Portals.

## What Is Ionic Portals Not?

While Ionic Portals may seem like a silver bullet to completely replace the existing system webview, that isn't the case.

#### Ionic Portals Is Not Drop-in Replacement for the System Webview

While we do use the system webview in Ionic Portals, it is not a drop-in replacement. Think of it as a webview with a more robust API for communication between native and web layers. Ionic Portals provides access to the webview itself, but handles all of the heavy lifting for you.

#### Ionic Portals Is Not a Different Browser Engine

Ionic Portals leverages the existing browser engine on iOS and Android devices. On Android, Ionic Portals uses Chromium and on iOS, it uses Mobile Safari. This means developers don't need to break their existing workflow in order to test/run Portals before deploying them to a mobile device.

#### Ionic Portals Is Not Framework/Toolkit for Building Entire Applications Using Web Code Only

Ionic Portals is used to embed web experiences in native codebases on Android and iOS. If you want to use HTML, CSS, and Javascript for an entire mobile application, try out [Capacitor](https://capacitorjs.com/docs/getting-started).
