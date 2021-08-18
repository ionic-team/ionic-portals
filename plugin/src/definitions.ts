export interface IonicPortalsPlugin {
  getInitialContext<T = unknown>(): Promise<InitialContext<T>>;
  publish(message: PortalMessage): Promise<void>;
  subscribe<T = unknown>(options: SubscribeOptions, callback: SubscriptionCallback<T>): Promise<PortalSubscription>;
  unsubscribe(options: PortalSubscription): Promise<void>;
}
export interface InitialContext<T = unknown> {
  name: string;
  value: T;
}
export interface PortalMessage {
  topic: string;
  data?: any;
}
export interface SubscribeOptions {
  topic: string;
}
export interface PortalSubscription {
  subscriptionRef: number;
  topic: string;
}

export type SubscriptionCallback<T = unknown> = (result: { topic: string, data: T; }) => void;
