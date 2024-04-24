import { Capacitor, WebPlugin, registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

/**
 *
 * A type definining the `InitialContext` from the native application that you can pass into your web application.
 */
export interface InitialContext<T = unknown> {
  name: string;
  value?: T;
  assets?: {
    [key: string]: string;
  };
}

/**
 * A message that you can publish to a topic using Portals.publish()
 */
export interface PortalMessage<TData = any> {
  topic: string;
  data?: TData;
}

interface PortalsPlugin {
  publishNative<TMessage extends PortalMessage>(
    message: TMessage,
  ): Promise<void>;
  addListener<T = unknown>(
    eventName: string,
    listenerFunc: (result: PortalMessage<T>) => void,
  ): Promise<PluginListenerHandle>
}

class PortalsWeb extends WebPlugin implements PortalsPlugin {
  async publishNative(_message: PortalMessage): Promise<void> {
    return Promise.resolve();
  }
  addListener<T = unknown>(_eventName: string, _listenerFunc: (result: PortalMessage<T>) => void): Promise<PluginListenerHandle> {
    return Promise.reject('Method not implemented on web.')
  }
}

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => new PortalsWeb(),
});

/**
 * Provides access to any initial state provided by the native application.
 * If the web application is running in a Portal, this will always be defined
 * with the name property.
 * */
export function getInitialContext<T = unknown>():
  | InitialContext<T>
  | undefined {
  if (Capacitor.getPlatform() === 'android') {
    // eslint-disable-next-line
    //@ts-ignore
    return JSON.parse(AndroidInitialContext.initialContext());
  } else {
    return (window as any).portalInitialContext;
  }
}

export function subscribe<T = unknown>(
  topic: string,
  callback: (result: PortalMessage<T>) => void,
): Promise<PluginListenerHandle> {
  return Portals.addListener(topic, callback);
}

export function publish<TMessage extends PortalMessage>(
  message: TMessage,
): Promise<void> {
  return Portals.publishNative(message);
}
