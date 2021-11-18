import Foundation

@objc(Portal)
public class Portal: NSObject {
    
    // MARK: - Instance Properties
    public let name: String;
    public var initialContext: Dictionary<String, Any>?
    public var startDir: String?
    
    public init(_ name: String, _ startDir: String?) {
        self.name = name
        self.startDir = startDir ?? name
    }
}

