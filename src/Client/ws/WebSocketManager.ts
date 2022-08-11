import { IntentFlags } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/api/v10/mod.ts';
import { Collection } from '../../deps.ts';
import { URLManager } from '../../Managers/URLManager.ts';
import { isInstanceOf, isNumber, isObject, isString, toObject, wait } from '../../Utils/Utils.ts';
// Etf unpacking and packing library
import { pack as ETFPack, unpack as ETFUnpack } from 'https://deno.land/x/void@1.0.4/mod.ts';

import type { ToObject, ToString } from '../../Utils/Types.ts';
import { ClientEvents, type Client } from '../Client.ts';
import { Shard, ShardState } from './Shard.ts';

/**
 * @class
 * @extends {EventEmitter}
 * @implements {ToObject, ToString}
 */
export class WebSocketManager implements ToObject, ToString {
  #client: Client;
  // Maximum concurrency. null if new instance created
  #maxConcurrency: number | null = null;
  #shards = new Collection<number, Shard>();
  #state: WebSocketManagerState;
  #options: Required<WebSocketManagerOptions>;
  // Increased concurrency count on each shard connection
  #concurrencyCount = 0;
  #decoder = new TextDecoder();

  /**
   *
   * @param {Client} client - Client instance for WebSocketManager
   * @param {WebSocketManagerOptions} options - Options for the WebSocketManager
   */
  public constructor(client: Client, options: WebSocketManagerOptions) {
    if (!isObject(options)) throw new TypeError('WebSocketManager options must be an object');

    if (isNumber(options.largeThreshold) && (options.largeThreshold < 50 || options.largeThreshold > 250))
      throw new RangeError('WebSocketManager largeThreshold must be between 49 and 251');

    // If the options.shards is not a number or 'auto', it will throw an error.
    if (options.shardCount !== undefined) {
      if (!((isString(options.shardCount) && options.shardCount === 'auto') || isNumber(options.shardCount)))
        throw new TypeError('WebSocketManager shards must be a number or "auto"');
    }

    if (isString(options.encoding) && ['etf', 'json'].indexOf(options.encoding) === -1)
      throw new TypeError('WebSocketManager encoding must be either "etf" or "json"');

    if (!isNumber(options.intents)) throw new TypeError('WebSocketManager intents must be a number');

    this.#client = client;
    this.#state = WebSocketManagerState.Disconnected;
    this.#options = Object.assign(
      { largeThreshold: 50, compress: false, encoding: 'json', shardCount: 'auto' },
      options
    ) as Required<WebSocketManagerOptions>;
  }

  /**
   * Connect to the gateway
   * @returns
   */
  public async connect() {
    // If the state is already connected, return
    if (this.#state === WebSocketManagerState.Connected) return Promise.resolve();
    // Set state to connecting
    this.#state = WebSocketManagerState.Connecting;
    // Get concurrency limit and recommended shard amount
    const { shards, session_start_limit } = (await this.#client.rest.get(URLManager.gatewayBot())) as any; // TODO: remove any
    this.#maxConcurrency = session_start_limit.max_concurrency;
    if (this.#options.shardCount === 'auto') this.#options.shardCount = shards;

    // Shards
    this.#createShards();
    await this.#tryConnectShards();

    // Set state to connected
    this.#state = WebSocketManagerState.Connected;
  }

  /**
   * Create shards
   */
  #createShards() {
    for (let i = 0; i < this.#options.shardCount; i++) {
      // Create a new shard
      const shard = new Shard(this, i);
      // Add the shard to the collection
      this.#shards.set(shard.id, shard);
    }
  }

  /**
   * Try to connect the shards
   */
  async #tryConnectShards() {
    for await (const [_, shard] of this.#shards) {
      if (this.#concurrencyCount >= this.#maxConcurrency!) {
        // Wait for 5 seconds
        await wait(5000);
        // Reset the concurrency count
        this.#concurrencyCount = 0;
      }

      // If the shard is not connected, connect it
      if (shard.state === ShardState.Disconnected) {
        // It waits until the READY event is triggered on the shard.
        await shard.connect();
        // Trigger client event.
        this.#client.emit(ClientEvents.ShardReady, shard);
        // Increase the concurrency count
        this.#concurrencyCount++;
      }
    }
  }

  /**
   * Packs data
   * @param data - Data to be packed
   * @returns
   */
  public pack(data: unknown): string | Uint8Array {
    return this.#options.encoding === 'etf' ? ETFPack(data) : JSON.stringify(data);
  }

  /**
   * Unpacks data
   * @param data - Data to be unpacked
   * @returns
   */
  public unpack(data: string | Uint8Array) {
    return this.#options.encoding === 'etf' && isInstanceOf<Uint8Array>(data, Uint8Array)
      ? ETFUnpack(data)
      : JSON.parse(data as string);
  }

  /**
   * Disconnect from the gateway
   * TODO: Implement
   */
  public close() {
    throw new Error('Not implemented');
  }

  toObject() {
    return toObject(this, ['shards', 'state', 'options']);
  }

  public toString() {
    return `${this.constructor.name} (state ${this.#state}, shards: ${this.#shards.size})`;
  }

  public get client() {
    return this.#client;
  }

  /**
   * Shard collection
   */
  public get shards() {
    return this.#shards;
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

  /**
   * For compressed JSON encoding
   */
  public get decoder() {
    return this.#decoder;
  }
}

export const enum WebSocketManagerState {
  Connecting,
  Connected,
  Reconnecting,
  Disconnected
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
  shardCount?: number | 'auto';
  largeThreshold?: number;
  compress?: boolean;
  encoding?: WSEncoding;
  intents: IntentFlags;
}

export type WSEncoding = 'json' | 'etf';
