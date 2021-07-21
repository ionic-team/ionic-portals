package io.ionic.portalslibrary

import android.content.res.Configuration
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import androidx.annotation.NonNull
import androidx.fragment.app.Fragment
import com.getcapacitor.*
import org.json.JSONException
import org.json.JSONObject
import java.lang.Error

open class PortalFragment : Fragment {
    var portal: Portal? = null

    private var bridge: Bridge? = null
    private var keepRunning = true
    private val initialPlugins: MutableList<Class<out Plugin?>> = ArrayList()
    private var config: CapConfig? = null
    private val webViewListeners: MutableList<WebViewListener> = ArrayList()

    constructor() : super(R.layout.fragment_bridge)

    constructor(portal: Portal?) : super(R.layout.fragment_bridge) {
        this.portal = portal
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        load(savedInstanceState)
    }

    override fun onDestroy() {
        super.onDestroy()
        if (bridge != null) {
            bridge?.onDestroy()
        }
    }

    override fun onResume() {
        super.onResume()
        bridge?.app?.fireStatusChange(true)
        bridge?.onResume()
        Logger.debug("App resumed")
    }

    override fun onPause() {
        super.onPause()
        bridge?.onPause()
        Logger.debug("App paused")
    }

    override fun onConfigurationChanged(@NonNull newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        bridge?.onConfigurationChanged(newConfig)
    }

    fun addPlugin(plugin: Class<out Plugin?>?) {
        initialPlugins.add(plugin!!)
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
        setupInitialContextListener()
        if (bridge == null) {
            Logger.debug("Loading Bridge with Portal")
            val startDir: String = portal?.startDir!!
            initialPlugins.addAll(portal?.plugins!!)
            bridge = Bridge.Builder(this)
                .setInstanceState(savedInstanceState)
                .setPlugins(initialPlugins)
                .setConfig(config)
                .addWebViewListeners(webViewListeners)
                .create()
            bridge?.setServerAssetPath(startDir)
            keepRunning = bridge?.shouldKeepRunning()!!
        }
    }

    private fun setupInitialContextListener() {
        if (portal?.initialContext !== null) {
            val listener = object: WebViewListener() {
                override fun onPageStarted(webView: WebView?) {
                    super.onPageStarted(webView)
                    val jsonObject: JSONObject = when (val initialContext = portal!!.initialContext) {
                        is String -> {
                            try {
                                JSONObject(initialContext);
                            } catch (ex: JSONException) {
                                throw Error("initialContext must be a JSON string or a Map")
                            }
                        }
                        is Map<*, *> -> {
                            JSONObject(initialContext.toMap())
                        }
                        else -> {
                            throw Error("initialContext must be a JSON string or a Map")
                        }
                    }
                    val portalInitialContext = "{ \"name\": \"" + portal?.name + "\"," +
                            " \"value\": " + jsonObject.toString() +
                            " } "
                    webView!!.evaluateJavascript(
                        "window.portalInitialContext = $portalInitialContext", null
                    )
                }
            }
            webViewListeners.add(listener)
        }
    }
}