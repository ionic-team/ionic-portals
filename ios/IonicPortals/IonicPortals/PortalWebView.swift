import Foundation
import WebKit
import UIKit
import Capacitor

public class PortalWebView: UIView {
    
    var webView: InternalCapWebView?
    var portal: Portal?
    public var bridge: CAPBridgeProtocol?
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    public init(frame: CGRect, portal: Portal) {
        super.init(frame: frame)
        self.portal = portal
        initView()
    }
    
    
    func initView () {
        if PortalManager.isRegistered() {
            webView = InternalCapWebView(frame: self.frame, portal: portal!)
            bridge = webView!.bridge!
            addSubview(webView!)
        } else {
            let bundle = Bundle(for: UnregisteredView.classForCoder())
            let nib = UINib(nibName: "UnregisteredView", bundle: bundle)
            let view = nib.instantiate(withOwner: self, options: nil).first as! UIView
            view.frame = self.frame
            addSubview(view)
        }
    }
    
    class InternalCapWebView: CAPWebView {
        var portal: Portal!

        init(frame: CGRect, portal: Portal) {
            self.portal = portal
            super.init(frame: frame)
        }
        
        required init?(coder: NSCoder) {
            fatalError("init(coder:) has not been implemented")
        }
        
        override func instanceDescriptor() -> InstanceDescriptor {
            let path = Bundle.main.url(forResource: self.portal.startDir, withExtension: nil)!
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





