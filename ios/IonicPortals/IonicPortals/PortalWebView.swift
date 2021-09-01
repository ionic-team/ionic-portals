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

        webView = InternalCapWebView(frame: frame, portal: portal)
        bridge = webView!.bridge!
        super.init(frame: frame)
        self.portalName = portal.name
        initView()
    }
    
    var portalName: String?
    
    func initView () {
        addSubview(webView!)
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





