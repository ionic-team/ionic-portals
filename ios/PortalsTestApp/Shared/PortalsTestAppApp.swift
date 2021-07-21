//
//  PortalsTestAppApp.swift
//  Shared
//
//  Created by Thomas Vidas on 7/13/21.
//

import SwiftUI
import IonicPortals

@main
struct PortalsTestAppApp: App {
    init() {
        let p = Portal();
        p.HelloWorld();
    }
    
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
