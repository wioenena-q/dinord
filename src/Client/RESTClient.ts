import { isObject } from '../Utils/Utils.ts';
import type { Client } from './Client.ts';

/**
 * @class
 * @classdesc RESTClient is a class that manages the requests that are sent to the server.
 */
export class RESTClient {
  #client: Client;

  /**
   *
   * @param client - Client instance for RESTClient
   */
  public constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Create a Request object that already has the Authentication header field for the given url.
   * @param url - URL to send the request to
   * @param options - Options for the request
   * @returns {Request}
   */
  #createRequest(url: Request | string, options?: RequestInit) {
    if (options !== undefined && !isObject<RequestInit>(options))
      throw new TypeError('RESTClient request options must be an object');

    const _options = {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bot ${this.#client.options.token}`
      }
    };
    return new Request(url, _options);
  }

  /**
   * Request a resource from the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(this.#createRequest(url, options));
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }

  /**
   * Create an resouce on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async post(url: string, options?: RequestInit) {
    throw new Error('Not implemented');
  }

  /**
   * Update a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async put(url: string, options?: RequestInit) {
    throw new Error('Not implemented');
  }

  /**
   * Delete a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async delete(url: string, options?: RequestInit) {
    throw new Error('Not implemented');
  }

  /**
   * Modification a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async patch(url: string, options?: RequestInit) {
    throw new Error('Not implemented');
  }

  public get client() {
    return this.#client;
  }
}
