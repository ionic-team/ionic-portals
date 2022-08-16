---
title: How To Use The PortalsPlugin
sidebar_label: Use the PortalsPlugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `PortalsPlugin` provides useful features to aid in communication between your Web and Native applications. It is included in the Ionic Portals library by default and takes advantage of the Capacitor Plugin system.

## Setup

### Android and iOS

Follow the [Getting Started Guide](../getting-started/guide) to install the Ionic Portals library into your native mobile projects. The `PortalsPlugin` is automatically added to every instance of a Portal.

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
  ]}
>


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
  ]}
>


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

#### Android

Initial context data can be set in two different ways. You may want to set it when building a new Portal using `PortalManager`.

<Tabs
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>

<TabItem value="kt">

```kotlin
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(mapOf("ic_example" to "hello world"))
    .create()
```

</TabItem>

<TabItem value="java">

```java
PortalManager.newPortal("maps")
    .setStartDir("web")
    .setInitialContext(Map.of("ic_example", "hello world"))
    .create();
```

</TabItem>

</Tabs>

You can also set Initial Context data on a `Portal` object prior to the Portal loading.

<Tabs
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>

<TabItem value="kt">

```kotlin
val mapsPortal = PortalManager.getPortal("maps")
mapsPortal?.setInitialContext(mapOf("ic_example" to "hello world"))
```

</TabItem>

<TabItem value="java">

```java
Portal mapsPortal = PortalManager.getPortal("maps");
mapsPortal.setInitialContext(Map.of("ic_example", "hello world"));
```

</TabItem>

</Tabs>

#### React Native

You can provide initial context when registering a Portal:
```javascript
import { addPortal } from '@ionic/portals-react-native'; 

const portal = {
  name: 'maps',
  startDir: 'web',
  initialContext: {
    ic_example: 'hello world'
  }
}

addPortal(portal)
```

You can also override any initial context when rendering a Portal:
```javascript
import { PortalView } from '@ionic/portals-react-native';

<PortalView
  portal={{
    name: 'maps',
    initialContext: {
      ic_example: 'goodbye',
    },
  }}
/>
```

### Using Initial Context

To access the initial context from the `PortalsPlugin` class in your web application, import Portals and use the [Portals.getInitialContext()](../reference/web/portals-plugin#getinitialcontext) function.

```typescript
Portals.getInitialContext<{ ic_example: string; }>().then(context => {
    // prints "hello world" in this example
    console.log(context.value.ic_example)
})
```

Initial context is useful when using a Single Page Application (SPA) across multiple Portals in your application. The route to a specific section of the SPA can be passed in as initial context data. Your web application can then use it to load that section directly without need for a redirect. [Check out our how-to guide](./multiple-portals-single-web-app).

## Communicating via Pub/Sub

The Publish and Subscribe mechanism (pub/sub) built into the `PortalsPlugin` allows you to send data between your web and native applications through a Portal. 

### Defining Subscribers

Subscribers listen for messages sent to a certain topic. They can be defined in your web application to listen for messages published from native, and vice versa.

To listen for a message published from the native side of a Portal, define a subscriber in your web application.

```typescript
const portalSubscription = await Portals.subscribe(
      { topic }, (result) => {
        console.log(JSON.stringify(result))
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
    ]}
>

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

#### Android

<Tabs defaultValue="kt"
      values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
      ]}
>

<TabItem value="kt">

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // ...

    val portal = PortalManager.getPortal("example")
    val portalFragment = PortalFragment(portal)

    // listen on the topic "dismiss" and act on the result data.
    // This is an example to dismiss a containing native DialogFragment.
    PortalsPlugin.subscribe("dismiss") { result ->
        if (result.data == "cancel" || result.data == "success") {
            this.dismiss()
        }
    }

    // ...

    // add the PortalFragment to the example container fragment
    val fragmentManager = childFragmentManager
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment!!).commit()
}
```

</TabItem>

<TabItem value="java">

```java
@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // ...

    Portal portal = PortalManager.getPortal("example");
    PortalFragment portalFragment = new FadePortalFragment(portal);

    // listen on the topic "dismiss" and act on the result data.
    // This is an example to dismiss a containing native DialogFragment.
    PortalsPlugin.subscribe("dismiss", (subscriptionResult -> {
        if(subscriptionResult.getData().equals("cancel") 
            || subscriptionResult.getData().equals("success")) {

            this.dismiss();
        }

        return Unit.INSTANCE;
    }));

    // ...

    // add the PortalFragment to the example container fragment
    final FragmentManager fragmentManager = getChildFragmentManager();
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment).commit();
}
```

</TabItem>

</Tabs>

**Subscribe Using Annotations**

Android also provides a way to link subscribers defined as methods with annotations.

<Tabs
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
> 

<TabItem value="kt">

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // ...

    val portal = PortalManager.getPortal("example")
    val portalFragment = PortalFragment(portal)

    // register this class as having defined message subscribers
    portalFragment!!.linkMessageReceivers(this)

    // ...

    // add the PortalFragment to the example container fragment
    val fragmentManager = childFragmentManager
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment!!).commit()
}

