import { IGuildCreatePayloadData } from './ApiTypes.ts';
import { IGuild } from './ApiTypes.ts';
import type { IntentFlags } from './Constants.ts';

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

export interface IConstructor {
  new (...args: any[]): any;
}

export interface ToJSON {
  toJSON(): Record<string, unknown>;
}

export interface ToString {
  toString(): string;
}

export interface Eq<T> {
  eq(other: T): boolean;
}

// Functions
export const isArray = (val: unknown): val is unknown[] =>
  val instanceof Array && Array.isArray(val);

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const isGuildHasExtraFields = (
  val: IGuild | IGuildCreatePayloadData
): val is IGuildCreatePayloadData =>
  [
    'joined_at',
    'large',
    'unavailable',
    'member_count',
    'voice_states',
    'members',
    'channels',
    'threads',
    'presences',
    'stage_instances',
    'guild_scheduled_events'
  ].every((field) => field in val);
