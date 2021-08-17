package io.ionic.portals

/**
 * A singleton object for managing portals
 */
object PortalManager {

    @JvmStatic val portals: MutableMap<String, Portal> = mutableMapOf()

    /**
     * Adds a Portal object given the name of the portal
     * @param name The Portal name
     */
    @JvmStatic fun addPortal(portal: Portal) {
        portals[portal.name] = portal
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