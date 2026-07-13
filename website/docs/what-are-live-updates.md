---
title: What are Live Updates?
sidebar_label: What are Live Updates?
---

Ionic Appflow's Live Update feature makes it easy to deploy app updates in real time without going through a traditional app store submission process for the vast majority of business logic, UI, and style changes.

## Portal Live Updates

With Ionic Portals you are able to use Appflow Live Update for each of your Portals. This allows for Portals to update independent of each other.

Portal Live Updates allow teams to work independently on their own release cycles. Typical collaboration in native apps requires all teams involved to deploy updates on the same native release schedule.

With Live Updates each Portal can be updated independent of the rest of the code in the application. This allows teams to iterate quickly and fix critical issues by pushing updates directly to your users, when you're ready, for immediate impact.

Because Portals are web applications built from JavaScript, HTML, CSS, images, and other web files changes to this code can be sent directly to users and testers without submitting a new native update. This process is fully compliant with Apple and Android requirements.

## Live Update Providers

On iOS and Android, a Portal's live update source is no longer limited to Appflow. A **Live Update Provider** lets a Portal instead sync its web assets from any external update service, by implementing a small provider contract from that platform's SDK. This is useful if your organization already has its own update delivery infrastructure and doesn't want to rely on Appflow.

See [Using a Live Update Provider on iOS](./for-ios/live-update-provider.md) and [Using a Live Update Provider on Android](./for-android/live-update-provider.md) for details.
