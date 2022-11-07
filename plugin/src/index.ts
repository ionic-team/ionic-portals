import { registerPlugin } from '@capacitor/core';

import type { InitialContext, PortalsPlugin } from './definitions';

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
  android: () => import('./android').then(m => new m.PortalsAndroid()),
  ios: () => import('./ios').then(m => new m.PortalsIOS())
});

/**
 * Provides access to any initial state provided by the native application.
 * If the web application is running in a Portal, this will always be defined
 * with the name property.
 * */
export function getInitialContext<T = unknown>(): InitialContext<T> | undefined {
  return (window as any).portalInitialContext;
}

export * from './definitions';
export default Portals;
