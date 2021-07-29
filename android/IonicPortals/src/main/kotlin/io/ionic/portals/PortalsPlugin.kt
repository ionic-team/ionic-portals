package io.ionic.portals

import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "Portals")
class PortalsPlugin : Plugin() {

    var portalFragment : PortalFragment? = null
    var messageCall: PluginCall? = null

    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value")
        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }

    @PluginMethod
    fun sendMessage(call: PluginCall) {
        call.data.getString("message")?.let { portalFragment?.receiveMessage(it, call.data.getString("payload")) }
        call.resolve()
    }

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    fun listenForMessages(pluginCall: PluginCall) {
        messageCall = pluginCall
        messageCall?.setKeepAlive(true)
    }

    internal fun sendMessageToWebApp(data: JSObject) {
        messageCall?.resolve(data) ?: run {
            Logger.error("No portals messageCall is saved")
        }
    }
}