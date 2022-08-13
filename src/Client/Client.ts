import { Collection, EventEmitter } from '../deps.ts';
import { URLManager } from '../Managers/URLManager.ts';
import { isObject, isString, toObject } from '../Utils/Utils.ts';
import { RESTClient } from './RESTClient.ts';
import { WebSocketManager, type WebSocketManagerOptions } from './ws/WebSocketManager.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import type { Guild } from '../Structures/Guild/Guild.ts';
import type { Shard } from './ws/Shard.ts';

/**
 * @class
 * @classdesc Client class for the Discord API
 */
export class Client extends EventEmitter<IClientEvents> {
  #ws: WebSocketManager;
  #guilds = new Collection<Snowflake, Guild>();
  #users = new Collection<Snowflake, unknown>();
  #user: null;
  #options: ClientOptions;
  #rest = new RESTClient(this);

  /**
   *
   * @param {ClientOptions} options - Options for the Client
   */
  public constructor(options: ClientOptions) {
    super();
    if (!isObject(options)) throw new TypeError('Client options must be an object');

    this.#options = Object.assign({ token: null }, options);

    // Set user to null. Populated when the Ready event is triggered
    this.#user = null;
    this.#ws = new WebSocketManager(this, this.#options.ws);

    // Initialize URLManager
    URLManager.init({
      api: { version: 10 },
      ws: {
        compress: this.#ws.options.compress,
        encoding: this.#ws.options.encoding
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
    if (this.#options.token === null && !isString(token)) throw new Error('No token provided');

    this.#options.token ??= token;
    // If token type is not string, it will throw an error.
    if (!isString(this.#options.token)) throw new TypeError('Token must be a string');

    await this.#ws.connect();

    return void 0;
  }

  /**
   * Disconnect to gateway
   */
  public destroy() {
    this.#ws.close();
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
    return inspect(toObject(this, ['ws', 'user', 'guilds', 'users', 'options']), options);
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

  /**
   * WebSocket manager for connection, reconnection, disconnection, shards, etc.
   */
  public get ws() {
    return this.#ws;
  }

  /**
   * Guild cache for this client.
   */
  public get guilds() {
    return this.#guilds;
  }

  /**
   * User cache for this client.
   */
  public get users() {
    return this.#users;
  }

  public get options() {
    return this.#options;
  }

  /**
   * REST client for requests to the Discord API.
   */
  public get rest() {
    return this.#rest;
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
  Debug = 'debug'
}
