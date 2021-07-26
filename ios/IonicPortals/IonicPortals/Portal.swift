//
//  Portal.swift
//  IonicPortals
//
//  Created by Thomas Vidas on 7/13/21.
//

import Foundation
import Capacitor

public class Portal {
    
    // MARK: - Instance Properties
    public let name: String;
    public var plugins: [CAPPlugin] = []
    public var initialContext: Any?
    public var startDir: String?
    
    public init(_ name: String) {
        print("Constructor")
        self.name = name
    }

    public func HelloWorld() {
        print("Hello World")
    }
    
    public func addPlugins(_ plugins: [CAPPlugin]) {
        self.plugins = plugins
    }
}
