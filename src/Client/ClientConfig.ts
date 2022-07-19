import { INullable, isString } from "../Utils/Types.ts";

export class ClientConfig {
  #token?: INullable<string>;

  public constructor();
  public constructor(token: INullable<string>);
  public constructor(token?: INullable<string>) {
    this.token = token;
  }

  /**
   *
   * @param value The token to use for the client.
   */
  public set token(value: INullable<string>) {
    if (isString(value)) this.#token = value;
    else throw new TypeError("Token must be a string.");
  }

  public get token(): INullable<string> {
    return this.#token;
  }
}
