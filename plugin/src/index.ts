import { registerPlugin } from '@capacitor/core';

import type { IonicPortalsPlugin } from './definitions';

const IonicPortals = registerPlugin<IonicPortalsPlugin>('IonicPortals', {
  web: () => import('./web').then(m => new m.PortalsWeb()),
  android: () => import('./android').then(m => new m.PortalsAndroid()),
  ios: () => import('./ios').then(m => new m.PortalsIOS())
});

export * from './definitions';
export default IonicPortals;
