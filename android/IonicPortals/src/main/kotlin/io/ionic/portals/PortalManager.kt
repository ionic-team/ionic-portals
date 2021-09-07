package io.ionic.portals

import android.util.Base64
import android.util.Log
import java.security.KeyFactory
import java.security.PublicKey
import java.security.Signature
import java.security.spec.X509EncodedKeySpec

/**
 * A singleton object for managing portals
 */
object PortalManager {

    @JvmStatic private val portals: MutableMap<String, Portal> = mutableMapOf()
    @JvmStatic private var registered: Boolean = true

    /**
     * Adds a Portal object given the name of the portal
     * @param name The Portal name
     */
    @JvmStatic fun addPortal(portal: Portal) {
        portals[portal.name] = portal

        if (!registered) {
            Log.e("Portals", "Don't forget to register your copy of portals! Register at: ionic.io/portals")
        }
    }

    /**
     * Returns a Portal object given the name of the portal
     * @param name The Portal name
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    @JvmStatic fun getPortal(name: String): Portal {
        return portals[name] ?: throw IllegalStateException("Portal with portalId $name not found in PortalManager")
    }

    @JvmStatic fun size(): Int {
        return portals.size
    }

    /**
     * Register this application with your Portals account.
     * @param key The key for Portals provided by the Ionic dashboard.
     */
    @JvmStatic fun register(key : String) {
        registered = verify(key)
    }

    @JvmStatic fun isRegistered(): Boolean {
        return registered
    }

    /**
     * A helper method to build portal classes and add them to the manager. Classes built with newPortal are added to the PortalManager automatically.
     * @param name The Portal name
     * @return A PortalBuilder object that has a fluent API to construct a Portal.
     */
    @JvmStatic
    fun newPortal(name: String): PortalBuilder {
        return PortalBuilder(name, fun(portal) {
            this.addPortal(portal)
        })
    }

    /**
     * Verifies the provided registration key string against the Portals public key.
     * @param key: The Portals registration key to validate.
     * @return True if validation was successful, false if not.
     */
    private fun verify(key: String): Boolean {
        val jwtDelimiter = '.'
        val PUBLIC_KEY =
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1+gMC3aJVGX4ha5asmEF" +
            "TfP0FTFQlCD8d/J+dhp5dpx3ErqSReru0QSUaCRCEGV/ZK3Vp5lnv1cREQDG5H/t" +
            "Xm9Ao06b0QJYtsYhcPgRUU9awDI7jRKueXyAq4zAx0RHZlmOsTf/cNwRnmRnkyJP" +
            "a21mLNClmdPlhWjS6AHjaYe79ieAsftFA+QodtzoCo+w9A9YCvc6ngGOFoLIIbzs" +
            "jv6h9ES27mi5BUqhoHsetS4u3/pCbsV2U3z255gtjANtdIX/c5inepLuAjyc1aPz" +
            "2eu4TbzabvJnmNStje82NW36Qij1mupc4e7dYaq0aMNQyHSWk1/CuIcqEYlnK1mb" +
            "kQIDAQAB"

        try {
            val publicBytes: ByteArray = Base64.decode(PUBLIC_KEY, Base64.DEFAULT)
            val keySpec = X509EncodedKeySpec(publicBytes)
            val keyFactory: KeyFactory = KeyFactory.getInstance("RSA")
            val pubKey: PublicKey = keyFactory.generatePublic(keySpec)

            val parts = key.trim().split(jwtDelimiter)
            return if (parts.size == 3) {
                val header = parts[0].toByteArray(Charsets.UTF_8)
                val payload = parts[1].toByteArray(Charsets.UTF_8)
                val tokenSignature = Base64.decode(parts[2], Base64.URL_SAFE)

                val rsaSignature = Signature.getInstance("SHA256withRSA")
                rsaSignature.initVerify(pubKey)
                rsaSignature.update(header)
                rsaSignature.update(jwtDelimiter.toByte())
                rsaSignature.update(payload)
                rsaSignature.verify(tokenSignature)
            } else {
                false
            }
        } catch (e:Exception) {
            Log.e("Portals", "There was a problem with your registration key. Please verify it is correct.")
        }

        return false
    }
}