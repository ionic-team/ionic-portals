//
//  PortalManager.swift
//  IonicPortals
//
//  Created by Thomas Vidas on 7/22/21.
//

import Foundation
import Capacitor

typealias OnPortalBuilderComplete = (_ portal : Portal) -> Void

class PortalBuilder {
    
    // MARK: - Static Properties

    // MARK: - Instance Properties
    private let name: String
    private let onBuilderComplete: OnPortalBuilderComplete

    private var startDir: String?
    private var initialContext: Any?

    // Initialization
    public init(_ name: String, _ onComplete: @escaping OnPortalBuilderComplete) {
        self.name = name
        self.onBuilderComplete = onComplete
    }

    /**
     * Sets the starting directory entry point for the web app if you have multiple web apps to choose from
     * - Parameter startDir: The relative file path of the folder that contains your web app
     * - Returns: self
     */
    public func setStartDir(startDir: String) -> PortalBuilder {
        self.startDir = startDir
        return self
    }

    
    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: self
     */
    public func setInitialContext(initialContext: Any) -> PortalBuilder {
        self.initialContext = initialContext
        return self
    }

    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: A newly created portal
     */
    public func create() -> Portal {
        let portal = Portal(self.name, nil)
        portal.startDir = self.startDir ?? portal.name
        portal.initialContext = self.initialContext
        self.onBuilderComplete(portal)
        return portal
    }
}
