import Foundation
import WebKit
import UIKit
import Capacitor

open class PortalWebView: UIView {
    
    var webView: InternalCapWebView?
    var portal: Portal?
    
    var bridge: CAPBridgeProtocol?
    
    required public init?(coder: NSCoder) {
        super.init(coder: coder)
        
    }
    
    public init(frame: CGRect, portalName: String) throws {
        portal = try PortalManager.shared.getPortal(portalName)
        webView = InternalCapWebView(frame: frame, portal: portal!)
        bridge = webView!.bridge!
        super.init(frame: frame)
        self.portalName = portalName
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
    }
    
}



