---
title: Overview
sidebar_label: Overview
---

# Overview

Although most of the API surface area of Portals is Native most of the code written for Portals is within web experiences. So it is important to ensure that web developers understand what APIs are available to them and what considerations need to be taken when building web experiences for use in Portals.

## Portals Plugin

The most commonly used Portals API for web applications will be the Portals Plugin that is provided out of the box. This plugin is used for simple communication between the web application and the native application through the Portal. This includes InitialContext and PubSub.

- [Portals Web Plugin](./portals-plugin.md)

## Performance

One of the most important considerations is understanding how a web application should be built to allow for it to be used within a Portal. Although most web applications are hosted by servers it is different for Portals. The web application files are local to device. This empowers Portals to remove the network latency from the rendering experience and reduce the overall time to load.

This also means that the measurement values that you might use for web page rendering don't apply in the same way for Portals applications. A first contentful paint (FCP) of 1.8 seconds or less on a web page might be considered good, but when transitioning between a native page and a Portal 1.8 seconds could feel like a very long time.

With this in mind we have provided a few tools to help developers identify the time it takes to load content and with how to profile web experiences within a Portal.

- [Web Vitals](./web-vitals.md)
- [Profiling for iOS](./ios-profiling.md)
- [Profiling for Android](./android-profiling.md)
