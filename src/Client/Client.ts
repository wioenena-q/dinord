import { Collection, EventEmitter } from '../deps.ts';
import { WebSocketClient } from './WebSocketClient.ts';
import type { INullable } from '../Utils/Types.ts';
import type { ClientConfig } from './ClientConfig.ts';
import type { ClientUser } from './ClientUser.ts';
import type { Guild } from '../Structures/Guild/Guild.ts';
import { Debug } from '../Utils/dev.ts';
import { Snowflake } from '../Utils/ApiTypes.ts';
import { User } from '../Structures/User.ts';

@Debug
export class Client extends EventEmitter {
  // #region Fields
  #config: ClientConfig;
  #ws = new WebSocketClient(this);
  #guilds = new Collection<Snowflake, Guild>();
  #users = new Collection<Snowflake, User>();
  #user?: INullable<ClientUser>;
  // #endregion

  // #region Constructor
  /**
   *
   * @param [config] Config to use for the client.
   */
  public constructor(config: ClientConfig) {
    super();
    this.#config = config;
  }
  // #endregion

  // #region Methods
  public login(token: string): Promise<void>;
  public login(): Promise<void>;
  /**
   *
   * @param [token] The token to use for the client.
   * @returns {Promise<void>}
   */
  public login(token?: string): Promise<void> {
    if (!this.#config.token && !!token) this.#config.token = token;

    if (!this.#ws.socket) this.#ws.connect();

    return Promise.resolve(void 0);
  }

  public destroy() {
    this.#ws.close();
  }
  // #endregion

  // #region Getter & Setter
  public get config(): ClientConfig {
    return this.#config;
  }

  public get ws(): WebSocketClient {
    return this.#ws;
  }

  public get user() {
    return this.#user;
  }

  public set user(user: INullable<ClientUser>) {
    this.#user = user;
  }

  public get guilds() {
    return this.#guilds;
  }

  public get users() {
    return this.#users;
  }
  // #endregion
}
