import { Base } from '../Base.ts';
import { IntentFlags } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/api/v10/mod.ts';
import { isBoolean, isNumber, isObject, isString } from '../Utils/Utils.ts';

export class WSOptions extends Base {
  #largeThreshold: number;
  #compress: boolean;
  #encoding: WSEncoding;
  #intents: IntentFlags;

  public constructor(options: IWSOptions) {
    if (!isObject(options)) throw new TypeError('WS options must be an object');

    const { largeThreshold, compress, encoding, intents } = options;

    if (!isNumber(largeThreshold)) throw new TypeError('largeThreshold must be a number');
    else if (largeThreshold < 50 || largeThreshold > 250)
      throw new RangeError('largeThreshold must be between 50 and 250');

    if (!isBoolean(compress)) throw new TypeError('compress must be a boolean');

    if (!isString(encoding)) throw new TypeError('encoding must be a string');
    else if (!(encoding === 'etf' || encoding === 'json'))
      throw new Error('encoding must be either "etf" or "json"');

    if (!isNumber(intents)) throw new TypeError('intents must be a number');
    super();

    this.#largeThreshold = largeThreshold;
    this.#compress = compress;
    this.#encoding = encoding;
    this.#intents = intents;
  }

  public static defaults(
    options: Pick<IWSOptions, 'intents'> & Partial<Omit<IWSOptions, 'intents'>>
  ) {
    if (!isObject(options)) throw new TypeError('options must be an object');

    return new WSOptions(
      Object.assign(
        {
          largeThreshold: 50,
          compress: false,
          encoding: 'json'
        },
        options
      ) as IWSOptions
    );
  }

  public toObject() {
    return super.toObject(['largeThreshold', 'compress', 'encoding', 'intents']);
  }

  public get largeThreshold() {
    return this.#largeThreshold;
  }

  public get compress() {
    return this.#compress;
  }

  public get encoding() {
    return this.#encoding;
  }

  public get intents() {
    return this.#intents;
  }
}

export interface IWSOptions {
  largeThreshold: number;
  compress: boolean;
  encoding: WSEncoding;
  intents: IntentFlags;
}

export type WSEncoding = 'json' | 'etf';
