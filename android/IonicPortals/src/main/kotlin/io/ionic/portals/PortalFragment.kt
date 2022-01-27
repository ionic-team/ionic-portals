package io.ionic.portals

import android.app.AlertDialog
import android.content.res.Configuration
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import androidx.annotation.NonNull
import androidx.fragment.app.Fragment
import com.getcapacitor.*
import org.json.JSONException
import org.json.JSONObject
import kotlin.reflect.KVisibility

open class PortalFragment : Fragment {
    val PORTAL_NAME = "PORTALNAME"
    var portal: Portal? = null

    private var bridge: Bridge? = null
    private var keepRunning = true
    private val initialPlugins: MutableList<Class<out Plugin?>> = ArrayList()
    private var config: CapConfig? = null
    private val webViewListeners: MutableList<WebViewListener> = ArrayList()
    private var subscriptions = mutableMapOf<String, Int>()

    constructor()

    constructor(portal: Portal?) {
        this.portal = portal
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val layout = if(PortalManager.isRegistered()) R.layout.fragment_portal else R.layout.fragment_unregistered
        return inflater.inflate(layout, container, false)
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
        for ((topic, ref) in subscriptions) {
            PortalsPlugin.unsubscribe(topic, ref)
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

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString(PORTAL_NAME, portal?.name)
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
    private fun load(savedInstanceState: Bundle?) {
        if (PortalManager.isRegistered()) {
            setupInitialContextListener()
            if (bridge == null) {
                Logger.debug("Loading Bridge with Portal")
                val existingPortalName = savedInstanceState?.getString(PORTAL_NAME, null)
                if (existingPortalName != null && portal == null) {
                    portal = PortalManager.getPortal(existingPortalName)
                }

                if (portal != null) {
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
        } else if (PortalManager.isRegisteredError()) {
            if(activity != null) {
                val alert = AlertDialog.Builder(activity)
                alert.setMessage("Error validating your key for Ionic Portals. Check your key and try again.")
                alert.setPositiveButton("OK") { dialog, _ ->
                    dialog.dismiss()
                }
                alert.show()
            }
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

    /**
     * Link a class with methods decorated with the [PortalMethod] annotation to use as Portals
     * message receivers.
     *
     * The name of the method should match the message name used to send messages via the Portal.
     * Alternatively the [PortalMethod] annotation topic property can be used to designate a
     * different name. The registered methods should accept a single String representing the payload
     * of a message sent through the Portal.
     */
    fun linkMessageReceivers(messageReceiverParent: Any) {
        val members = messageReceiverParent.javaClass.kotlin.members.filter { it.annotations.any { annotation -> annotation is PortalMethod } }

        for (member in members) {
            var methodName = member.name
            for (annotation in member.annotations) {
                if (annotation is PortalMethod && annotation.topic.isNotEmpty()) {
                    methodName = annotation.topic
                }
            }

            if(member.visibility != KVisibility.PUBLIC) {
                throw IllegalAccessException("Portal Method '${member.name}' must be public!")
            }

            when (member.parameters.size) {
                1 -> {
                    val ref = PortalsPlugin.subscribe(methodName) { result ->
                        member.call(messageReceiverParent)
                    }
                    subscriptions[methodName] = ref
                }
                2 -> {
                    val ref = PortalsPlugin.subscribe(methodName) { result ->
                        member.call(messageReceiverParent, result.data)
                    }
                    subscriptions[methodName] = ref
                }

                else -> {
                    throw IllegalArgumentException("Portal Method '${member.name}' must" +
                            " contain zero parameters or a single String parameter!")
                }
            }
        }
    }
}