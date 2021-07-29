import { WebPlugin } from '@capacitor/core';

import {
  ClearMessageListener,
  InitialContext,
  PortalCallback,
  PortalMessage,
  PortalsPlugin,
} from './definitions';
import { getInitialContext } from './shared';

export class PortalsWeb extends WebPlugin implements PortalsPlugin {
  async clearListener(_listener: ClearMessageListener) {}
  async sendMessage(_message: PortalMessage) {}
  async listenForMessages(_callback: PortalCallback) {
    return '';
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getInitialContext<T>(): Promise<InitialContext<T>> {
    return getInitialContext<T>();
  }
}
