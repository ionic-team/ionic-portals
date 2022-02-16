//
//  PortalUIWebView.swift
//  IonicPortals
//
//  Created by Dan Giralté on 1/24/22.
//

import SwiftUI
import Capacitor

public struct PortalUIWebView: UIViewControllerRepresentable {
    public typealias UIViewControllerType = UIViewController

    let portal: Portal
    var onBridgeAvailable: (CAPBridgeProtocol?) -> Void

    public init(_ portal: Portal, onBridgeAvailable: @escaping (CAPBridgeProtocol?) -> Void) {
        self.portal = portal
        self.onBridgeAvailable = onBridgeAvailable
    }

    public func makeUIViewController(context: Context) -> UIViewController {
        let vc = UIViewController()

        let frame = vc.view.frame

        let webView = PortalWebView(frame: frame, portal: self.portal)
        onBridgeAvailable(webView.bridge)
        
        webView.translatesAutoresizingMaskIntoConstraints = false
        vc.view.addSubview(webView)
        
        NSLayoutConstraint.activate([
            webView.topAnchor
                .constraint(equalTo: vc.view.safeAreaLayoutGuide.topAnchor),
            webView.leadingAnchor
                .constraint(equalTo: vc.view.safeAreaLayoutGuide.leadingAnchor),
            webView.trailingAnchor
                .constraint(equalTo: vc.view.safeAreaLayoutGuide.trailingAnchor),
            webView.bottomAnchor
                .constraint(equalTo: vc.view.safeAreaLayoutGuide.bottomAnchor),
        ])

        return vc
    }

    public func updateUIViewController(_ uiViewController: UIViewController,
                                context: Context) {
    }
}
