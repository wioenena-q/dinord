import { IntentFlags } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/api/v10/mod.ts';
import { EventEmitter } from '../../deps.ts';
import { isNumber, isObject, isString, toObject } from '../../Utils/Utils.ts';

import type { ToObject } from '../../Utils/Types.ts';
import type { Client } from '../Client.ts';

/**
 * @class
 * @extends {EventEmitter}
 * @implements {ToObject}
 */
export class WebSocketManager extends EventEmitter<WebSocketManagerEvents> implements ToObject {
  #client: Client;
  // Connection queue for shard(s)
  #connectQueue: number[];
  // Maximum concurrency. null if new instance created
  #maxConcurrency: number | null = null;
  #state: WebSocketManagerState;
  #options: Required<WebSocketManagerOptions>;

  /**
   *
   * @param {Client} client - Client instance for WebSocketManager
   * @param {WebSocketManagerOptions} options - Options for the WebSocketManager
   */
  public constructor(client: Client, options: WebSocketManagerOptions) {
    if (!isObject(options)) throw new TypeError('WebSocketManager options must be an object');

    if (isNumber(options.largeThreshold) && (options.largeThreshold < 50 || options.largeThreshold > 250))
      throw new RangeError('WebSocketManager largeThreshold must be between 49 and 251');

    if (options.shards !== undefined && !isNumber(options.shards))
      throw new TypeError('WebSocketManager shards must be a number');

    if (isString(options.encoding) && ['etf', 'json'].indexOf(options.encoding) === -1)
      throw new TypeError('WebSocketManager encoding must be either "etf" or "json"');

    if (!isNumber(options.intents)) throw new TypeError('WebSocketManager intents must be a number');

    super();
    this.#client = client;
    this.#connectQueue = [];
    this.#state = WebSocketManagerState.Disconnected;
    this.#options = Object.assign(
      { largeThreshold: 50, compress: false, encoding: 'json', shards: 1 },
      options
    ) as Required<WebSocketManagerOptions>;
  }

  /**
   * Connect to the gateway
   * @returns
   */
  public async connect() {
    // If the state is already connected, return
    if (this.#state === WebSocketManagerState.Connected) return;
    // Set state to connecting
    this.#state = WebSocketManagerState.Connecting;

    // Set state to connected
    this.#state = WebSocketManagerState.Connected;
  }

  /**
   * Disconnect from the gateway
   * TODO: Implement
   */
  public close() {
    throw new Error('Not implemented');
  }

  toObject(): Record<string, unknown> {
    return toObject(this, ['state', 'options']);
  }

  public get client() {
    return this.#client;
  }

  /**
   * State of the WebSocketManager
   */
  public get state() {
    return this.#state;
  }

  public get options() {
    return this.#options;
  }
}

export type WebSocketManagerEvents = {};

export const enum WebSocketManagerState {
  Disconnecting,
  Disconnected,
  Connecting,
  Connected,
  Reconnecting
}

/**
 * @typedef {Object} WebSocketManagerOptions
 * @property {number} [shards] Maximum number of shards to use.
 * @property {number} [largeThreshold=50] if exists, must be between 49 and 251
 * @property {boolean} [compress=false] Whether to compress the data or not.
 * @property {WSEncoding} [encoding=WSEncoding.JSON] Encoding to use.
 * @property {IntentFlags} intents Intent flags to use.
 */
export interface WebSocketManagerOptions {
  shards?: number;
  largeThreshold?: number;
  compress?: boolean;
  encoding?: WSEncoding;
  intents: IntentFlags;
}

export type WSEncoding = 'json' | 'etf';
