require 'json'

Pod::Spec.new do |s|
  s.name = 'IonicPortals'
  s.version = '0.0.1'
  s.summary = 'Portals Description'
  s.license = 'Portals License'
  s.homepage = 'https://ionic.io/portals'
  s.author = 'Ionic'
  s.source_files = 'IonicPortals/**/*.{swift,h,m,c,cc,mm,cpp}'
  s.source = { :git => 'https://github.com/ionic-team/ionic-portals.git' }
  s.ios.deployment_target  = '12.0'
  s.dependency 'Capacitor'
  s.swift_version = '5.1'
end
