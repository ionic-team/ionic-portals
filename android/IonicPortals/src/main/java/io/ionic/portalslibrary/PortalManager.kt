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
    fun addPortal(name: String): Unit {
        val portal = Portal()
        portals[name] = portal
    }

    /**
     * Returns a Portal object given the name of the portal
     * @param name The Portal name
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun getPortal(name: String): Portal {
        return portals[name] ?: throw NoSuchElementException()
    }

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugin The Plugin class object
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun addPluginToPortal(name: String, plugin: Class<out Plugin?>): Unit {
        val portal = getPortal(name)
        portal.setPlugin(plugin)
    }

    /**
     * Adds a single Plugin to an existing Portal
     * @param name The Portal name
     * @param plugins A List of Plugin class objects
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun addPluginsToPortal(name: String, plugins: List<Class<out Plugin?>>): Unit {
        val portal = getPortal(name)
        portal.setPlugins(plugins)
    }
}