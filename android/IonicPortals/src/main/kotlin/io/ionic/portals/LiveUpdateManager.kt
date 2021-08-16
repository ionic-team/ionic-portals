package io.ionic.portals

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import io.ionic.portals.data.LiveUpdateCheck
import io.ionic.portals.data.LiveUpdateDevice
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.json.JSONObject

class LiveUpdateManager {

    private val API_PROD = "https://api.ionicjs.com"
    private val API_STAGE = "https://api-staging.ionicjs.com"

    private val PREFS_KEY = "ionicDeploySavedPreferences"
    private val CUSTOM_PREFS_KEY = "ionicDeployCustomPreferences"
    private val CHANNEL = "CH_"
    private val BINARY_VERSION = "BINV_"
    private val CURRENT_VERSION_ID = "CVID_"
    private val CURRENT_BUILD_ID = "CBID_"

    val context: Context? = null

    // ??
    var KEY: String = ""

    fun sync(portals: MutableMap<String, Portal>) {

        for(portal in portals) {
            // we only care about portals with liveUpdate configs
            if (portal.value.liveUpdate != null) {
                val appId = portal.value.liveUpdate!!.appId

                // check for update
                checkForUpdate(appId, portal.value.name)

                // if update is available
                // download it
                // extract it
                // update portal to point to it
                // update prefs
            }
        }
    }

    fun checkForUpdate(appId: String, appName: String) {
        val ENDPOINT_CHECK = "${API_PROD}/apps/${appId}/channels/check-device"

        // build request body
        val sharedPrefs : SharedPreferences = context?.getSharedPreferences(PREFS_KEY, Context.MODE_PRIVATE)!!
        val channel = sharedPrefs.getString("${CHANNEL}${appId}","")!!
        val binary = sharedPrefs.getString("${BINARY_VERSION}${appId}","")!!
        val currentVersionId = sharedPrefs.getString("${CURRENT_VERSION_ID}${appId}","")!!
        val currentBuildId = sharedPrefs.getString("${CURRENT_BUILD_ID}${appId}","")!!

        val device = LiveUpdateDevice(binary, null, "android", "30", currentVersionId, currentBuildId)
        val requestPayload = LiveUpdateCheck(channel, appId, device, "5.4.7", false)

        val queue = Volley.newRequestQueue(context)
        val request = JsonObjectRequest(Request.Method.POST, ENDPOINT_CHECK, JSONObject(Json.encodeToString(requestPayload)),
            { response -> Log.d("response", response.toString()) },
            { error -> Log.d("response", "error: " + error.message)
        })

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

//    // Reload Portal?
//    fun reloadApp() {
//
//    }
}