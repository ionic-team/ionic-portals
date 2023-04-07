import { registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

import type {
  InitialContext,
  PortalMessage,
  PortalsPlugin,
  SubscribeOptions,
  SubscriptionCallback,
} from './definitions';

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
});

/**
 * Provides access to any initial state provided by the native application.
 * If the web application is running in a Portal, this will always be defined
 * with the name property.
 * */
export function getInitialContext<T = unknown>():
  | InitialContext<T>
  | undefined {
  return (window as any).portalInitialContext;
}

export function subscribe<T = unknown>(
  options: SubscribeOptions,
  callback: SubscriptionCallback<T>,
): Promise<PluginListenerHandle> {
  return Portals.addListener(options.topic, callback);
}

export function publish<TMessage extends PortalMessage>(
  message: TMessage,
): Promise<void> {
  return Portals.publishNative(message);
}

export * from './definitions';
