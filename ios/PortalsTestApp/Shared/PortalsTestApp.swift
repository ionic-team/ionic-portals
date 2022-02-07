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
        PortalManager.register("[your-key-here]")
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
