# Used for local reference only

Pod::Spec.new do |s|
  s.name = 'IonicPortals'
  s.module_name = 'IonicPortals'
  s.version = '0.0.1'
  s.summary = 'Ionic Portals SDK for iOS'
  s.license = 'Commercial'
  s.homepage = 'https://ionic.io/portals'
  s.ios.deployment_target  = '12.0'
  s.authors = { 'Ionic Team' => 'hi@ionicframework.com' }
  s.source = { :git => 'https://github.com/ionic-team/ionic-portals.git' }
  s.source_files = 'IonicPortals/IonicPortals/*.{swift,h,m}'
  s.resources = ['IonicPortals/IonicPortals/**/*.{xib,xcassets,svg}']
  s.dependency 'Capacitor'
  s.swift_version = '5.1'
end
