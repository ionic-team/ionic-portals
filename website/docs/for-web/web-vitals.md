---
title: Web Vitals
sidebar_label: Web Vitals
---

## Android

Portals for Android supports three [Web Vitals](https://web.dev/vitals/) metrics you can use to measure the performance of your web app. These are the First Contentful Paint (FCP), Time to First Byte (TTFB), and First Input Delay (FID).

To measure these metrics of a Portal, create an instance of `WebVitals` and add it to the portal:

```java

WebVitals webVitalsPlugin = new WebVitals((portalName, metric, duration) -> {
    Log.d("VITALS", portalName + " Portal = " + metric.name() + ": " + speed + "ms");
    return null;
})

Portal portal = new PortalBuilder("profile")
    .addPluginInstance(webVitalsPlugin)
```

## iOS

On iOS, the only [Web Vitals](https://web.dev/vitals/) metric that is available to measure is First Contentful Paint (FCP). To measure the FCP of
a Portal, add the WebVitals plugin to the Portal.

```swift
let webVitals = WebVitalsPlugin { portalName, duration in 
  print("\(portalName) portal = FCP: \(duration) ms")
}

let portal = Portal(
    name: "profile",
    plugins: [.instance(webVitals)]
)
```

## React Native

Portals for React Native provides functions to register callbacks for First Contentful Paint (FCP), Time to First Byte (TTFB), and First Input Delay (FID). When running on iOS, TTFB and FID will never be called due to limitations of the platform.

```typescript
import { onFirstContentfulPaint, onFirstInputDelay, onTimeToFirstByte, registerWebVitals } from '@ionic/portals-react-native'

// You can register each individually by providing the Portal name and a callback.
onFirstContentfulPaint('profile', duration => console.log('profile FCP:', duration));
onFirstInputDelay('profile', duration => console.log('profile FID:', duration));
onTimeToFirstByte('profile', duration => console.log('profile TTFB:', duration));

// Or register all in a single call by providing the portal name and callbacks for each of the metrics
registerWebVitals(
  'profile',
  duration => console.log('profile FCP:', duration),
  duration => console.log('profile FID:', duration),
  duration => console.log('profile TTFB:', duration)
);
```
