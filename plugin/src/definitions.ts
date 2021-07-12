export interface PortalsPlugin {
  echo(options: { value: string; }): Promise<{ value: string; }>;
  getInitialContext<T = unknown>(): Promise<InitialContext<T>>;
}

export interface InitialContext<T = unknown> {
  name: string;
  value: T;
}
