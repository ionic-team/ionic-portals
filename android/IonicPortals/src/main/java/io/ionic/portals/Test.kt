package io.ionic.portals

import android.content.Context
import android.widget.Toast

class Test {
    companion object {
        fun helloWorld(context: Context) {
            Toast.makeText(context, "Hello World", Toast.LENGTH_SHORT).show()
        }
    }
}