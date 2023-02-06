---
title: Web Vitals
sidebar_label: Web Vitals
---

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
