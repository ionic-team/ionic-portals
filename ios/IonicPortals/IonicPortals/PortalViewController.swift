//
//  Portal.swift
//  Ecommerce
//
//  Created by Ely Lucas on 7/14/21.
//

import Foundation
import Capacitor

public class PortalViewController: CAPBridgeViewController {
    
    private var portal: Portal!
    
    var name: String!
    
    init(_ name: String) {
        self.name = name
        super.init(nibName: nil, bundle: nil)
    }
       
    //todo: does this not let it run in storyboards?
    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("This class does not support NSCoder")
    }
    
    public override func instanceDescriptor() -> InstanceDescriptor {
        do {
            try portal = PortalManager.shared.getPortal(self.name)
        } catch {
            // Fallback to original CAPBridgeViewController if portal isn't found
            return super.instanceDescriptor()
        }

        let path = Bundle.main.url(forResource: portal?.startDir, withExtension: nil)!
        let descriptor = InstanceDescriptor(at: path, configuration: nil, cordovaConfiguration: nil)
        return descriptor
    }
    
//    public override func loadView() {
//        super.loadView()
////        portal = PortalManager.getPortal(name)
////        capBridgeViewController = HostedCapBridgeViewController(portal)
////        capBridgeViewController.portal = portal
////        self.view = capBridgeViewController.view
//    }
    
}

