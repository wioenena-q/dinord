import { Base } from '../Base.ts';
import { WSOptions } from '../Options/WSOptions.ts';
import { ClientOptions } from '../Options/ClientOptions.ts';
import { isInstanceOf, isObject } from '../Utils/Utils.ts';

export class OptionsManager extends Base {
  #ws: WSOptions;
  #client: ClientOptions;

  constructor(options: IOptionsManagerOptions) {
    if (!isObject(options)) throw new TypeError('options must be an object');

    const { ws, client } = options;

    if (!isInstanceOf(ws, WSOptions))
      throw new TypeError('ws must be an instance of WSOptions');

    if (!isInstanceOf(client, ClientOptions))
      throw new TypeError('client must be an instance of ClientOptions');

    super();
    this.#ws = ws;
    this.#client = client;
  }

  public toObject() {
    return super.toObject(['ws', 'client']);
  }

  get ws() {
    return this.#ws;
  }

  public get client() {
    return this.#client;
  }
}

export interface IOptionsManagerOptions {
  ws: WSOptions;
  client: ClientOptions;
}
