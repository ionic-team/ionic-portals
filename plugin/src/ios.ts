/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Plugins } from '@capacitor/core';

import type { ClearMessageListener, PortalCallback, PortalMessage, PortalsPlugin } from './definitions';
import { getInitialContext } from './shared';

export class PortalsIOS implements PortalsPlugin {
  async echo(options: { value: string; }): Promise<{ value: string; }> {
    console.log('ECHO', options);
    return options;
  }

  async clearListener(listener: ClearMessageListener) {
    return Plugins.PortalsPlugin.clearListener(listener);
  }

  async listenForMessages(callback: PortalCallback) {
    return Plugins.PortalsPlugin.listenForMessages(callback);
  }

  async sendMessage(message: PortalMessage) {
    return Plugins.PortalsPlugin.sendMessage(message);
  }

  async getInitialContext<T>() {
    return getInitialContext<T>();
  }
}
