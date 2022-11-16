---
title: How To Use The PortalsPlugin
sidebar_label: Use the PortalsPlugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### Android and iOS

Follow the [Getting Started Guide](../guide) to install the Ionic Portals library into your native mobile projects. The `PortalsPlugin` is automatically added to every instance of a Portal.

### Web

Install the [Ionic Portals](https://www.npmjs.com/package/@ionic/portals) package from NPM into your web application.

```bash
npm install @ionic/portals
```

## Initial Context

The Initial Context mechanism allows you to pass data to your web application from native so that it is available for when the web application initially loads.

### Setting Initial Context

#### iOS

Initial context can be set during initialization:

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift' },
{ label: 'Objective-C', value: 'objc' },
]}>
<TabItem value="swift">

```swift
let portal = Portal(
    name: "maps",
    startDir: "web",
    initialContext: ["ic_example": "hello world"]
)
```

</TabItem>
<TabItem value="objc">

```objectivec
IONPortal *portal = [[IONPortal alloc] initWithName:@"maps" startDir:@"web" initialContext:@{ @"ic_example": @"hello world" }];
```

</TabItem>
</Tabs>

Or after:

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift' },
{ label: 'Objective-C', value: 'objc' },
]}>
<TabItem value="swift">

```swift
var portal = Portal(name: "maps", startDir: "web")
portal.initialContext = ["ic_example": "hello world"]
```

</TabItem>
<TabItem value="objc">

```objectivec
IONPortal *portal = [[IONPortal alloc] initWithName:@"maps" startDir:@"web" initialContext:nil];
portal.initialContext = @{ @"ic_example": @"hello world" };
```

</TabItem>
</Tabs>

### Using Initial Context

