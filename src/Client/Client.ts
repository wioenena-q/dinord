import { assert } from '../deps.ts';
import { TypedEmitter } from '../Utils/TypedEmitter.ts';
import { RESTClient } from './REST/RESTClient.ts';
import {
  IWebSocketManagerOptions,
  WebSocketManager,
} from './WebSocket/WebSocketManager.ts';

export class Client extends TypedEmitter<IClientEvents> implements IClient {
  public readonly options: IClientOptions;
  public readonly ws: WebSocketManager;
  public readonly rest: RESTClient;

  public constructor(options: IClientOptions) {
    super();
    assert(typeof options === 'object', 'Options must be an object.');
    assert(typeof options.token === 'string', 'Token must be a string.');

    this.options = options;
    this.ws = new WebSocketManager(this);
    this.rest = new RESTClient(this.options.token);
  }

  public connect() {
    return this.ws.connect();
  }

  public disconnect() {
    return this.ws.disconnect();
  }
}

export interface IClient {
  /**
   * Connects the client to the Discord.
   */
  connect(): Promise<void>;
  /**
   * Disconnects the client from the Discord.
   */
  disconnect(): Promise<void>;
}

export interface IClientOptions {
  /**
   * Token of the bot.
   */
  token: string;
  /**
   * WebSocket options.
   */
  ws: IWebSocketManagerOptions;
}

export type IClientEvents = {
  ready: [boolean];
};
