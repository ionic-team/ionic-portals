//
//  PortalsTestAppApp.swift
//  Shared
//
//  Created by Thomas Vidas on 7/13/21.
//

import SwiftUI
import IonicPortals
import IonicLiveUpdates

@main
struct PortalsTestAppApp: SwiftUI.App {
    init() {
        // let p = Portal("Hello");
        // p.HelloWorld();
        print(LiveUpdateManager.LIVE_UPDATES_DIR)
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