To access the initial context set from the native application in your web application, import `getInitialContext` from `@ionic/portals` use the [getInitialContext()](../../portals-plugin#getinitialcontext) function.

```typescript
import { getInitialContext } from "@ionic/portals";

const initialContext = getInitialContext<{ ic_example: string }>();
// prints "hello world" in this example
console.log(initialContext?.value?.ic_example);
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect. [Check out our how-to guide](./multiple-portals-single-web-app).

## Communicating via Pub/Sub

The Publish and Subscribe mechanism (pub/sub) built into the `PortalsPlugin` allows you to send data between your web and native applications through a Portal.

### Defining Subscribers

Subscribers listen for messages sent to a certain topic. They can be defined in your web application to listen for messages published from native, and vice versa.

To listen for a message published from the native side of a Portal, define a subscriber in your web application.

```typescript
const portalSubscription = await Portals.subscribe({ topic }, (result) => {
  console.log(JSON.stringify(result));
});
```

To listen for messages published from the web side of a Portal, define a subscriber in your native application.

#### iOS

<Tabs
defaultValue="swift-combine"
values={[
{ label: 'Swift (Combine)', value: 'swift-combine' },
{ label: 'Swift (async/await)', value: 'swift-async-await' },
{ label: 'Swift (vanilla)', value: 'swift-vanilla', },
{ label: 'Objective-C', value: 'objc' },
]}>
<TabItem value="swift-combine">

```swift title="MyViewController.swift"
import UIKit
import IonicPortals

class MyViewController: UIViewController {
    var dismissCancellable: AnyCancellable?

    override func viewDidLoad() {
        dismissCancellable = PortalsPubSub.publisher(for: "dismiss")
            .data(as: String.self)
            .filter { $0 == "cancel" || $0 == "success" }
            .receive(on: DispatchQueue.main)
            .sink { _ in self.dismiss(animated: true, completion: nil) }

        super.viewDidLoad()
    }
}
```

```swift title=ContentView.swift
import SwiftUI
import IonicPortals

struct CartView: View {
    @State private var shouldDisplayCheckout = false

    var body: some View {
        VStack {
            // Cart contents
            Button("Checkout") {
                shouldDisplayCheckout = true
            }
        }
        .sheet(isPresented: $shouldDisplayCheckout) {
            PortalView(portal "checkout")
        }
        .onReceive(
            PortalsPubSub.publisher(for: "dismiss")
                .data(as: String.self)
                .filter { $0 == "cancel" || $0 == "success" }
        ) { _ in
            shouldDisplayCheckout = false
        }
    }
```

</TabItem>

<TabItem value="swift-async-await">

```swift title=MyViewController.swift
import UIKit
import IonicPortals

class MyViewController: UIViewController {
    var task: Task?

    override func viewDidLoad() {
        task = Task {
            let _ = await PortalsPubSub.subscribe("dismiss")
                .flatMap { $0.data as? String }
                .filter { $0 == "cancel" || $0 == "success" }
                .first

            dismiss(animated: true, completion: nil)
        }
    }

    deinit {
        task?.cancel()
    }
}
```

```swift title=CartView.swift
import SwiftUI
import IonicPortals

struct CartView: View {
    @State private var shouldShowModal = false

    var body: some View {
        VStack {
            Button("Checkout") {
                shouldShowModal = true
            }
        }
        .sheet(isPresented: $shouldShowModal) {
            PortalView(portal: "checkout")
        }
        .task {
            let eventStream = PortalsPubSub.subscribe(to: "dismiss")
                .compactMap { $0.data as? String }

            for await event in eventStream
            where event == "cancel" || event == "success" {
                shouldDisplayCheckout = false
            }
        }
    }
}
```

</TabItem>

<TabItem value="swift-vanilla">

```swift title="MyViewController.swift"
import UIKit

class MyViewController: UIViewController {
    var subscriptionReference: Int?

    override func viewDidLoad() {
        subscriptionReference = PortalsPubSub
            .subscribe("dismiss") { [weak self] result in
                guard
                    let message = result.data as? String,
                    message == "cancel" || message == "sucess"
                else { return }

                self?.dismiss(animated: true, completion: nil)
            }

        super.viewDidLoad()
    }

    deinit {
        // Required to prevent closure to continue firing
        PortalsPubSub.unsubscribe(from: "dismiss", subscriptionRef: subscriptionReference)
    }
}
```

There is also an overload that returns an `AnyCancellable` so that manually calling `PortalsPubSub.unsubscribe(from:subscriptionRef:)` is not needed:

```swift title="MyViewController.swift"
import UIKit
import Combine // import only needed for AnyCancellable visibility
class MyViewController: UIViewController {
    var dismissCancellable: AnyCancellable?

    override func viewDidLoad() {
        dismissCancellable = PortalsPubSub
            .subscribe(to: "dismiss") { [weak self] result in
                guard
                    let message = result.data as? String,
                    message == "cancel" || message == "sucess"
                else { return }

                self?.dismiss(animated: true, completion: nil)
            }

        super.viewDidLoad()
    }
}
```

</TabItem>

<TabItem value="objc">

```objectivec title="MyViewController.m"
@interface MyViewController ()
@property NSInteger subRef;
@end

@implementation MyViewController

- (void)viewDidLoad {
    self.subRef = [IONPortalsPubSub subscribeToTopic:@"dismiss" callback:^(NSDictionary<NSString *,id> * _Nonnull result) {
        NSString *message = result[@"data"];
        if (message != nil && ([message isEqualToString:@"success"] || [message isEqualToString:@"cancel"])) {
            [self dismissViewControllerAnimated:YES completion:nil];
        }
    }];

    [super viewDidLoad];
}

- (void)dealloc {
    [IONPortalsPubSub unsubscribeFromTopic:@"dismiss" subscriptionRef:self.subRef];
}

@end
```

</TabItem>

</Tabs>

### Publishing Messages

Publish messages to send data through a Portal to registered Subscribers.

#### From Web to iOS/Android

To send a message from your web application to iOS or Android, use the [Portals.publish()](../../portals-plugin#publish) function.

```typescript
Portals.publish({ topic: "dismiss", data: "success" });
```

#### From iOS to Web

To send messages from your native application to the web application, use the `PortalsPubSub.publish()` method.

<Tabs
defaultValue="swift"
values={[
{ label: 'Swift', value: 'swift', },
{ label: 'Objective-C', value: 'objc', },
]}>
<TabItem value="swift">

```swift
PortalsPubSub.publish("sunny" to: "weather")
```

</TabItem>

<TabItem value="objc">

```objectivec
[IONPortalsPubSub publishMessage:@"sunny" toTopic:@"weather"];
```

</TabItem>

</Tabs>

## Examples

The `PortalsPlugin` is used in the [E-Commerce App](../examples/ecommerce-app) demo.
