import { Collection } from '../../deps.ts';
import { URLManager } from '../../Managers/URLManager.ts';
import {
  defineReadonlyProperty,
  delay,
  isInstanceOf,
  isNumber,
  isObject,
  isString,
  toObject
} from '../../Utils/Utils.ts';
// Packing and unpacking library for ETF encoding
import { pack as ETFPack, unpack as ETFUnpack } from 'https://deno.land/x/void@1.0.4/mod.ts';

import {
  GatewayIntentBits,
  RESTGetAPIGatewayBotResult
} from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import type { ToString } from '../../Utils/Types.ts';
import { ClientEvents, type Client } from '../Client.ts';
import { EventManager } from './Events/EventManager.ts';
import { Shard, ShardState } from './Shard.ts';

/**
 * @class
 * @extends {EventEmitter}
 * @implements {ToString}
 */
export class WebSocketManager implements ToString {
  /**
   * Client instance for WebSocketManager
   */
  public declare readonly client: Client;
  // Maximum concurrency. null if new instance created
  #maxConcurrency: number | null = null;
  /**
   * Shard collection
   */
  public declare readonly shards: Collection<number, Shard>;
  #state: WebSocketManagerState;
  #options: Required<WebSocketManagerOptions>;
  // Increased concurrency count on each shard connection
  #concurrencyCount = 0;
  /**
   * For compressed JSON encoding
   */
  public declare readonly decoder: TextDecoder;
  /**
   *Manager class for gateway dispatch events
   */
  public declare readonly events: EventManager;
  // Total guild count
  #totalGuildCount = 0;

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

    // Define readonly properties
    defineReadonlyProperty(this, 'client', client);
    defineReadonlyProperty(this, 'shards', new Collection());
    defineReadonlyProperty(this, 'decoder', new TextDecoder());
    defineReadonlyProperty(this, 'events', new EventManager(this));

    this.#state = WebSocketManagerState.Disconnected;
    this.#options = Object.assign(
      { largeThreshold: 50, compress: false, encoding: 'json', shardCount: 'auto' },
      options
    ) as Required<WebSocketManagerOptions>;

    // Register all events.
    this.events.registerAll();
  }

  /**
   * Connect to the gateway
   * @returns
   */
  public async connect() {
    this.#debug(`Connecting to gateway...`);
    // If the state is already connected, return
    if (this.#state === WebSocketManagerState.Connected) return Promise.resolve();
    // Set state to connecting
    this.#state = WebSocketManagerState.Connecting;
    // Get concurrency limit and recommended shard amount
    const { shards, session_start_limit } = await this.client.rest.get<RESTGetAPIGatewayBotResult>(
      URLManager.gatewayBot()
    );
    this.#maxConcurrency = session_start_limit.max_concurrency;
    if (this.#options.shardCount === 'auto') this.#options.shardCount = shards;
    const connectTime = Date.now();
    // Shards
    this.#createShards();
    await this.#tryConnectShards();

    // Set state to connected
    this.#state = WebSocketManagerState.Connected;
    this.#debug(`Connected to gateway took ${Date.now() - connectTime}ms.`);
  }

  /**
   * Create shards
   */
  #createShards() {
    for (let i = 0; i < this.#options.shardCount; i++) {
      // Create a new shard
      const shard = new Shard(this, i);
      // Add the shard to the collection
      this.shards.set(shard.id, shard);
    }
  }

  /**
   * Try to connect the shards
   */
  async #tryConnectShards() {
    for await (const [_, shard] of this.shards) {
      if (this.#concurrencyCount >= this.#maxConcurrency!) {
        // Wait for 5 seconds
        await delay(5000);
        // Reset the concurrency count
        this.#concurrencyCount = 0;
      }

      // If the shard is not connected, connect it
      if (shard.state === ShardState.Disconnected) {
        // It waits until the READY event is triggered on the shard.
        await shard.connect();
        // Trigger client event.
        this.client.emit(ClientEvents.ShardReady, shard);
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
    return this.#options.encoding === 'etf' && isInstanceOf(data, Uint8Array)
      ? ETFUnpack(data)
      : JSON.parse(data as string);
  }

  #reset() {
    this.#state = WebSocketManagerState.Disconnected;
    this.#concurrencyCount = 0;
    this.#totalGuildCount = 0;
  }

  /**
   *
   * Disconnect from the gateway
   */
  public disconnect() {
    if (this.#state === WebSocketManagerState.Disconnected) return Promise.resolve();
    this.#reset();
    this.shards.forEach((shard) => {
      shard.disconnect();
      this.shards.delete(shard.id);
    });
    this.#state = WebSocketManagerState.Disconnected;
    this.#debug(`Disconnected from gateway.`);
  }

  /**
   * Reconnect to the gateway
   */
  public async reconnect() {
    if (this.#state === WebSocketManagerState.Reconnecting) return;
    this.#state = WebSocketManagerState.Reconnecting;
    this.#debug(`Reconnecting to gateway...`);
    await this.connect();
    this.#state = WebSocketManagerState.Connected;
    this.#debug(`Reconnected to gateway.`);
  }

  public toString() {
    return `${this.constructor.name} (state ${this.#state}, shards: ${this.shards.size})`;
  }

  #debug(message: string) {
    this.client.debug(`[Dinord => WebSocketManager]: ${message}`);
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(
      toObject(this, ['client', 'shards', 'state', 'options', 'decoder', 'events', 'totalGuildCount', 'ping']),
      options
    );
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
   * Total guild size
   */
  public get totalGuildCount() {
    return this.#totalGuildCount;
  }

  public set totalGuildCount(count: number) {
    if (!isNumber(count) || count < 0) throw new TypeError('Total guild count must be a number greater than 0');
    this.#totalGuildCount = count;
  }

  /**
   * Ping of Client
   */
  public get ping() {
    const pings = this.shards.reduce((acc, s) => s.ping + acc, 0);
    return pings > 0 ? pings / this.shards.size : -1;
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
  intents: GatewayIntentBits;
}

export type WSEncoding = 'json' | 'etf';
