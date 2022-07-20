import { Collection, EventEmitter } from '../deps.ts';
import { WebSocketClient } from './WebSocketClient.ts';
import type { INullable } from '../Utils/Types.ts';
import type { ClientConfig } from './ClientConfig.ts';
import type { ClientUser } from './ClientUser.ts';
import type { Guild } from '../Structures/Guild.ts';

export class Client extends EventEmitter {
  #config: ClientConfig;

  #ws = new WebSocketClient(this);

  #guilds = new Collection<string, Guild>();

  #user?: INullable<ClientUser>;

  /**
   *
   * @param [config] Config to use for the client.
   */
  public constructor(config: ClientConfig) {
    super();
    this.#config = config;
  }

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
}
