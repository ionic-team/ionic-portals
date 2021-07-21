package io.ionic.portalslibrary

import com.getcapacitor.Plugin

/**
 * A singleton object for managing portals
 */
object PortalManager {

    @JvmStatic private val portals: MutableMap<String, Portal> = mutableMapOf()

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

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugin The Plugin class object
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    @JvmStatic fun addPluginToPortal(name: String, plugin: Class<out Plugin?>) {
        val portal = getPortal(name)
        portal.setPlugin(plugin)
    }

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugins A List of Plugin class objects
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    @JvmStatic fun addPluginsToPortal(name: String, plugins: List<Class<out Plugin?>>) {
        val portal = getPortal(name)
        portal.setPlugins(plugins)
    }

    @JvmStatic fun size(): Int {
        return portals.size
    }

    /**
     * A helper method to build portal classes. Classes built with createPortal are added to the PortalManager automatically.
     * @param name The Portal name
     * @return A PortalBuilder object that has a fluent API to construct a Portal.
     */
    @JvmStatic
    fun createPortal(name: String): PortalBuilder {
        return PortalBuilder(name, fun(portal) {
            this.addPortal(portal)
        })
    }

}