import { EventEmitter } from '../deps.ts';
import { ClientConfig } from './ClientConfig.ts';
import { WebSocketClient } from './WebSocketClient.ts';

export class Client extends EventEmitter {
  #config: ClientConfig;

  #ws = new WebSocketClient(this);

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
}
