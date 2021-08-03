import Foundation
import WebKit
import UIKit
import Capacitor

open class PortalWebView: UIView {
    
    var webView: InternalCapWebView?
//    var webView: WKWebView
    var portal: Portal?
    
    var bridge: CAPBridgeProtocol?
    
    required public init?(coder: NSCoder) {
//        webView = WKWebView(frame: .zero)
//        webView = InternalCapWebView(frame: .zero)
//        bridge = webView!.bridge!
        super.init(coder: coder)
        
    }

//    override public init(frame: CGRect) {
////        webView = WKWebView(frame: frame)
//        webView = InternalCapWebView(frame: frame)
//        bridge = webView!.bridge!
//        super.init(frame: frame)
//        initView()
//    }
    
    public init(frame: CGRect, portalName: String) throws {
        portal = try PortalManager.shared.getPortal(portalName)

//        webView = WKWebView(frame: frame)
        webView = InternalCapWebView(frame: frame, portal: portal!)
        bridge = webView!.bridge!
        super.init(frame: frame)
        self.portalName = portalName
        initView()
    }
    
    var portalName: String?
    
    func initView () {
        
//
       
        
        
        

//        let path = Bundle.main.url(forResource: "portals/shopwebapp/index", withExtension: "html")!
//        webView.loadFileURL(path, allowingReadAccessTo: path)
        
        
//        webView!.load(request)
//        view = webView
        addSubview(webView!)
        
        // load the configuration and set the logging flag
//        let configDescriptor = instanceDescriptor()
//        let configuration = InstanceConfiguration(with: configDescriptor, isDebug: CapacitorBridge.isDevEnvironment)
//        CAPLog.enableLogging = configuration.loggingEnabled
//        logWarnings(for: configDescriptor)
//
//        if configDescriptor.instanceType == .fixed {
//            updateBinaryVersion()
//        }
//
//        setStatusBarDefaults()
//        setScreenOrientationDefaults()
//
//        // get the web view
//        let assetHandler = WebViewAssetHandler()
//        assetHandler.setAssetPath(configuration.appLocation.path)
//        let delegationHandler = WebViewDelegationHandler()
//        prepareWebView(with: configuration, assetHandler: assetHandler, delegationHandler: delegationHandler)
//        view = webView
//        // create the bridge
//        capacitorBridge = CapacitorBridge(with: configuration,
//                                          delegate: self,
//                                          cordovaConfiguration: configDescriptor.cordovaConfiguration,
//                                          assetHandler: assetHandler,
//                                          delegationHandler: delegationHandler)
//        capacitorDidLoad()
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



