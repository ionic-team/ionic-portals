//
//  ContentView.swift
//  Shared
//
//  Created by Thomas Vidas on 7/13/21.
//

import SwiftUI
import IonicPortals

struct ContentView: View {
    var portal: Portal
    
    init() {
        portal = PortalManager
                    .newPortal("portals/portalWeb")
                    .create()
        
        var initialContext: [String: String] = [:]
        initialContext["startingRoute"] = "/help"
        portal.initialContext = initialContext
    }
    
    var body: some View {
        VStack {
            Rectangle().frame(height: 1)
            
            Text("SwiftUI - Here's a portal:")
                
            Rectangle().frame(height: 1)
            
            PortalUIWebView(self.portal)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
