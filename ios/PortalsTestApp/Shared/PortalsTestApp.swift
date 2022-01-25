//
//  PortalsTestApp.swift
//  Shared
//
//  Created by Thomas Vidas on 7/13/21.
//

import SwiftUI
import IonicPortals

@main
struct PortalsTestApp: App {
    init() {
        PortalManager.register("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyOTE4MDIxIn0.VXhuLKAqlOZpvp0H0BJ4o_GPV_Ah7txSpIS1x3_7T4CQgTpSZWiZub3KUjPL75xeaypCvUc9kJ22pLgKwxwQoXcXFFchYQSAJXenDLFZUv476LlwX-hNBAP7EGHlzDoAlKaHsHgjrvnagtOgyYEkEEWqQi6rIHyhPfOlfJUQ4JieL8ATCt11UG0lTTKSrspMmxEXlfJQrTHEDhIMI2hvd0NlAOvchMXEb1flECBj7FgvO0QMABPNGJ8kEu7pRNDykJPFI7d-IVdQAl181r88O3r1SpJJ62sC5dJ9zin_w0K9fWT9oS-INZdlSGV5uIUxFXwhejGhuH90cvqH0TjG5g")
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
