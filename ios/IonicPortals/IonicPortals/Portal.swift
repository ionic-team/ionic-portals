//
//  Portal.swift
//  IonicPortals
//
//  Created by Thomas Vidas on 7/13/21.
//

import Foundation
import Capacitor

public class Portal {
    public let name: String;
    public var startDir: String;
    public var initialContext: Any?;
    
    public init(_ name: String, _ startDir: String?) {
        self.name = name
        self.startDir = startDir ?? name
    }
}
