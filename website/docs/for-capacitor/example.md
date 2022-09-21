---
title: E-commerce Example App
sidebar_label: E-commerce Example App
---

## Overview​

The Ionic Team has put together an E-commerce demo application for Capacitor that uses multiple web-based Portals. This is meant to help gain an understanding of how Portals for Capacitor can be used in conjunction with Module Federation. The example is built in React. Although this example is a mono-repo it is not a requirement on Portals for Capacitor applications.

The app contains one primary application that is named `shell`. This application is responsible for displaying when the app first starts. It is also the application that contains all of the required Capacitor plugins.

### Micro Frontend structure

The application is broken down into micro frontends in this way.

**shell**

- List of Products Page
- Individual Product Page
- Cart Page

**account**

- User Profile Page

**checkout**

- Checkout Page

**helpinfo**

- Help Page Content

The source is [available on GitHub](https://github.com/ionic-team/capacitor-portals-ecommerce) and including the primary shell application and the micro frontends.
