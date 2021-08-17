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

class LiveUpdateBuilder(val appId: String) {
    private var channel: String = "Master"
    private var maxStore: Int = 1
    private var minBackgroundDuration: Int = 0

    fun setChannel(channel: String): LiveUpdateBuilder {
        this.channel = channel
        return this
    }

    fun setMaxStore(maxStore: Int): LiveUpdateBuilder {
        this.maxStore = maxStore
        return this
    }

    fun setMinBackgroundDuration(minBackgroundDuration: Int): LiveUpdateBuilder {
        this.minBackgroundDuration = minBackgroundDuration
        return this
    }

    fun create(): LiveUpdate {
        val liveUpdate = LiveUpdate(appId)
        liveUpdate.channel = this.channel
        liveUpdate.maxStore = this.maxStore
        liveUpdate.minBackgroundDuration = this.minBackgroundDuration
        return liveUpdate
    }

}