import { WebPlugin } from '@capacitor/core';

import {
  InitialContext,
  PortalMessage,
  IonicPortalsPlugin,
  PortalSubscription,
  SubscribeOptions,
  SubscriptionCallback,
} from './definitions';
import { getInitialContext } from './shared';

export class PortalsWeb extends WebPlugin implements IonicPortalsPlugin {
  async publish(_message: PortalMessage): Promise<void> { }
  async subscribe<T = unknown>(_options: SubscribeOptions, _callback: SubscriptionCallback<T>): Promise<PortalSubscription> { return null as any; }
  async unsubscribe(_options: PortalSubscription): Promise<void> { }
  async echo(options: { value: string; }): Promise<{ value: string; }> {
    return options;
  }
  async getInitialContext<T>(): Promise<InitialContext<T>> {
    return getInitialContext<T>();
  }
}
