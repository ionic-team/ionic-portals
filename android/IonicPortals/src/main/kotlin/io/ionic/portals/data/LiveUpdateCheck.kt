package io.ionic.portals.data

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LiveUpdateCheck(
    @SerialName("channel_name") val channel: String,
    @SerialName("app_id") val appId: String,
    val device : LiveUpdateDevice,
    @SerialName("plugin_version") val pluginVersion: String,
    val manifest: Boolean
    )
