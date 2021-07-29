import type { InitialContext } from './definitions';

export async function getInitialContext<T = unknown>(): Promise<InitialContext<T>> {
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
