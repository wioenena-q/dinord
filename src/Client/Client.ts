import { Collection, EventEmitter } from '../deps.ts';
import { URLManager } from '../Managers/URLManager.ts';
import { isInstanceOf, isObject, isString, toObject } from '../Utils/Utils.ts';
import { ClientUser } from './ClientUser.ts';
import { WebSocketManager, type WebSocketManagerOptions } from './ws/WebSocketManager.ts';

import type { Snowflake } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/global.ts';
import type { Guild } from '../Structures/Guild/Guild.ts';
import type { User } from '../Structures/User.ts';
import type { ToObject } from '../Utils/Types.ts';

/**
 * @class
 * @classdesc Client class for the Discord API
 */
export class Client extends EventEmitter<ClientEvents> implements ToObject {
  #ws: WebSocketManager;
  #guilds: Collection<Snowflake, Guild>;
  #users: Collection<Snowflake, User>;
  #user: ClientUser | null;
  #options: ClientOptions;

  /**
   *
   * @param {ClientOptions} options - Options for the Client
   */
  public constructor(options: ClientOptions) {
    super();
    if (!isObject(options)) throw new TypeError('Client options must be an object');

    this.#options = Object.assign({ token: null }, options);

    // Create caches
    this.#guilds = new Collection();
    this.#users = new Collection();

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
  public login(token?: string): Promise<void> {
    // If token is not in the options and not sent as a parameter, it will throw an error.
    if (this.#options.token === null && !isString(token)) throw new Error('No token provided');

    this.#options.token ??= token;
    // If token type is not string, it will throw an error.
    if (!isString(this.#options.token)) throw new TypeError('Token must be a string');

    this.#ws.connect();

    return Promise.resolve(void 0);
  }

  /**
   * Disconnect to gateway
   */
  public destroy() {
    this.#ws.close();
  }

  public toObject() {
    return toObject(this, ['ws', 'user', 'guilds', 'users', 'options']);
  }

  /**
   * Set Client#user to null or an instance from ClientUser
   * @param {ClientUser|null} user - ClientUser instance or null
   */
  public set user(user: ClientUser | null) {
    if (user !== null && !isInstanceOf(user, ClientUser))
      throw new TypeError('user must be an instance of ClientUser');

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
}

/**
 * @typedef {Object} ClientOptions
 * @property {string} [token] - Token to use for the client. Not required if the token will be specified at login method
 * @property {WebSocketManagerOptions} [ws] - Options for the WebSocketManager
 */
export interface ClientOptions {
  ws: WebSocketManagerOptions;
  token?: string;
}

export type ClientEvents = {};
