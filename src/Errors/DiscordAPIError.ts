import type { HTTPMethod } from '../Client/RESTClient.ts';

/**
 * @class
 * @classdesc Handles errors from requests sent to the API
 * @extends {Error}
 */
export class DiscordAPIError extends Error {
  // Error code or status code
  code: number;

  /**
   *
   * @param options - Options for the error
   */
  public constructor(options: DiscordAPIErrorOptions) {
    super(DiscordAPIError.getMessage(options));
    this.code = options.code ?? options.status;
  }

  /**
   *
   * Pretty error message, like discord.js (✿◡‿◡)
   */
  public static getMessage(options: DiscordAPIErrorOptions) {
    return `${options.message}\n${Deno.inspect(options, { colors: true })}`;
  }

  public get name() {
    return `DiscordAPIError[${this.code}]`;
  }
}

/**
 * @typedef {Object} DiscordAPIErrorOptions
 * @property {string} message - Error message
 * @property {number} status - Status code
 * @property {number?} [code] - Error code if exist
 * @property {string} url - URL to request
 * @property {HTTPMethod} method - HTTP method used
 */
export interface DiscordAPIErrorOptions {
  message: string;
  status: number;
  code?: number;
  url: string;
  method: HTTPMethod;
}
