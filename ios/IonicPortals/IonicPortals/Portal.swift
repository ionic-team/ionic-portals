import Foundation

public class Portal {
    
    // MARK: - Instance Properties
    public let name: String;
    public var initialContext: Any?
    public var startDir: String?
    
    public init(_ name: String, _ startDir: String?) {
        self.name = name
        self.startDir = startDir ?? name
    }
}

