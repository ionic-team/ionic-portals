---
title: E-commerce App
sidebar_label: E-commerce App
---

## Overview

The Ionic Team has put together an E-commerce demo application for Android and iOS that uses both native layouts and web-based Portals. The Android application uses Fragments while the iOS application uses Storyboard/ViewController based views.

Below is a list of which portions of the app are native and which portions of the app are portals.

Native Screens

- List of Products Page
- Individual Product Page
- Cart Page

Web Screens

- Checkout Page
- Help Page
- User Details Page

![Example banner](/img/ecommerce-storyboard.svg)

The source is [available on GitHub](https://github.com/ionic-team/portals-ecommerce-demo/) and includes the iOS, Android, and Web projects.

## Android Highlights

### Native

The Android application is built around a single Activity class with different Fragments for each page. A [ViewPager](https://developer.android.com/training/animation/screen-slide-2) is used as the main way to navigate between the three main different sections of the application: the Products page, Cart page, and the User Details page. We chose to use a ViewPager because it allowed us to load the User Details fragment immediately when the application loads, despite it being out of view from the user. When navigating to the User Details page by tapping the tab, the web application in the Portal is already loaded and ready to use.

### Cart Portal

The shopping cart web application is displayed in a Portal set inside of a [DialogFragment](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/android/PortalsEcommerce/app/src/main/java/io/ionic/demo/ecommerce/ui/cart/CheckoutDialogFragment.java), demonstrating Portals use in a modal view.

### Help Portal

For the Help page we used a Portal by adding a [PortalView](../reference/android/portal-view) directly to the view layout for the containing Fragment. See our [tutorial here](../tutorials/android/create-view-via-xml) on using Portals directly in an XML layout. To disguise the momentary flicker while the Portal loaded the web application for the Help page, we experimented with overriding the `PortalFragment` class and made [FadePortalFragment](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/android/PortalsEcommerce/app/src/main/java/io/ionic/demo/ecommerce/portals/FadePortalFragment.java). This adds a gentle fade as the Portal loads.

:::tip
Custom classes extending `PortalFragment` can be used directly in XML layouts if specified when created using the `PortalManager`. See the [PortalBuilder.setPortalFragmentType()](../reference/android/portal-builder#setportalfragmenttype) method for more information.
:::

### User Details Portal

The Portal that displays the User Details web application is added via code in the [PageAdapter](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/android/PortalsEcommerce/app/src/main/java/io/ionic/demo/ecommerce/PageAdapter.java) used by the ViewPager in `MainActivity`. We overrode the `PortalFragment` class to create [ProfileFragment](https://github.com/ionic-team/portals-ecommerce-demo/blob/main/android/PortalsEcommerce/app/src/main/java/io/ionic/demo/ecommerce/ui/profile/ProfileFragment.java), a thin wrapper class that fetches the "profile" Portal it uses.

## iOS Highlights

### Native

The iOS application uses ViewControllers for each page in the app. The main navigation is built using Storyboard with a [UITabBarController](https://developer.apple.com/documentation/uikit/uitabbarcontroller) to navigate between the three main different sections of the application: the Products page, Cart page, and the User Details page.

### Cart Portal

The Portal used to present the shopping cart web application is displayed as an overlay with the [PageSheet](https://developer.apple.com/documentation/uikit/uimodalpresentationstyle/pagesheet) style, demonstrating Portals use in a modal view.

### Help and User Details Portal

The Help and User Details pages display the portal in a ViewController. These are implemented the same way, however the User Details page is displayed as the third tab in the main application navigation Storyboard.
