import Foundation
import WebKit
import UIKit
import Capacitor
import IonicLiveUpdates

@objc(PortalWebView)
public class PortalWebView: UIView {
    
    var webView: InternalCapWebView?
    var portal: Portal?
    var liveUpdatePath: URL? = nil
    @objc public var bridge: CAPBridgeProtocol?
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    @objc public init(frame: CGRect, portal: Portal) {
        super.init(frame: frame)
        self.portal = portal
        initView()
    }
    
    func initView () {
        if PortalManager.isRegistered() {
            guard let portal = portal else { return }

            if let liveUpdateConfig = portal.liveUpdateConfig {
                self.liveUpdatePath = LiveUpdateManager.getLatestAppDirectory(liveUpdateConfig.getAppId())
            }
            webView = InternalCapWebView(frame: self.frame, portal: portal, liveUpdatePath: self.liveUpdatePath)
            
            guard let bridge = webView?.bridge else { return }
            self.bridge = bridge
            
            addSubview(webView!)
        } else {
            let bundle = Bundle(for: UnregisteredView.classForCoder())
            let nib = UINib(nibName: "UnregisteredView", bundle: bundle)
            let view = nib.instantiate(withOwner: self, options: nil).first as! UIView
            view.frame = self.frame
            addSubview(view)
        }
    }
    
    @objc public func reload() {
        guard let portal = portal else { return }
        guard let bridge = bridge else { return }
        guard let liveUpdate = portal.liveUpdateConfig else { return }
        guard let capViewController = bridge.viewController as? CAPBridgeViewController else { return }
        guard let latestAppPath = LiveUpdateManager.getLatestAppDirectory(liveUpdate.getAppId()) else { return }

        if (liveUpdatePath == nil || liveUpdatePath?.path != latestAppPath.path) {
            liveUpdatePath = latestAppPath
            capViewController.setServerBasePath(path: liveUpdatePath!.path)
            return
        }

        // Reload the bridge to the existing start url
        bridge.webView?.reload()
    }
    
    class InternalCapWebView: CAPWebView {
        var portal: Portal!
        var liveUpdatePath: URL? = nil

        init(frame: CGRect, portal: Portal, liveUpdatePath: URL?) {
            self.portal = portal
            self.liveUpdatePath = liveUpdatePath
            super.init(frame: frame)
        }
        
        required init?(coder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }
        
        override func instanceDescriptor() -> InstanceDescriptor {
            let path = self.liveUpdatePath ?? Bundle.main.url(forResource: self.portal.startDir, withExtension: nil)!
            let descriptor = InstanceDescriptor(at: path, configuration: nil, cordovaConfiguration: nil)
            return descriptor
        }
        
        override func loadInitialContext(_ userContentViewController: WKUserContentController) throws {
    
            if(self.portal.initialContext != nil) {
                let jsonData = try JSONSerialization.data(withJSONObject: self.portal.initialContext ?? "")
                let jsonString = String(data: jsonData, encoding: .ascii) ?? ""
                let portalInitialContext = "{ \"name\": \"\(portal.name)\",                                          \"value\": \(jsonString) }"
                let scriptSource = "window.portalInitialContext = " + portalInitialContext
                let userScript = WKUserScript(source: scriptSource, injectionTime: .atDocumentStart, forMainFrameOnly: true)
                userContentViewController.addUserScript(userScript)
            }            
        }
    }
    
}





