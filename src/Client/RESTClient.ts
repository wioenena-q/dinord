import { DiscordAPIError } from '../Errors/DiscordAPIError.ts';
import { defineReadonlyProperty, delay, isObject, toObject } from '../Utils/Utils.ts';
import type { Client } from './Client.ts';

/**
 * @class
 * @classdesc RESTClient is a class that manages the requests that are sent to the server.
 */
export class RESTClient {
  public declare readonly client: Client;
  public declare readonly buckets: Map<string, { remaining: number; requestCount: number; resetAfter: number }>;

  /**
   *
   * @param client - Client instance for RESTClient
   */
  public constructor(client: Client) {
    defineReadonlyProperty(this, 'client', client);
    defineReadonlyProperty(this, 'buckets', new Map());
  }

  /**
   * This method cares about the rate limit when making a request.
   * @param url - The url to request
   * @param options - The options for request
   * @returns - The response from the request
   */
  async #request(url: string, method: HTTPMethod, options: RequestInit = {}): Promise<Response> {
    // If options is exists and is not object, throw error
    if (options !== undefined && !isObject<RequestInit>(options))
      throw new TypeError('RESTClient request options must be an object');

    // Create request options with Authorization header
    const _options = {
      ...options,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
        Authorization: `Bot ${this.client.options.token}`
      }
    };

    // Create the request
    const response = await fetch(url, _options);
    // Get the ratelimit headers
    // prettier-ignore
    const xBucket = response.headers.get('X-RateLimit-Bucket'),
          xRemaining = response.headers.get('X-RateLimit-Remaining'),
          xResetAfter = response.headers.get('X-RateLimit-Reset-After');

    // If the rate limit headers are present, update or create a bucket
    if (xBucket && xRemaining && xResetAfter) {
      // Get bucket from cache
      const bucket = this.buckets.get(xBucket);

      // If not in cache, create a new bucket
      if (!bucket) {
        this.buckets.set(xBucket, {
          remaining: parseInt(xRemaining),
          requestCount: 1,
          resetAfter: +xResetAfter * 1000
        });
        this.#debug(`Bucket ${xBucket} created`);
      } else {
        // If in cache, update the bucket

        // If the remaining right has expired, wait for the reset time and resend the request
        if (bucket.remaining === 0) {
          this.#debug(`Bucket ${xBucket} is full, waiting ${bucket.resetAfter}ms`);
          // Wait reset after time
          await delay(bucket.resetAfter);
          // Delete bucket from cache
          this.buckets.delete(xBucket);
          // Resend request
          return this.#request(url, method, options);
        }
        bucket.requestCount++; // Increate the request count
        bucket.remaining--; // Decrease the remaining requests
      }
    }

    if (response.status === 429) {
      // If the response status is 429, wait for the retry time and resend the request

      const retryAfter = response.headers.get('Retry-After');

      if (retryAfter) {
        this.#debug(`Rate limit exceeded, waiting ${+retryAfter * 1000}ms`);
        await delay(+retryAfter * 1000);
        return this.#request(url, method, options);
      } else
        throw new DiscordAPIError({
          message: 'Rate limit exceeded',
          method,
          status: response.status,
          url
        });
    }

    if (response.status === 200 || response.ok) return response;
    else {
      const error = await response.json();
      throw new DiscordAPIError({ message: error.message, method, status: response.status, url, ...error });
    }
  }

  /**
   * Request a resource from the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.#request(url, HTTPMethod.Get, options);
    return response.json();
  }

  /**
   * Create an resouce on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async post(url: string, options?: RequestInit) {
    // TODO: Implement
  }

  /**
   * Update a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async put(url: string, options?: RequestInit) {
    // TODO: Implement
  }

  /**
   * Delete a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async delete(url: string, options?: RequestInit) {
    const response = await this.#request(url, HTTPMethod.Delete, options);
    return response.json();
  }

  /**
   * Modification a resource on the Discord REST API.
   * @param {string} url
   * @param {RequestInit?} [options]
   * @returns {Promise<unknown>}
   */
  public async patch(url: string, options: RequestInit = {}) {
    const response = await this.#request(url, HTTPMethod.Patch, options);
    return response.json();
  }

  #debug(message: string) {
    this.client.debug(`[Dinord => RESTClient]: ${message}`);
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(toObject(this, ['client', ...Object.keys(this)]), options);
  }
}

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const enum HTTPMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH'
}
