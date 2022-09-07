## 0.6.0 (2022-09-07)

## [0.5.0](https://github.com/ionic-team/ionic-portals/compare/0.4.2...0.5.0) (2022-02-16)

**Note:** Version bump only for package root

### [0.4.2](https://github.com/ionic-team/ionic-portals/compare/0.4.1...0.4.2) (2022-02-10)


### Features

* **android:** support custom FragmentManager ([#119](https://github.com/ionic-team/ionic-portals/issues/119)) ([4fc92dd](https://github.com/ionic-team/ionic-portals/commit/4fc92dde2389978b8fe521aa9ae718246b00f0c4))


### Bug Fixes

* **ios:** if manually syncing, apply portal live update instance data cached in UserDefaults ([#117](https://github.com/ionic-team/ionic-portals/issues/117)) ([4d9e752](https://github.com/ionic-team/ionic-portals/commit/4d9e752dc917ffb73902becf97c4910ae8816c76))

### [0.4.1](https://github.com/ionic-team/ionic-portals/compare/0.4.0...0.4.1) (2022-01-27)


### Bug Fixes

* **android:** restore portal link when fragment recreated ([#114](https://github.com/ionic-team/ionic-portals/issues/114)) ([8ab627e](https://github.com/ionic-team/ionic-portals/commit/8ab627e3ae7af079a095e9deb5a59e13ec7ceffa))
* Remove missing .xcframework files ([#113](https://github.com/ionic-team/ionic-portals/issues/113)) ([e9aac61](https://github.com/ionic-team/ionic-portals/commit/e9aac611ebe05d5d52f503486ac26eb6a7f25709))

## [0.4.0](https://github.com/ionic-team/ionic-portals/compare/0.3.1...0.4.0) (2022-01-18)

### [0.3.1](https://github.com/ionic-team/ionic-portals/compare/0.3.0...0.3.1) (2021-12-17)


### Bug Fixes

* **android:** exception when re-adding a portal fragment within a pager ([#103](https://github.com/ionic-team/ionic-portals/issues/103)) ([0026e60](https://github.com/ionic-team/ionic-portals/commit/0026e601ba6c847e463de010b21ce203389f9ce1))

## [0.3.0](https://github.com/ionic-team/ionic-portals/compare/0.3.0-pre...0.3.0) (2021-11-18)


### Features

* Add Github Action to generate .xcframwork on release ([#93](https://github.com/ionic-team/ionic-portals/issues/93)) ([2158843](https://github.com/ionic-team/ionic-portals/commit/215884321f037feeea07a8cb09246bc1264b8d19))
* **ios:** diverse use cases via [@objc](https://github.com/objc) ([#91](https://github.com/ionic-team/ionic-portals/issues/91)) ([39ee7f7](https://github.com/ionic-team/ionic-portals/commit/39ee7f7d2945420a7e3ef24064ea951f2c7e0e48))


### Bug Fixes

* **android:** replaced fragment tried to re-instantiate with null portal ([#95](https://github.com/ionic-team/ionic-portals/issues/95)) ([ccccb6a](https://github.com/ionic-team/ionic-portals/commit/ccccb6a5a7eba8f235a7674518a62add2f2c1670))
* **android:** replaced old bridgefragment layout with new portal layout ([#96](https://github.com/ionic-team/ionic-portals/issues/96)) ([4ca463a](https://github.com/ionic-team/ionic-portals/commit/4ca463ab8cfff70e783b99ac5231f339508b2265))
* Carthage requirement for bundling Capacitor/Cordova ([4f655ad](https://github.com/ionic-team/ionic-portals/commit/4f655adbb1279a808e26c32a252cb46bcb96eb04))
* Do not embed self framework ([4e15620](https://github.com/ionic-team/ionic-portals/commit/4e15620ee4872c4f047597d73cffadf8b21b9cca))
* Remove dependency from correct project ([b88e673](https://github.com/ionic-team/ionic-portals/commit/b88e67367d140016fb2d8269a07b10f8048fb57c))

## [0.3.0-pre](https://github.com/ionic-team/ionic-portals/compare/0.2.2...0.3.0-pre) (2021-11-04)


### Features

* Support Carthage XCFrameworks ([#88](https://github.com/ionic-team/ionic-portals/issues/88)) ([3b8ab2a](https://github.com/ionic-team/ionic-portals/commit/3b8ab2a03f588321ac53827a77b01b537298141b))

### [0.2.2](https://github.com/ionic-team/ionic-portals/compare/0.2.1...0.2.2) (2021-10-15)


### Bug Fixes

* **android:** readme and to incr. version ([f1524da](https://github.com/ionic-team/ionic-portals/commit/f1524dad01c9121b15cc88cfa158909e507be80c))

### [0.2.1](https://github.com/ionic-team/ionic-portals/compare/0.2.0...0.2.1) (2021-09-27)


### Bug Fixes

* **android:** expose Capacitor dependency through Portals library ([#59](https://github.com/ionic-team/ionic-portals/issues/59)) ([f95d43f](https://github.com/ionic-team/ionic-portals/commit/f95d43f337821b2aafdaba1a58fbb50c0fcc6d30))
* **ios:** remove unused method ([#55](https://github.com/ionic-team/ionic-portals/issues/55)) ([ac46b82](https://github.com/ionic-team/ionic-portals/commit/ac46b822c1e92048b58812a54ed2cc22b676a9a2))

## [0.2.0](https://github.com/ionic-team/ionic-portals/compare/2d3a9b2981738d3584d00a829a8677179bce229f...0.2.0) (2021-09-14)


### Features

* Android Portal Lib ([dd9308d](https://github.com/ionic-team/ionic-portals/commit/dd9308df2b22c9902e0fcb6d0a006e33db5d5cc8))
* **android:** add package publish to native-portal org ([9a01e46](https://github.com/ionic-team/ionic-portals/commit/9a01e469a4f60191aa88f837a4fc6a6105d4698e))
* **android:** Portal Manager first pass for android ([2d3a9b2](https://github.com/ionic-team/ionic-portals/commit/2d3a9b2981738d3584d00a829a8677179bce229f))
* **android:** registration logic with error display ([#28](https://github.com/ionic-team/ionic-portals/issues/28)) ([bd9a92d](https://github.com/ionic-team/ionic-portals/commit/bd9a92de7cc1d80683903835e67dfeb4386dbfd5))
* **android:** require registration for Portals to function ([5137f64](https://github.com/ionic-team/ionic-portals/commit/5137f64e5da07c3215ddc041c29b77aef877a3f7))
* **android:** update the portals registration URL ([#25](https://github.com/ionic-team/ionic-portals/issues/25)) ([4084eb1](https://github.com/ionic-team/ionic-portals/commit/4084eb176d0b233f940731bbdf2edffbd61d2043))
* ios pub/sub changes and api updates ([#14](https://github.com/ionic-team/ionic-portals/issues/14)) ([e923499](https://github.com/ionic-team/ionic-portals/commit/e923499302005e312cb9412b498ba9b34504a6f6))
* ios registration gateway screen ([7eb3ce1](https://github.com/ionic-team/ionic-portals/commit/7eb3ce1628365c16e31a7e3282ec0568195b4124))
* **ios:** Add PortalManager class, stub out Portal and PortalBuilder files ([e847447](https://github.com/ionic-team/ionic-portals/commit/e8474478b0a1bc50730dbdd8509bfc73d75250fb))
* **ios:** adding ios libs ([26bb9ce](https://github.com/ionic-team/ionic-portals/commit/26bb9ce981668157f07441502713eda8ce419eab))
* **iOS:** PortalBuilder class ([619795f](https://github.com/ionic-team/ionic-portals/commit/619795f4fb27d16babe615c563ce9f5fb64df1cc))
* **ios:** registration error logic ([5a00853](https://github.com/ionic-team/ionic-portals/commit/5a0085344d8ac0f43b64c7ce6a69ed09ba1a20c8))
* **ios:** Scaffolded iOS project ([e00ace9](https://github.com/ionic-team/ionic-portals/commit/e00ace93512994001fe60107d15c54cd65fab530))


### Bug Fixes

* **android:** rename portal package correctly ([c7b9a4c](https://github.com/ionic-team/ionic-portals/commit/c7b9a4c4753f30c1401a64a4ee8e0bae5cfc8018))
* **iOS:** Add podspec and podfile to project ([52a4090](https://github.com/ionic-team/ionic-portals/commit/52a409048e2d4860e5afe692b711326eff8397f2))

