import Foundation
import IonicLiveUpdates

public typealias OnPortalBuilderComplete = (_ portal : Portal) -> Void

@objc(PortalBuilder)
public class PortalBuilder: NSObject {
    
    // MARK: - Static Properties

    // MARK: - Instance Properties
    private let name: String

    private var startDir: String?
    private var initialContext: Dictionary<String, Any>?
    private var onBuilderComplete: OnPortalBuilderComplete?
    private var liveUpdateConfig: LiveUpdate? = nil

    // Initialization
    @objc public init(_ name: String) {
        self.name = name
        self.onBuilderComplete = nil
    }
    
    internal init (_ name: String, _ onComplete: @escaping OnPortalBuilderComplete) {
        self.name = name
        self.onBuilderComplete = onComplete
    }

    /**
     * Sets the starting directory entry point for the web app if you have multiple web apps to choose from
     * - Parameter startDir: The relative file path of the folder that contains your web app
     * - Returns: self
     */
    @objc public func setStartDir(_ startDir: String) -> PortalBuilder {
        self.startDir = startDir
        return self
    }

    
    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: self
     */
    @objc public func setInitialContext(_ initialContext: Dictionary<String, Any>) -> PortalBuilder {
        self.initialContext = initialContext
        return self
    }
    
    /**
     * Sets the live update configuration for this specific portal
     * - Parameter liveUpdateConfig: A live update object that contains information on how to handle the Appflow Live Update functionality
     * - Parameter updateOnAppLoad: Starts an immediate sync to download the latest update on the Portal
     */
    @objc public func setLiveUpdateConfig(liveUpdateConfig: LiveUpdate, updateOnAppLoad: Bool = true) -> PortalBuilder {
        self.liveUpdateConfig = liveUpdateConfig
        LiveUpdateManager.initialize()
        LiveUpdateManager.cleanVersions(liveUpdateConfig.getAppId())
        LiveUpdateManager.addLiveUpdateInstance(liveUpdateConfig)
        if (updateOnAppLoad) {
            LiveUpdateManager.sync(appId: liveUpdateConfig.getAppId())
        }
        return self
    }

    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: A newly created portal
     */
    @objc public func create() -> Portal {
        let portal = Portal(self.name, self.startDir)
        portal.startDir = self.startDir ?? portal.name
        portal.initialContext = self.initialContext
        portal.liveUpdateConfig = self.liveUpdateConfig
        
        guard let onComplete = self.onBuilderComplete else {
            return portal
        }
        
        onComplete(portal)
        return portal
    }
}

