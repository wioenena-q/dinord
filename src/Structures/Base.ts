import { Client } from '../Client/Client.ts';

export abstract class Base {
  #client: Client;

  public constructor(client: Client) {
    this.#client = client;
  }

  public get client() {
    return this.#client;
  }
}
