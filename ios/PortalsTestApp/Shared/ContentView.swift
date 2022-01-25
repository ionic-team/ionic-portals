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
                    .newPortal("portalWeb")
                    .create()
    }
    
    var body: some View {
        VStack {
            Text("here be portal!")
            
            //PortalWebView()
            PortalUIWebView(self.portal)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
