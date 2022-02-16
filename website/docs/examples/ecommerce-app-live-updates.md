---
title: E-commerce App with Live Updates
sidebar_label: Live Updates E-commerce App
---

## Overview

The Ionic Team has enhanced the E-commerce demo application to demonstrate how to use Live Updates in an app using Portals. The Android application uses Fragments while the iOS application uses Storyboard/ViewController based views. For more information about the demo app, see our [Portals E-commerce demo page](./ecommerce-app).

Below is a list of which portions of the app are native and which portions of the app are portals.

Native Screens

- List of Products Page
- Individual Product Page
- Cart Page
- Settings Page

Web Screens

- Checkout Page
- Help Page
- User Details Page

The source is [available on GitHub](https://github.com/ionic-team/live-updates-ecommerce-demo) and includes the iOS, Android, and Web projects.

## Highlights

### Portals Apps

The demo app for Live Updates uses two separate web apps to provide content for the three Portals:

- Help Page
- User Details and Checkout Page

### Settings Page

A settings page was added to demonstrate features of the Live Updates SDK. This page allows you to view the status of any occurring updates, delete the content of any previous updates, and trigger a sync manually. The settings page also allows you to change the current channel used by Live Updates for both web apps. The app must be fully closed for the channel change to take effect for the next sync.

### Update Strategy

In both Android and iOS, the Portals are configured on initial app load time and a Live Updates sync occurs immediately. Subsequent checks are made when the native app is resumed from the background and a sync will occur if more than six hours have passed since the last sync.
