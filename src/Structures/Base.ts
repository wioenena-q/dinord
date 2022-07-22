import { Client } from '../Client/Client.ts';
import { ToJSON, ToString } from '../Utils/Types.ts';

export abstract class Base implements ToJSON, ToString {
  // #region Fields
  #client: Client;
  // #endregion

  // #region Constructor
  public constructor(client: Client) {
    this.#client = client;
  }
  // #endregion

  // #region Methods
  public abstract toJSON(): Record<string, unknown>;
  public abstract toString(): string;
  // #endregion

  // #region Getter & Setter
  public get client() {
    return this.#client;
  }
  // #endregion
}
