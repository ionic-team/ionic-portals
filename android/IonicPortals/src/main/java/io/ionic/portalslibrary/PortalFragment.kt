package io.ionic.portalslibrary

class PortalFragment : Fragment {
    protected var portal: Portal? = null
    private var bridge: Bridge? = null
    private var keepRunning = true
    private val initialPlugins: MutableList<java.lang.Class<out Plugin?>> =
        java.util.ArrayList<java.lang.Class<out Plugin?>>()
    private var config: CapConfig? = null
    private val webViewListeners: MutableList<WebViewListener> =
        java.util.ArrayList<WebViewListener>()

    constructor() : super(R.layout.fragment_bridge) {}
    constructor(portal: Portal?) : super(R.layout.fragment_bridge) {
        this.portal = portal
    }

    fun onInflate(
        @NonNull context: Context?,
        @NonNull attrs: AttributeSet?,
        @Nullable savedInstanceState: Bundle?
    ) {
        super.onInflate(context, attrs, savedInstanceState)
    }

    fun onViewCreated(view: View?, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        load(savedInstanceState)
    }

    fun onDestroy() {
        super.onDestroy()
        if (bridge != null) {
            bridge.onDestroy()
        }
    }

    fun onResume() {
        super.onResume()
        bridge.getApp().fireStatusChange(true)
        bridge.onResume()
        Logger.debug("App resumed")
    }

    fun onPause() {
        super.onPause()
        bridge.onPause()
        Logger.debug("App paused")
    }

    fun onConfigurationChanged(@NonNull newConfig: Configuration?) {
        super.onConfigurationChanged(newConfig)
        bridge.onConfigurationChanged(newConfig)
    }

    fun setPortal(portal: Portal?) {
        this.portal = portal
    }

    fun addPlugin(plugin: java.lang.Class<out Plugin?>?) {
        initialPlugins.add(plugin)
    }

    fun setConfig(config: CapConfig?) {
        this.config = config
    }

    fun getBridge(): Bridge? {
        return bridge
    }

    fun addWebViewListener(webViewListener: WebViewListener) {
        webViewListeners.add(webViewListener)
    }

    /**
     * Load the WebView and create the Bridge
     */
    protected fun load(savedInstanceState: Bundle?) {
        if (bridge == null) {
            Logger.debug("Loading Bridge with Portal")
            val startDir: String = portal.getStartDir()
            initialPlugins.addAll(portal.getPlugins())
            bridge = Builder(this)
                .setInstanceState(savedInstanceState)
                .setPlugins(initialPlugins)
                .setConfig(config)
                .addWebViewListeners(webViewListeners)
                .create()
            bridge.setServerAssetPath(startDir)
            keepRunning = bridge.shouldKeepRunning()
        }
    }
}