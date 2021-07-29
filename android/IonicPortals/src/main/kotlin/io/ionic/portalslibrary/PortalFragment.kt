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
    private var portalsPlugin: PortalsPlugin? = null
    private val messageHandlers: MutableMap<String, PortalListener> = HashMap()

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

                override fun onPageLoaded(webView: WebView?) {
                    super.onPageLoaded(webView)
                    setupPortalsPlugin()
                }
            }

            webViewListeners.add(listener)
        }
    }

    private fun setupPortalsPlugin() {
        val pluginHandle = getBridge()?.getPlugin("Portals")
        if (pluginHandle?.instance is PortalsPlugin) {
            portalsPlugin = pluginHandle.instance as? PortalsPlugin
            portalsPlugin!!.portalFragment = this
        }
    }

    internal fun receiveMessage(message: String, payload: String?) {
        val msgHandler = messageHandlers[message]
        msgHandler.let { msgHandler?.onMessageReceived(payload) } ?: run { Logger.error("Portals message handler not registered for '$message'") }
    }

    /**
     * Send a message to the web app listening through the Portal.
     */
    fun sendMessage(message : String, payload : String) {
        val data = JSObject()
        data.put("message", message)
        data.put("payload", payload)
        portalsPlugin?.sendMessageToWebApp(data)
    }

    /**
     * Register a message receiver to subscribe to messages through the Portal from the web app.
     *
     * The name of the message receiver should match the message name used to send messages from
     * the web app via the Portal. When a message is received the payload will be passed through.
     */
    fun addMessageReceiver(name: String, messageHandler: PortalListener) {
        messageHandlers[name] = messageHandler
    }

    /**
     * Link a class with methods decorated with the [PortalMethod] annotation to use as Portals
     * message receivers.
     *
     * The name of the method should match the message name used to send messages via the Portal.
     * Alternatively the [PortalMethod] annotation name property can be used to designate a
     * different name. The registered methods should accept a single String representing the payload
     * of a message sent through the Portal.
     */
    fun linkMessageReceivers(messageReceiverParent: Any) {
        val members = messageReceiverParent.javaClass.kotlin.members.filter { it.annotations.any { annotation -> annotation is PortalMethod } }

        for (member in members) {
            var methodName = member.name
            for (annotation in member.annotations) {
                if (annotation is PortalMethod && annotation.name.isNotEmpty()) {
                    methodName = annotation.name
                }
            }

            messageHandlers[methodName] = object : PortalListener {
                override fun onMessageReceived(data: String?) {
                    member.call(messageReceiverParent, data)
                }
            }
        }
    }
}