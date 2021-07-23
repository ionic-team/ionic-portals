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
    
    public init() {
        print("Constructor")
        name = "";
    }

    public func HelloWorld() {
        print("Hello World")
    }
}
