import { registerPlugin } from '@capacitor/core';

import type { InitialContext, PortalsPlugin } from './definitions';

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
  android: () => import('./android').then(m => new m.PortalsAndroid()),
  ios: () => import('./ios').then(m => new m.PortalsIOS())
});

export function getInitialContext<T = unknown>(): InitialContext<T> {
  const context = (window as any).portalInitialContext as { name: string, value: T; };
  if (!context) {
    throw Error('No initial context found');
  } else {
    return {
      name: context.name,
      value: context.value
    };
  }
}

export * from './definitions';
export default Portals;
