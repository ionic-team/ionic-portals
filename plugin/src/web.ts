import { WebPlugin } from '@capacitor/core';

import {
  PortalMessage,
  PortalsPlugin,
  PortalSubscription,
  SubscribeOptions,
  SubscriptionCallback,
} from './definitions';

export class PortalsWeb extends WebPlugin implements PortalsPlugin {
  async publish(_message: PortalMessage): Promise<void> {}

  async subscribe<T = unknown>(_options: SubscribeOptions, _callback: SubscriptionCallback<T>): Promise<PortalSubscription> {
    return {
      subscriptionRef: -0,
      topic: ""
    }
  }

  async unsubscribe(_options: PortalSubscription): Promise<void> {}
}
