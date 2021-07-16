package io.ionic.portalslibrary

import com.getcapacitor.Plugin

/**
 * A singleton object for managing portals
 */
object PortalManager {
    private val portals: MutableMap<String, Portal> = mutableMapOf()

    /**
     * Adds a Portal object given the name of the portal
     * @param name The Portal name
     */
    fun addPortal(portal: Portal) {
        portals[portal.name] = portal
    }

    /**
     * Returns a Portal object given the name of the portal
     * @param name The Portal name
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun getPortal(name: String): Portal {
        return portals[name] ?: throw IllegalStateException("Portal with portalId $name not found in PortalManager")
    }

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugin The Plugin class object
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun addPluginToPortal(name: String, plugin: Class<out Plugin?>) {
        val portal = getPortal(name)
        portal.setPlugin(plugin)
    }

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugins A List of Plugin class objects
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun addPluginsToPortal(name: String, plugins: List<Class<out Plugin?>>) {
        val portal = getPortal(name)
        portal.setPlugins(plugins)
    }

    fun size(): Int {
        return portals.size
    }
}