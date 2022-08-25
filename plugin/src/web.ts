import { WebPlugin } from '@capacitor/core';

import {
  PortalMessage,
  PortalsPlugin,
  PortalSubscription,
  SubscribeOptions,
  SubscriptionCallback,
} from './definitions';

export class PortalsWeb extends WebPlugin implements PortalsPlugin {
  async publish(_message: PortalMessage): Promise<void> { }
  async subscribe<T = unknown>(_options: SubscribeOptions, _callback: SubscriptionCallback<T>): Promise<PortalSubscription> { return null as any; }
  async unsubscribe(_options: PortalSubscription): Promise<void> { }
  async echo(options: { value: string; }): Promise<{ value: string; }> {
    return options;
  }
}
