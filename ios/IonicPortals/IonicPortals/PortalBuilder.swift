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
    private var plugins: [CAPPlugin] = []
    private var initialContext: Any?

    // Initialization
    public init(_ name: String, _ onComplete: @escaping OnPortalBuilderComplete) {
        self.name = name
        self.onBuilderComplete = onComplete
    }

    public func setStartDir(startDir: String) -> PortalBuilder {
        self.startDir = startDir
        return self
    }

    public func addPlugin(plugin: CAPPlugin) -> PortalBuilder {
        plugins.append(plugin)
        return self
    }

    public func setInitialContext(initialContext: Any) -> PortalBuilder {
        self.initialContext = initialContext
        return self
    }

    public func setPlugins(plugins: [CAPPlugin]) -> PortalBuilder {
        self.plugins = plugins
        return self
    }

    public func create() -> Portal {
        let portal = Portal(self.name)
        portal.startDir = self.startDir ?? portal.name
        portal.addPlugins(plugins)
        portal.initialContext = self.initialContext
        self.onBuilderComplete(portal)
        return portal
    }
}
