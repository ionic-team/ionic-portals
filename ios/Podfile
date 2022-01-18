# source 'https://github.com/native-portal/podspecs.git'

platform :ios, '12.0'
workspace 'IonicPortals'

def testapp_pods
  # none
end

def capacitor_pods
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!
  pod 'Capacitor'
  pod 'CapacitorCordova'
  pod 'IonicLiveUpdates'
end

target 'IonicPortals' do
  project './IonicPortals/IonicPortals.xcodeproj'
  capacitor_pods
end

target 'PortalsTestApp (iOS)' do
  project './PortalsTestApp/PortalsTestApp.xcodeproj'
  capacitor_pods
  testapp_pods
end
