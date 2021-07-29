export interface PortalsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getInitialContext<T = unknown>(): Promise<InitialContext<T>>;
  clearListener(listener: ClearMessageListener): Promise<void>;
  listenForMessages(callback: PortalCallback): Promise<CallbackID>;
  sendMessage(message: PortalMessage): Promise<void>;
}

export interface InitialContext<T = unknown> {
  name: string;
  value: T;
}

export type CallbackID = string;

export type PortalCallback = (message: PortalMessage | null, err?: any) => void;

export interface PortalMessage {
  message: string;
  payload?: any;
}

export interface ClearMessageListener {
  id: CallbackID;
}
