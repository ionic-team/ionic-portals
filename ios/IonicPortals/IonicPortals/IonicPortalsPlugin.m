#import <Capacitor/Capacitor.h>

CAP_PLUGIN(IonicPortalsPlugin, "IonicPortals",
  CAP_PLUGIN_METHOD(publishNative, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(subscribeNative, CAPPluginReturnCallback);
  CAP_PLUGIN_METHOD(unsubscribeNative, CAPPluginReturnPromise);
)