/**
 * Define a `dismiss` method to receive messages on the "dismiss" 
 * topic and act on the message. This is an example to dismiss 
 * a containing native DialogFragment.
 */
@PortalMethod
fun dismiss(result: String?) {
    if (result != null && (result == "cancel" || result == "success")) {
        this.dismiss()
    }
}
```

</TabItem>

<TabItem value="java">

```java
@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    // ...

    Portal portal = PortalManager.getPortal("example");
    PortalFragment portalFragment = new FadePortalFragment(portal);

    // register this class as having defined message subscribers
    portalFragment.linkMessageReceivers(this);

    // ...

    // add the PortalFragment to the example container fragment
    final FragmentManager fragmentManager = getChildFragmentManager();
    fragmentManager.beginTransaction().replace(R.id.example_web_app, portalFragment).commit();
}

/**
 * Define a `dismiss` method to receive messages on the "dismiss" 
 * topic and act on the message. This is an example to dismiss 
 * a containing native DialogFragment.
 */
@PortalMethod
public void dismiss(String result) {
    if(result != null && (result.equals("cancel") || result.equals("success"))) {
        this.dismiss();
    }
}
```

</TabItem>

</Tabs>

#### React Native

Subscribe to messages from the web:
```javascript
import { subscribe } from '@ionic/portals-react-native';

let subscriptionReference = await subscribe('topic', message => {
  // Here you have access to:
  // message.data - Any data sent from the web
  // message.subscriptionRef - The subscription reference used to manage the lifecycle of the subscription
  // message.topic - The topic the message was published on
})
```

When you no longer need to receive events, unsubscribe:
```javascript
import { unsubscribe } from '@ionic/portals-react-native';

unsubscribe('channel:topic', subscriptionReference)
```

You must unsubscribe to avoid any potential memory issues.

### Publishing Messages

Publish messages to send data through a Portal to registered Subscribers.

#### From Web to iOS/Android

To send a message from your web application to iOS or Android, use the [Portals.publish()](../reference/web/portals-plugin#publish) function.

```typescript
Portals.publish({ topic: 'dismiss', data: 'success' })
```

#### From iOS to Web

To send messages from your native application to the web application, use the `PortalsPubSub.publish()` method.

<Tabs
    defaultValue="swift" 
    values={[
        { label: 'Swift', value: 'swift', },
        { label: 'Objective-C', value: 'objc', },
    ]}
>
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

#### From Android to Web

To send messages from your native application to the web application, use the `PortalsPlugin.publish()` methods.

<Tabs
    defaultValue="kt" 
    values={[
        { label: 'Kotlin', value: 'kt', },
        { label: 'Java', value: 'java', },
    ]}
>
<TabItem value="kt">

```kotlin
PortalsPlugin.publish("weather", "sunny")
```

</TabItem>

<TabItem value="java">

```java
PortalsPlugin.publish("weather", "sunny");
```

</TabItem>

</Tabs>


#### From React Native to Web

To send messages from your React Native app to the web, use the `publish` method:

```javascript
import { publish } from '@ionic/portals-react-native';

publish('weather', 'sunny')
```

## Examples

The `PortalsPlugin` is used in the [E-Commerce App](./examples/ecommerce-app) demo.
