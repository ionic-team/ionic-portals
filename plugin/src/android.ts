/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Plugins } from '@capacitor/core';

import {
  ClearMessageListener,
  InitialContext,
  PortalCallback,
  PortalMessage,
  PortalsPlugin,
} from './definitions';
import { getInitialContext } from './shared';


export class PortalsAndroid implements PortalsPlugin {
  clearListener(listener: ClearMessageListener): Promise<void> {
    return Plugins.PortalsPlugin.clearListener(listener);
  }
  listenForMessages(callback: PortalCallback): Promise<string> {
    return Plugins.PortalsPlugin.listenForMessages(callback);
  }
  sendMessage(message: PortalMessage): Promise<void> {
    return Plugins.PortalsPlugin.sendMessage(message);
  }
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getInitialContext<T>(): Promise<InitialContext<T>> {
    return getInitialContext<T>();
  }
}
