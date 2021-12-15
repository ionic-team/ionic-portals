import Foundation
import IonicLiveUpdates

public class Portal {
    
    // MARK: - Instance Properties
    public let name: String;
    public var initialContext: Dictionary<String, Any>?
    public var startDir: String?
    /**
     * LiveUpdate config if live updates is being used.
     */
    public var liveUpdateConfig: LiveUpdate? = nil
    
    public init(_ name: String, _ startDir: String?) {
        self.name = name
        self.startDir = startDir ?? name
    }
}

