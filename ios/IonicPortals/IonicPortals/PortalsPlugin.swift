import Foundation
import Capacitor

@objc(PortalsPlugin)
public class PortalsPlugin: CAPPlugin {
    
    private static var subscriptions: [String: [Int : (_ result: SubscriptionResult) -> ()]] = [:]
    private static var subscriptionRef = 0
    
    // MARK: Methods used by Cap Plugin

    @objc func publishNative(_ call: CAPPluginCall) {
        guard let topic = call.getString("topic") else {
            call.reject("topic not provided")
            return
        }
        let data = call.getAny("data")
        PortalsPlugin.publish(topic, data!)
        call.resolve()
    }
    
    @objc func subscribeNative(_ call: CAPPluginCall) {
        guard let topic = call.getString("topic") else {
            call.reject("topic not provided")
            return
        }
        call.keepAlive = true
        let ref = PortalsPlugin.subscribe(topic, {result in
            call.resolve(result.toMap())
        })
        call.resolve([
            "topic": topic,
            "subscriptionRef": ref
        ])
    }
    
    @objc func unsubscribeNative(_ call: CAPPluginCall) {
        guard let topic = call.getString("topic") else {
            call.reject("topic not provided")
            return
        }
        guard let subscriptionRef = call.getInt("subscriptionRef") else {
            call.reject("subscriptionRef not provided")
            return
        }
        PortalsPlugin.unsubscribe(topic, subscriptionRef)
        call.resolve()
    }
    
    // MARK: Static methods for use by Swift app
    
    public static func subscribe(_ topic: String, _ callback: @escaping (_ result: SubscriptionResult) -> ()) -> Int {
        PortalsPlugin.subscriptionRef += 1
        if var subscription = PortalsPlugin.subscriptions[topic] {
            subscription[PortalsPlugin.subscriptionRef] = callback
            PortalsPlugin.subscriptions[topic] = subscription
        } else {
            let subscription = [PortalsPlugin.subscriptionRef : callback]
            PortalsPlugin.subscriptions[topic] = subscription
        }
        return PortalsPlugin.subscriptionRef
    }
    
    public static func publish(_ topic: String, _ data: Any) {
        if let subscription = PortalsPlugin.subscriptions[topic] {
            for(ref, listener) in subscription {
                let result = SubscriptionResult(topic: topic, data: data, subscriptionRef: ref)
                listener(result)
            }
        }
    }
    
    public static func unsubscribe(_ topic: String, _ subscriptionRef: Int) {
        if var subscription = PortalsPlugin.subscriptions[topic] {
            subscription.removeValue(forKey: subscriptionRef)
            PortalsPlugin.subscriptions[topic] = subscription
        }
    }
            
}

public struct SubscriptionResult {
    public var topic: String
    public var data: Any
    public var subscriptionRef: Int
    
    func toMap() -> [String: Any] {
        return [
            "topic": self.topic,
            "data": self.data,
            "subscriptionRef": self.subscriptionRef
        ]
    }
}

