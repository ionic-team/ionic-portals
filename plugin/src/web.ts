import { WebPlugin } from '@capacitor/core';

import type { PortalMessage, PortalsPlugin } from './definitions';

export class PortalsWeb extends WebPlugin implements PortalsPlugin {
  // eslint-disable-next-line
  async publishNative(_message: PortalMessage): Promise<void> { }
}
