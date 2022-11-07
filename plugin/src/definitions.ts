/**
 * A type definining the `PortalsPlugin` API.
 */
export interface PortalsPlugin {
  publish<TMessage extends PortalMessage>(message: TMessage): Promise<void>;
  subscribe<T = unknown>(options: SubscribeOptions, callback: SubscriptionCallback<T>): Promise<PortalSubscription>;
  unsubscribe(options: PortalSubscription): Promise<void>;
}

/**
 * A type definining the `InitialContext` from the native application that you can pass into your web application.
 */
export interface InitialContext<T = unknown> {
  name: string;
  value: T | undefined;
}

/**
 * A message that you can publish to a topic using Portals.publish()
 */
export interface PortalMessage<TData = any> {
  topic: string;
  data?: TData;
}

/**
 * Subscription options that you pass into your function when running Portals.subscribe()
 */
export interface SubscribeOptions {
  topic: string;
}

/**
 * The subscription created when running Portals.subscribe()
 */
export interface PortalSubscription {
  subscriptionRef: number;
  topic: string;
}

/**
 * The type definition from the callback running Portals.subscribe()
 */
export type SubscriptionCallback<T = unknown> = (result: { topic: string, data: T; }) => void;
