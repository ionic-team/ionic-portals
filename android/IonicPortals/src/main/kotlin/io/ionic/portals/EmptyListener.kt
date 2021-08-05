package io.ionic.portals;

/**
 * An interface for responding to zero-payload messages sent through the Portal.
 */
interface EmptyListener : PortalListener {
    fun onMessageReceived()
}
