import Foundation
import UIKit

enum PortalError: Error {
    case notFound(String)
    case alreadyExists(String)
}

@objc(PortalManager)
public class PortalManager: NSObject {
    
    // MARK: - Static Properties

//    static let shared = PortalManager()

    // MARK: - Instance Properties

    private static var portals = Dictionary<String, Portal>()
    private static var registered = false
    private static var registeredError = false
    private static var unregisteredMessageShown = false

    /**
     * Returns the number of `Portal` objects in the `PortalManager`.
     * - returns: The count of `Portal` objects.
     */
    @objc public static func count() -> Int {
        return portals.count
    }
    
    /**
     * Adds a `Portal` object given the `name` of the portal.
     * - Parameter portal: The `Portal` to add to the manager.
     */
    @objc public static func addPortal(_ portal: Portal) -> Void {
        portals[portal.name] = portal
        if !registered && !unregisteredMessageShown {
            self.unregisteredMessage()
        }
    }
    
    /**
     * Returns a `Portal` object given the name of the portal
     * - Parameter name: The Portal name
     * - throws: `PortalError.notFound` if the `Portal` does not exist
     * - returns: The existing `Portal` class with name `name`.
     */
    @objc public static func getPortal(_ name: String) throws -> Portal {
        guard let output = portals[name] else {
            throw PortalError.notFound("Portal with portalId \(name) not found in PortalManager")
        }
        if self.registeredError {
            self.registrationError()
        }
        return output
    }
    
    /**
     * A helper method to build `Portal` classes and add them to the manager. Classes built with newPortal are added to the `PortalManager` automatically.
     * - Parameter name: The `Portal` name
     * - returns: A `PortalBuilder` object that has a fluent API to construct a `Portal`.
     */
    @objc public static func newPortal(_ name: String) -> PortalBuilder {
        return PortalBuilder(name, { (portal) in
            PortalManager.addPortal(portal)
        })
    }
    
    @objc public static func isRegistered() -> Bool {
        return self.registered
    }
    
    @objc public static func register(_ key: String) {
        self.registered = self.validateToken(key)
    }
    
    private static func base64FromBase64Url(_ base64Url: String) -> String {
        var base64 = base64Url
            .replacingOccurrences(of: "-", with: "+")
            .replacingOccurrences(of: "_", with: "/")
        base64 += String(repeating: "=", count: base64.count % 4)
        return base64
    }
    
    private static func validateToken(_ token: String) -> Bool {
        let publicKeyBase64 =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1+gMC3aJVGX4ha5asmEF" +
        "TfP0FTFQlCD8d/J+dhp5dpx3ErqSReru0QSUaCRCEGV/ZK3Vp5lnv1cREQDG5H/t" +
        "Xm9Ao06b0QJYtsYhcPgRUU9awDI7jRKueXyAq4zAx0RHZlmOsTf/cNwRnmRnkyJP" +
        "a21mLNClmdPlhWjS6AHjaYe79ieAsftFA+QodtzoCo+w9A9YCvc6ngGOFoLIIbzs" +
        "jv6h9ES27mi5BUqhoHsetS4u3/pCbsV2U3z255gtjANtdIX/c5inepLuAjyc1aPz" +
        "2eu4TbzabvJnmNStje82NW36Qij1mupc4e7dYaq0aMNQyHSWk1/CuIcqEYlnK1mb" +
        "kQIDAQAB"
        
        let pubKeyData = Data(base64Encoded: publicKeyBase64)
        let attributes: [String: Any] = [
            kSecAttrKeyType as String: kSecAttrKeyTypeRSA,
            kSecAttrKeyClass as String: kSecAttrKeyClassPublic
        ]
        let publicKey = SecKeyCreateWithData(pubKeyData! as NSData, attributes as NSDictionary, nil)!
        
        let parts = token.split(separator: ".")
        if parts.count != 3 {
            self.registrationError()
            return false
        }
        let headerAndPayload = "\(parts[0]).\(parts[1])"
        let signature = String(parts[2])
        
        let headersAndPayloadData = headerAndPayload.data(using: .ascii)! as CFData
        let signatureData = Data(base64Encoded: self.base64FromBase64Url(signature))! as CFData
        
        
        var error: Unmanaged<CFError>?
        
        let result = SecKeyVerifySignature(
            publicKey,
            .rsaSignatureMessagePKCS1v15SHA256,
            headersAndPayloadData,
            signatureData,
            &error
        )
        
        if !result {
            self.registrationError()
        }
        
        return result
    }
    
    private static func registrationError() {
        self.registeredError = true
        print("Error validating key")
        let alert = UIAlertController(title: nil, message: "Error validating your key for Ionic Portals. Check your key and try again.", preferredStyle: .alert)
        let okButton = UIAlertAction(title: "OK", style: .default, handler: { action -> Void in alert.dismiss(animated: true) })
        alert.addAction(okButton)
        let rc = UIApplication.shared.keyWindow?.rootViewController
        rc?.present(alert, animated: true)
    }
    
    private static func unregisteredMessage() {
        if !self.unregisteredMessageShown {
            print("Don't forget to register your copy of portals! Register at: ionic.io/register-portals")
            self.unregisteredMessageShown = true
        }
    }
    
}

