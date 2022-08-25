import { registerPlugin } from '@capacitor/core';

import type { InitialContext, PortalsPlugin } from './definitions';

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
  android: () => import('./android').then(m => new m.PortalsAndroid()),
  ios: () => import('./ios').then(m => new m.PortalsIOS())
});

export function getInitialContext<T = unknown>(): InitialContext<T> | undefined {
  return (window as any).portalInitialContext as { name: string, value: T; };
}

export * from './definitions';
export default Portals;
