package io.ionic.portals.data

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LiveUpdateDevice(
    @SerialName("binary_version") val binaryVersion: String,
    @SerialName("device_id") val deviceId: String?,
    val platform: String,
    @SerialName("platform_version") val platformVersion: String,
    val snapshot: String,
    val build: String,
)
