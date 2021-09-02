package io.ionic.portals

import android.util.Log

/**
 * A singleton object for managing portals
 */
object PortalManager {

    @JvmStatic private val portals: MutableMap<String, Portal> = mutableMapOf()
    @JvmStatic private var registered: Boolean = false

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
     * Todo: Replace stub register method with actual registration logic
     */
    @JvmStatic fun register() {
        registered = true
    }

    @JvmStatic fun isRegistered(): Boolean {
        // return registered
        return true
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

}