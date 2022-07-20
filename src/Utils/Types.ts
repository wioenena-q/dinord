import { IntentFlags } from './Constants.ts';

// Types
export type INullable<T> = T | null | undefined;

export interface IPayloads {
  op: number;
  d?: Record<string, unknown>;
  s?: number;
  t?: string;
}
export interface IClientConfig {
  token?: INullable<string>;
  intents: IntentFlags | IntentFlags[];
}

// Functions
export const isArray = (val: unknown): val is unknown[] =>
  val instanceof Array && Array.isArray(val);

export const isString = (val: unknown): val is string =>
  typeof val === 'string';
