import { EventEmitter } from '../deps.ts';

export class TypedEmitter<T extends Record<string | symbol, unknown[]>>
  extends EventEmitter {
  declare addListener: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
  declare on: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[]) => void,
  ) => this;
  declare once: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
  declare removeListener: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
  declare off: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
  declare removeAllListeners: <E extends keyof T>(event?: E) => this;
  declare rawListeners: <E extends keyof T>(
    eventName: string | symbol,
  ) => ((...args: T[E]) => void)[];
  declare emit: <E extends keyof T>(eventName: E, ...args: T[E]) => boolean;
  declare listenerCount: <E extends keyof T>(eventName: E) => number;
  declare prependListener: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
  declare prependOnceListener: <E extends keyof T>(
    eventName: E,
    listener: (...args: T[E]) => void,
  ) => this;
}
