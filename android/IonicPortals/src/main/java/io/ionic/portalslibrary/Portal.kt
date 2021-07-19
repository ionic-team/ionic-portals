package io.ionic.portalslibrary

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
     * The initial context to pass to the webview.
     *
     * @return Either a JSON string or a Map
     */
    var initialContext: Any? = null
        private set

    /**
     * Get the list of Capacitor [Plugin] registered with the Portal.
     *
     * @return The list of plugins registered with the Portal.
     */
    val plugins = ArrayList<Class<out Plugin?>>()

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
    fun setPlugin(plugin: Class<out Plugin?>) {
        plugins.add(plugin)
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

    /**
     * Add multiple Capacitor [Plugin] to be loaded with this Portal.
     *
     * @param plugin A Plugin to be used with the Portal.
     */
    fun setPlugins(plugins: List<Class<out Plugin?>>) {
        this.plugins.addAll(plugins)
    }

}