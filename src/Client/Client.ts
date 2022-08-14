import { Collection, EventEmitter, type Snowflake } from '../deps.ts';
import { URLManager } from '../Managers/URLManager.ts';
import { defineReadonlyProperty, isObject, isString, toObject } from '../Utils/Utils.ts';
import { RESTClient } from './RESTClient.ts';
import { WebSocketManager, type WebSocketManagerOptions } from './ws/WebSocketManager.ts';

import type { Guild } from '../Structures/Guild/Guild.ts';
import type { Shard } from './ws/Shard.ts';

export interface Client {
  on<E extends keyof IClientEvents>(eventName: E, listener: (...args: IClientEvents[E]) => void): this;
  on(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  once<E extends keyof IClientEvents>(eventName: E, listener: (...args: IClientEvents[E]) => void): this;
  once(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  emit<E extends keyof IClientEvents>(eventName: E, ...args: IClientEvents[E]): boolean;
  emit(eventName: string | symbol, ...args: unknown[]): boolean;
  off<E extends keyof IClientEvents>(eventName: E, listener: (...args: IClientEvents[E]) => void): this;
  off(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  removeAllListeners<E extends keyof IClientEvents>(eventName?: E): this;
  removeAllListeners(eventName?: string | symbol): this;
  listeners<E extends keyof IClientEvents>(eventName: E): Array<(...args: IClientEvents[E]) => void>;
  listeners(eventName: string | symbol): Array<(...args: unknown[]) => void>;
  rawListeners<E extends keyof IClientEvents>(eventName: E): Array<(...args: IClientEvents[E]) => void>;
  rawListeners(eventName: string | symbol): Array<(...args: unknown[]) => void>;
  listenerCount<E extends keyof IClientEvents>(type: E): number;
  listenerCount(type: string | symbol): number;
}

/**
 * @class
 * @classdesc Client class for the Discord API
 */
export class Client extends EventEmitter {
  /**
   * WebSocket manager for connection, reconnection, disconnection, shards, etc.
   */
  public declare readonly ws: WebSocketManager;
  /**
   * Guild cache for this client.
   */
  public declare readonly guilds: Collection<Snowflake, Guild>;
  /**
   * User cache for this client.
   */
  public declare readonly users: Collection<Snowflake, unknown>;
  #user: null;
  /**
   * Options for the Client
   */
  public declare readonly options: ClientOptions;
  /**
   * REST client for requests to the Discord API.
   */
  public declare readonly rest: RESTClient;

  /**
   *
   * @param {ClientOptions} options - Options for the Client
   */
  public constructor(options: ClientOptions) {
    super();
    if (!isObject(options)) throw new TypeError('Client options must be an object');

    // Set user to null. Populated when the Ready event is triggered
    this.#user = null;

    defineReadonlyProperty(this, 'options', Object.assign({ token: null }, options));
    defineReadonlyProperty(this, 'ws', new WebSocketManager(this, this.options.ws));
    defineReadonlyProperty(this, 'guilds', new Collection());
    defineReadonlyProperty(this, 'users', new Collection());
    defineReadonlyProperty(this, 'rest', new RESTClient(this));

    // Initialize URLManager
    URLManager.init({
      api: { version: 10 },
      ws: {
        compress: this.ws.options.compress,
        encoding: this.ws.options.encoding
      }
    });
  }

  /**
   * Connect to gateway
   * @param {string?} [token] - The token to use for the client.
   * @returns {Promise<void>}
   */
  public async login(token?: string): Promise<void> {
    // If token is not in the options and not sent as a parameter, it will throw an error.
    if (this.options.token === null && !isString(token)) throw new Error('No token provided');

    this.options.token ??= token;
    // If token type is not string, it will throw an error.
    if (!isString(this.options.token)) throw new TypeError('Token must be a string');

    await this.ws.connect();

    return void 0;
  }

  /**
   * Disconnect to gateway
   */
  public destroy() {
    this.guilds.clear();
    this.users.clear();
    this.rest.buckets.clear();
    return this.ws.disconnect();
  }

  /**
   * Reconnect to gateway
   */
  public reconnect() {
    return this.ws.reconnect();
  }

  /**
   *
   * If the client's debugMode option is active, it triggers the client's debug event and sends messages.
   * @param message - Debug message to send
   */
  public debug(message: string) {
    this.emit(ClientEvents.Debug, message);
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(toObject(this, ['ws', 'guilds', 'users', 'options', 'rest', 'user']), options);
  }

  /**
   * Set Client#user to null or an instance from ClientUser
   * @param {ClientUser|null} user - ClientUser instance or null
   */
  public set user(user: null) {
    if (user !== null) throw new TypeError('user must be an instance of ClientUser');

    this.#user = user;
  }

  /**
   * null unless client is ready
   */
  public get user() {
    return this.#user;
  }
}

/**
 * @typedef {Object} ClientOptions
 * @property {WebSocketManagerOptions} [ws] - Options for the WebSocketManager
 * @property {string} [token] - Token to use for the client. Not required if the token will be specified at login method
 */
export interface ClientOptions {
  ws: WebSocketManagerOptions;
  token?: string;
}

export type IClientEvents = {
  ready: [];
  guildCreate: [Guild];
  guildDelete: [Guild];
  guildUpdate: [Guild, Guild];
  shardReady: [Shard];
  debug: [string];
};
export const enum ClientEvents {
  Ready = 'ready',
  GuildCreate = 'guildCreate',
  GuildDelete = 'guildDelete',
  GuildUpdate = 'guildUpdate',
  ShardReady = 'shardReady',
  ShardDisconnect = 'shardDisconnect',
  Debug = 'debug'
}
