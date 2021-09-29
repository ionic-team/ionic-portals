package io.ionic.portals

import com.getcapacitor.Plugin
import java.util.*

class Portal(
    /**
     * Get the name of the Portal.
     *
     * @return The name of the Portal.
     */
    val name: String
) {
    /**
     * Get the list of Capacitor [Plugin] registered with the Portal.
     *
     * @return The list of plugins registered with the Portal.
     */
    internal val plugins = ArrayList<Class<out Plugin?>>()

    /**
     * Initialize the Portal and add the PortalsPlugin by default.
     */
    init {
        this.plugins.add(PortalsPlugin::class.java)
    }

    /**
     * The initial context to pass to the webview.
     *
     * @return Either a JSON string or a Map
     */
    var initialContext: Any? = null
        internal set

    /**
     * The [PortalFragment] type used by a [PortalView] when using Portals directly in
     * Android layouts/XML.
     *
     * @param portalFragmentType A PortalFragment to use if the Portal is added using a PortalView.
     */
    var portalFragmentType: Class<out PortalFragment?> = PortalFragment::class.java

    /**
     * The start directory of the portal web app. Portals will use the name of the Portal by default
     * if this value is not set.
     *
     * @param startDir The start directory of the Portal web app.
     */
    var startDir: String = ""
        get() = if (field.isEmpty()) name else field

    /**
     * Add a Capacitor [Plugin] to be loaded with this Portal.
     *
     * @param plugin A Plugin to be used with the Portal.
     */
    fun addPlugin(plugin: Class<out Plugin?>) {
        if(plugin != PortalsPlugin::class.java) {
            plugins.add(plugin)
        }
    }

    /**
     * Add multiple Capacitor [Plugin] to be loaded with this Portal.
     *
     * @param plugin A Plugin to be used with the Portal.
     */
    fun addPlugins(plugins: List<Class<out Plugin?>>) {
        plugins.forEach {
            this.addPlugin(it)
        }
    }

    /**
     * Sets the initial context to pass to the webview
     *
     * @param initialContext A map containing key/pair values that will be converted to a JavaScript object in the webview.
     */
    fun setInitialContext(initialContext: Map<String, Any>) {
        this.initialContext = initialContext
    }

    /**
     * Sets the initial context to pass to the webview
     *
     * @param initialContext A JSON string that will be converted to a JavaScript object in the webview.
     */
    fun setInitialContext(initialContext: String) {
        this.initialContext = initialContext
    }

}

class PortalBuilder(val name: String) {
    private var _startDir: String? = null
    private var plugins = mutableListOf<Class<out Plugin?>>()
    private var initialContext: Any? = null
    private var portalFragmentType: Class<out PortalFragment?> = PortalFragment::class.java

    fun setStartDir(startDir: String): PortalBuilder {
        this._startDir = startDir
        return this
    }

    fun addPlugin(plugin: Class<out Plugin?>): PortalBuilder {
        plugins.add(plugin)
        return this
    }

    fun setInitialContext(initialContext: Any): PortalBuilder {
        this.initialContext = initialContext
        return this
    }

    fun setPlugins(plugins: MutableList<Class<out Plugin?>>): PortalBuilder {
        this.plugins = plugins
        return this
    }

    fun setPortalFragmentType(portalFragmentType: Class<out PortalFragment?>): PortalBuilder {
        this.portalFragmentType = portalFragmentType
        return this
    }

    fun create(): Portal {
        val portal = Portal(name)
        portal.startDir = this._startDir ?: this.name
        portal.addPlugins(plugins)
        portal.initialContext = this.initialContext
        portal.portalFragmentType = this.portalFragmentType
        PortalManager.addPortal(portal)
        return portal
    }

}