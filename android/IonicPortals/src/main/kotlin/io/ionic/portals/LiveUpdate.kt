package io.ionic.portals

class LiveUpdate(
    /**
     * Get the Appflow app ID
     *
     * @return The Appflow app ID
     */
    val appId: String
) {

    /**
     * The channel to check for updates from
     */
    var channel: String = "Master"

    /**
     * The maximum number of downloaded versions to store on the device
     */
    var maxStore: Int = 1

    /**
     * The minimum duration after which the app checks for an update in the background
     */
    var minBackgroundDuration: Int = 0


}

class LiveUpdateBuilder(val appId: String, val onCreate: (liveUpdate: LiveUpdate) -> Unit) {
    private var channel: String = "Master"

    fun setChannel(channel: String): LiveUpdateBuilder {
        this.channel = channel
        return this
    }

//    fun addPlugin(plugin: Class<out Plugin?>): PortalBuilder {
//        plugins.add(plugin)
//        return this
//    }
//
//    fun setInitialContext(initialContext: Any): PortalBuilder {
//        this.initialContext = initialContext
//        return this
//    }
//
//    fun setPlugins(plugins: MutableList<Class<out Plugin?>>): PortalBuilder {
//        this.plugins = plugins
//        return this
//    }
//
//    fun setPortalFragmentType(portalFragmentType: Class<out PortalFragment?>): PortalBuilder {
//        this.portalFragmentType = portalFragmentType
//        return this
//    }

    fun create(): LiveUpdate {
        val liveUpdate = LiveUpdate(appId)
        liveUpdate.channel = this.channel
        onCreate(liveUpdate)
        return liveUpdate
    }

}