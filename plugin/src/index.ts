import { registerPlugin } from '@capacitor/core';

import type { PortalsPlugin } from './definitions';

const Portals = registerPlugin<PortalsPlugin>('Portals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
  android: () => import('./android').then(m => new m.PortalsAndroid()),
  ios: () => import('./ios').then(m => new m.PortalsIOS())
});

export * from './definitions';
export default Portals;
