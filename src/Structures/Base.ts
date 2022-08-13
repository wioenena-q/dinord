import type { Client } from '../Client/Client.ts';
import type { Clonable, Patchable, ToJSON, ToString, Updatable } from '../Utils/Types.ts';

export abstract class Base implements ToJSON, ToString, Patchable, Clonable, Updatable {
  #client: Client;

  public constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Clone this object
   * @returns {this}
   */
  public clone() {
    return Object.assign(Object.create(this), this);
  }

  /**
   * Update this object and return old object
   * @param data - Data to update
   * @returns {this}
   */
  public update(data: unknown) {
    const clone = this.clone();
    this.patch(data);
    return clone;
  }

  public abstract toJSON(): Record<string, unknown>;
  public abstract toString(): string;
  public abstract patch(data: unknown): void;

  public get client() {
    return this.#client;
  }
}
