package io.ionic.portalslibrary

import android.content.Context
import com.getcapacitor.Plugin

/**
 * A singleton object for managing portals
 */
object PortalManager {
    private val initialPlugins: ArrayList<Class<out Plugin?>> = ArrayList()
    private val portals: HashMap<String, Pair<Portal, Context>> = hashMapOf()

    /**
     * Adds a Portal object given the name of the portal
     * @param name The Portal name
     */
    fun addPortal(name: String, context: Context): Unit {
        val portal = Portal()
        portals[name] = Pair(portal, context)
    }

    /**
     * Returns a Portal object given the name of the portal
     * @param name The Portal name
     * @throws NoSuchElementException throws this exception if the Portal does not exist
     */
    fun getPortal(name: String): Portal {
        val (portal, context) = portals[name] ?: throw NoSuchElementException()
        portal.setPlugins(initialPlugins)
        return portal
    }

    /**
     * Adds a plugin to be added to all future created Portals
     * @param plugin The plugin class to add to the Portals
     */
    fun addPlugin(plugin: Class<out Plugin>) {
        initialPlugins.add(plugin)
    }
}