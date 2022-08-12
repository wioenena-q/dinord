import type { Client } from '../../Client.ts';

/**
 * @class
 * @classdesc The base class for all events
 * @abstract
 */
export abstract class Base {
  #client: Client;

  public constructor(client: Client) {
    this.#client = client;
  }

  public abstract exec(data: unknown): void;

  public get client() {
    return this.#client;
  }
}
