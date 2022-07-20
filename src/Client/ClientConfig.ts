import type { IntentFlags } from '../Utils/Constants.ts';
import {
  type IClientConfig,
  type INullable,
  isArray,
  isString
} from '../Utils/Types.ts';

export class ClientConfig {
  #token?: INullable<string>;

  #intents: IntentFlags;

  public constructor({ token, intents }: IClientConfig) {
    this.token = token;

    if (typeof intents === 'number') this.#intents = intents;
    else if (isArray(intents))
      this.#intents = intents.reduce((acc, cur) => acc | cur, 0);
    else
      throw new TypeError('Intents must be a number or an array of numbers.');
  }

  /**
   *
   * @param value The token to use for the client.
   */
  public set token(value: INullable<string>) {
    if (isString(value)) this.#token = value;
    else throw new TypeError('Token must be a string.');
  }

  public get token(): INullable<string> {
    return this.#token;
  }

  public get intents(): IntentFlags {
    return this.#intents;
  }
}
