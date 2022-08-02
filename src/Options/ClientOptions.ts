import { Base } from '../Base.ts';
import { isObject, isString } from '../Utils/Utils.ts';

export class ClientOptions extends Base {
  #token: string;

  public constructor(options: IClientOptions) {
    if (!isObject(options)) throw new TypeError('options must be an object');

    const { token } = options;

    if (!isString(token)) throw new TypeError('token must be a string');
    super();
    this.#token = token;
  }

  public toObject() {
    return super.toObject(['token']);
  }

  public get token() {
    return this.#token;
  }
}

export interface IClientOptions {
  token: string;
}
