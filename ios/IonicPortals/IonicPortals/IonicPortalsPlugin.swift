import Foundation
import Capacitor

@objc(IonicPortalsPlugin)
public class IonicPortalsPlugin: CAPPlugin {
    
    private static var subscriptions: [String: [Int : (_ data: Any) -> ()]] = [:]
    private static var subscriptionRef = 0
    
    // MARK: Methods used by Cap Plugin

    @objc func publishNative(_ call: CAPPluginCall) {
        guard let topic = call.getString("topic") else {
            call.reject("topic not provided")
            return
        }
        let data = call.getObject("data")
        IonicPortalsPlugin.publish(topic, data!)
        call.resolve()
    }
    
    @objc func subscribeNative(_ call: CAPPluginCall) {
        guard let topic = call.getString("topic") else {
            call.reject("topic not provided")
            return
        }
        call.keepAlive = true
        let ref = IonicPortalsPlugin.subscribe(topic, {result in
            call.resolve(result as! PluginCallResultData)
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
        IonicPortalsPlugin.unsubscribe(topic, subscriptionRef)
        call.resolve()
    }
    
    // MARK: Static methods for use by Swift app
    
    public static func subscribe(_ topic: String, _ callback: @escaping (_ data: Any) -> ()) -> Int {
        IonicPortalsPlugin.subscriptionRef += 1
        if var subscription = IonicPortalsPlugin.subscriptions[topic] {
            subscription[IonicPortalsPlugin.subscriptionRef] = callback
            IonicPortalsPlugin.subscriptions[topic] = subscription
        } else {
            let subscription = [IonicPortalsPlugin.subscriptionRef : callback]
            IonicPortalsPlugin.subscriptions[topic] = subscription
        }
        return IonicPortalsPlugin.subscriptionRef
    }
    
    public static func publish(_ topic: String, _ data: [String : Any]) {
        if let subscription = IonicPortalsPlugin.subscriptions[topic] {
            for(ref, listener) in subscription {
                let result = [
                    "topic": topic,
                    "subscriptionRef": ref,
                    "data": data
                ] as [String : Any]
                listener(result)
            }
        }
    }
    
    public static func unsubscribe(_ topic: String, _ subscriptionRef: Int) {
        if var subscription = IonicPortalsPlugin.subscriptions[topic] {
            subscription.removeValue(forKey: subscriptionRef)
            IonicPortalsPlugin.subscriptions[topic] = subscription
        }
    }
    
    public static func removeMessageListener(_ messageName: String) {
        IonicPortalsPlugin.subscriptions.removeValue(forKey: messageName)
    }
        
}

