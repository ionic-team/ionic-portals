---
title: Web Vitals
sidebar_label: Web Vitals
---

## Android

Portals for Android supports three [Web Vitals](https://web.dev/vitals/) metrics you can use to measure the performance of your web app. These are the First Contentful Paint (FCP), Time to First Byte (TTFB), and First Input Delay (FID).

To measure these metrics of a Portal, pass a function to take the `WebVitals` metric and speed and report it the way you wish:

```java
public static PortalFragment newInstance() {
    return new PortalFragment(PortalManager.getPortal("profile"), (metric, speed) -> {
        Log.d("VITALS", "Profile Portal = " + metric.name() + ": " + speed + "ms");
        return null;
    });
}
```

## iOS

On iOS, the only [Web Vitals](https://web.dev/vitals/) metric that is available to measure is First Contentful Paint (FCP). To measure the FCP of
a Portal, create a `WebPerformanceReporter` and pass it to the Portals initializer:

```swift

let portal = Portal(
    name: "foo",
    performanceReporter: WebPerformanceReporter { (portalName: String, fcp: Double) in
        print("\(portalName) FCP - \(fcp) ms")
    }
)

```

## React Native

Portals for React Native provides functions to register callbacks for First Contentful Paint (FCP), Time to First Byte (TTFB), and First Input Delay (FID). When running on iOS, TTFB and FID will never be called due to limitations of the platform.

```typescript
import { onFirstContentfulPaint, onFirstInputDelay, onTimeToFirstByte, registerWebVitals } from '@ionic/portals-react-native'

// You can register each individually by providing the Portal name and a callback.
onFirstContentfulPaint('foo', duration => console.log('foo FCP:', duration));
onFirstInputDelay('foo', duration => console.log('foo FID:', duration));
onTimeToFirstByte('foo', duration => console.log('foo TTFB:', duration));

// Or register all in a single call by providing the portal name and callbacks for each of the metrics
registerWebVitals(
  'foo',
  duration => console.log('foo FCP:', duration),
  duration => console.log('foo FID:', duration),
  duration => console.log('foo TTFB:', duration)
);
```
