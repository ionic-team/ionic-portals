require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name = 'IonicPortals'
  s.version = package['version']
  s.summary = 'Ionic Portals'
  s.social_media_url = 'https://twitter.com/capacitorjs'
  s.license = 'Commercial'
  s.homepage = 'https://ionic.io/portals'
  s.ios.deployment_target  = '12.0'
  s.authors = { 'Ionic Team' => 'hi@ionicframework.com' }
  s.source = { :git => 'https://github.com/ionic-team/ionic-portals.git', :tag => s.version.to_s }
  s.source_files = 'ios/IonicPortals/IonicPortals/*.{swift,h,m}'
  s.resources = ['ios/IonicPortals/IonicPortals/**/*.{xib,xcassets,svg}']
  s.dependency 'Capacitor'
  s.swift_version = '5.1'
end

