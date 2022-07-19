import { EventEmitter } from "../deps.ts";
import { ClientConfig } from "./ClientConfig.ts";

export class Client extends EventEmitter {
  #config: ClientConfig;

  public constructor();
  public constructor(config: ClientConfig);

  /**
   *
   * @param [config] Config to use for the client.
   */
  public constructor(config?: ClientConfig) {
    super();
    this.#config = config ?? new ClientConfig();
  }

  public login(token: string): Promise<void>;
  public login(): Promise<void>;

  /**
   *
   * @param [token] The token to use for the client.
   * @returns {Promise<void>}
   */
  public login(token?: string): Promise<void> {
    if (!this.#config.token && !!token) {
      this.#config.token = token;
    }

    return Promise.resolve(void 0);
  }

  public get config(): ClientConfig {
    return this.#config;
  }
}
