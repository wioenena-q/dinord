import type { WSEncoding } from '../Client/ws/WebSocketManager.ts';

/**
 * @class
 * @classdesc Manager for URL operations
 * @extends {null}
 */
export class URLManager extends null {
  static #api: URLManagerInitAPIOptions;
  static #ws: URLManagerInitWSOptions;

  // Initialize URLManager
  public static init({ api, ws }: URLManagerInitOptions) {
    this.#api = api;
    this.#ws = ws;
  }

  /**
   * Adds '/' to endpoints
   * @param {string[]} args - Array of arguments to join
   * @returns {string}
   */
  private static join(...args: string[]) {
    return args.join('/');
  }

  /**
   * API base url
   * @returns {string}
   */
  public static apiBase() {
    return `https://discord.com/api/v${this.#api.version}`;
  }

  /**
   * gatewayBot endpoint url
   * @returns {string}
   */
  public static gatewayBot() {
    return this.join(this.apiBase(), 'gateway', 'bot');
  }

  /**
   * Base websocket url
   * @returns {string}
   */
  public static wss() {
    let base = `wss://gateway.discord.gg/?v=${this.#api.version}&encoding=${this.#ws.encoding}`;
    if (this.#ws.compress) base += '&compress=zlib-stream';
    return base;
  }
}
/**
 * @typedef {Object} URLManagerInitOptions
 * @property {URLManagerInitAPIOptions} api - Options for api
 * @property {URLManagerInitWSOptions} ws - Options for websocket
 */
export interface URLManagerInitOptions {
  api: URLManagerInitAPIOptions;
  ws: URLManagerInitWSOptions;
}

/**
 * @typedef {Object} URLManagerInitOptions
 * @property {number} version - Used API version
 */
export interface URLManagerInitAPIOptions {
  version: number;
}

/**
 * @typedef {Object} URLManagerInitWSOptions
 * @property {boolean} compress - Whether to compress WebSocket data
 * @property {WSEncoding} encoding - Encoding to use
 */
export interface URLManagerInitWSOptions {
  compress: boolean;
  encoding: WSEncoding;
}
