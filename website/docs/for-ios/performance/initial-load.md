---
title: Initial Load Performance
sidebar_label: Initial Load Performance
---

A fast initial page load is crucial for providing a positive user experience when embedding web content using Portals.
When content is loaded quickly, the web application feels part of the overall experience instead of being bolted on.
Web applications embedded in Portals should optimize for a fast initial render to keep in line with the goal of feeling seamless.

A web application should _never_ block an initial render while waiting for a network request to complete. This will severely impact perceived performance and degrades the overall user experience. Here are two possible approaches to take to avoid blocking the web render:
* Have the initial data required passed in as [initialContext](../../portals-plugin#initialcontext) from the native side.
* Provide visual feedback to the user that the application is in a loading state. A popular approach is to use [skeleton screens](https://blog.hubspot.com/website/skeleton-screens) to provide the overall structure of the application.

