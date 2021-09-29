import Foundation

public typealias OnPortalBuilderComplete = (_ portal : Portal) -> Void

public class PortalBuilder {
    
    // MARK: - Static Properties

    // MARK: - Instance Properties
    private let name: String

    private var startDir: String?
    private var initialContext: Dictionary<String, Any>?
    private var onBuilderComplete: OnPortalBuilderComplete?

    // Initialization
    public init(_ name: String) {
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
    public func setStartDir(_ startDir: String) -> PortalBuilder {
        self.startDir = startDir
        return self
    }

    
    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: self
     */
    public func setInitialContext(_ initialContext: Dictionary<String, Any>) -> PortalBuilder {
        self.initialContext = initialContext
        return self
    }

    /**
     * Sets an initial context for the web application to pass the web application an initial state
     * - Parameter initialContext: An object that can be serialized into JSON
     * - Returns: A newly created portal
     */
    public func create() -> Portal {
        let portal = Portal(self.name, self.startDir)
        portal.startDir = self.startDir ?? portal.name
        portal.initialContext = self.initialContext
        
        guard let onComplete = self.onBuilderComplete else {
            return portal
        }
        
        onComplete(portal)
        return portal
    }
}

