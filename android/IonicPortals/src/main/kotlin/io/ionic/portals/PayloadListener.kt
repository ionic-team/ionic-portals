package io.ionic.portals

/**
 * An interface for responding to messages containing payload data sent through the Portal.
 */
interface PayloadListener : PortalListener {
    fun onMessageReceived(data: String?)
}