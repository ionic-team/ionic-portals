import Foundation

enum PortalError: Error {
    case notFound(String)
    case alreadyExists(String)
}

public class PortalManager {
    
    // MARK: - Static Properties

//    static let shared = PortalManager()

    // MARK: - Instance Properties

    private static var portals = Dictionary<String, Portal>()
    private static var registered = false

    // Initialization

    private init() {}

    /**
     * Returns the number of `Portal` objects in the `PortalManager`.
     * - returns: The count of `Portal` objects.
     */
    public static func count() -> Int {
        return portals.count
    }
    
    /**
     * Adds a `Portal` object given the `name` of the portal.
     * - Parameter portal: The `Portal` to add to the manager.
     */
    public static func addPortal(_ portal: Portal) -> Void {
        portals[portal.name] = portal
        if !registered {
            print("Don't forget to register your copy of portals! Register at: ionic.io/portals")
        }
    }
    
    /**
     * Returns a `Portal` object given the name of the portal
     * - Parameter name: The Portal name
     * - throws: `PortalError.notFound` if the `Portal` does not exist
     * - returns: The existing `Portal` class with name `name`.
     */
    public static func getPortal(_ name: String) throws -> Portal {
        guard let output = portals[name] else {
            throw PortalError.notFound("Portal with portalId \(name) not found in PortalManager")
        }
        return output
    }
    
    /**
     * A helper method to build `Portal` classes and add them to the manager. Classes built with newPortal are added to the `PortalManager` automatically.
     * - Parameter name: The `Portal` name
     * - returns: A `PortalBuilder` object that has a fluent API to construct a `Portal`.
     */
    public static func newPortal(_ name: String) -> PortalBuilder {
        return PortalBuilder(name, { (portal) in
            PortalManager.addPortal(portal)
        })
    }
    
    public static func isRegistered() -> Bool {
        return self.registered
    }
    
    /**
     Todo: Replace stub register method with actual registration logic
     */
    static func register() {
        self.registered = true
    }
    
    
}

