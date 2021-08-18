/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Plugins } from '@capacitor/core';

import { PortalMessage, IonicPortalsPlugin, PortalSubscription, SubscribeOptions, SubscriptionCallback } from './definitions';
import { getInitialContext } from './shared';

export class PortalsIOS implements IonicPortalsPlugin {

  async publish(message: PortalMessage): Promise<void> {
    return Plugins.IonicPortals.publishNative(message);
  }

  async subscribe<T = unknown>(options: SubscribeOptions, callback: SubscriptionCallback<T>): Promise<PortalSubscription> {
    return new Promise((res) => {
      let subscribed = false;
      Plugins.IonicPortals.subscribeNative(options, (result: any) => {
        if (!subscribed) {
          res(result);
          subscribed = true;
        } else {
          callback(result);
        }
      });
    });
  }

  async unsubscribe(options: PortalSubscription): Promise<void> {
    return Plugins.IonicPortals.unsubscribeNative(options);
  }

  async getInitialContext<T>() {
    return getInitialContext<T>();
  }
}
