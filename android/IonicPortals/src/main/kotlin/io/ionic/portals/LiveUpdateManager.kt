package io.ionic.portals

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

object LiveUpdateManager {
    private const val API_PROD = "https://api.ionicjs.com"
    private const val API_STAGE = "https://api-staging.ionicjs.com"

    private const val PREFS_KEY = "ionicDeploySavedPreferences"
    private const val CUSTOM_PREFS_KEY = "ionicDeployCustomPreferences"
    private const val CHANNEL = "CH_"
    private const val BINARY_VERSION = "BINV_"
    private const val CURRENT_VERSION_ID = "CVID_"
    private const val CURRENT_BUILD_ID = "CBID_"

    @JvmStatic fun sync(context: Context, portals: MutableMap<String, Portal>) {

        for(portal in portals) {
            if (portal.value.liveUpdate != null) {
                val appId = portal.value.liveUpdate!!.appId

                // check for update
                checkForUpdate(context, appId, portal.value.name)

                // if update is available
                // download it
                // extract it
                // update portal to point to it
                // update prefs
            }
        }
    }

    @JvmStatic private fun checkForUpdate(context: Context, appId: String, appName: String) {
        val ENDPOINT_CHECK = "${API_PROD}/apps/${appId}/channels/check-device"

        val sharedPrefs : SharedPreferences = context.getSharedPreferences(PREFS_KEY, Context.MODE_PRIVATE)
        val channel = sharedPrefs.getString("${CHANNEL}${appId}","")!!
        val binary = sharedPrefs.getString("${BINARY_VERSION}${appId}","")!!
        val currentVersionId = sharedPrefs.getString("${CURRENT_VERSION_ID}${appId}","")!!
        val currentBuildId = sharedPrefs.getString("${CURRENT_BUILD_ID}${appId}","")!!

        val payloadDevice = JSONObject()
        payloadDevice.put("binary_version", binary)
        payloadDevice.put("device_id", null)
        payloadDevice.put("platform", "android")
        payloadDevice.put("platform_version", android.os.Build.VERSION.SDK_INT.toString())

        if (!currentVersionId.isEmpty()) {
            payloadDevice.put("snapshot", currentVersionId)
        }

        if (!currentBuildId.isEmpty()) {
            payloadDevice.put("build", currentBuildId)
        }

        val payload = JSONObject()
        payload.put("device", payloadDevice)
        payload.put("channel_name", channel)
        payload.put("app_id", appId)
        payload.put("plugin_version", "5.4.7")
        payload.put("manifest", false)

        val queue = Volley.newRequestQueue(context)
        val request = JsonObjectRequest(Request.Method.POST, ENDPOINT_CHECK, payload,
            { response ->
                run {
                    val isAvailable = response.getJSONObject("data").getBoolean("available")
                    Log.d("updateAvailable", isAvailable.toString())
                    Log.d("response", response.toString())
                }
            },
            { error -> Log.d("response", "error: " + error.message) }
        )

        queue.add(request)
    }

    fun downloadUpdate() {

    }

    fun extractUpdate() {

    }

    fun copyWebAssetsToDisk(context: Context, portal : Portal) {
        val filesDir = context.filesDir
        val assetManager = context.assets



    }

    fun copyFiles(from: String, to: String) {

    }
}