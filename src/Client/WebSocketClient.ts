import {
  GatewayCloseEventCodes,
  noop,
  OPCodes,
  WSS
} from '../Utils/Constants.ts';
import { type INullable, type IPayloads, isNumber } from '../Utils/Types.ts';
import type { Client } from './Client.ts';

export class WebSocketClient {
  #socket?: INullable<WebSocket>;

  #client: Client;

  #interval?: INullable<number>;
  #guildSize: number = 0;
  #lastSeq?: INullable<number> = null;

  public constructor(client: Client) {
    this.#client = client;
  }

  public connect() {
    if (!this.#socket) {
      this.#socket = new WebSocket(WSS);
      this.#socket.onerror = this.#onError;

      this.#socket.onclose = this.#onClose;

      this.#socket.onmessage = this.#onMessage;
    }
  }

  #onClose = (ev: CloseEvent) => {
    switch (ev.code) {
      case GatewayCloseEventCodes.UNKNOWN_ERROR:
        break;
      case GatewayCloseEventCodes.UNKNOWN_OPCODE:
        break;
      case GatewayCloseEventCodes.DECODE_ERROR:
        break;
      case GatewayCloseEventCodes.NOT_AUTHENTICATED:
        break;
      case GatewayCloseEventCodes.AUTHENTICATION_FAILED:
        break;
      case GatewayCloseEventCodes.ALREADY_AUTHENTICATED:
        break;
      case GatewayCloseEventCodes.INVALID_SEQ:
        break;
      case GatewayCloseEventCodes.RATE_LIMITED:
        break;
      case GatewayCloseEventCodes.SESSION_TIMED_OUT:
        break;
      case GatewayCloseEventCodes.INVALID_SHARD:
        break;
      case GatewayCloseEventCodes.SHARDING_REQUIRED:
        break;
      case GatewayCloseEventCodes.INVALID_API_VERSION:
        break;
      case GatewayCloseEventCodes.INVALID_INTENTS:
        throw new Error(`${ev.reason} Intents: ${this.#client.config.intents}`);
      case GatewayCloseEventCodes.DISALLOWED_INTENTS:
        break;
      default:
        throw new Error(`Unknown close event code: ${ev.code}`);
    }
    this.close();
  };

  #onMessage = (ev: MessageEvent<unknown>) => {
    // deno-lint-ignore no-unused-vars
    const { op, d, s, t } = JSON.parse(ev.data as string) as IPayloads;

    switch (op) {
      // Any event triggered.
      case OPCodes.DISPATCH:
        this.#lastSeq = s;
        import(`./Events/${t}.ts`)
          .then(({ default: handler }) => {
            handler(this.#client, d);
          })
          .catch(noop);

        break;
      case OPCodes.HEARTBEAT:
        break;
      case OPCodes.IDENTIFY:
        break;
      case OPCodes.PRESENCE_UPDATE:
        break;
      case OPCodes.VOICE_STATE_UPDATE:
        break;
      case OPCodes.RESUME:
        break;
      case OPCodes.RECONNECT:
        break;
      case OPCodes.REQUEST_GUILD_MEMBERS:
        break;
      case OPCodes.INVALID_SESSION:
        break;

      case OPCodes.HELLO: {
        const { heartbeat_interval } = d!;

        this.#socket!.send(
          JSON.stringify({
            op: OPCodes.IDENTIFY,
            d: {
              token: this.#client.config.token,
              intents: this.#client.config.intents,
              properties: {
                os: Deno.build.os,
                browser: 'dinord',
                device: 'dinord'
              }
            }
          })
        );
        this.#handleInterval(heartbeat_interval as number);
        break;
      }
      case OPCodes.HEARTBEAT_ACK:
        break;
      default:
        break;
    }
  };

  #onError = (ev: Event | ErrorEvent) => {};

  #handleInterval(ms: number) {
    if (!this.#interval && this.#socket) {
      this.#interval = setInterval(() => {
        this.#socket!.send(
          JSON.stringify({
            op: OPCodes.HEARTBEAT,
            d: this.#lastSeq
          })
        );
      }, ms);
    }
  }

  public close() {
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = null;
    }
    if (this.#socket) {
      this.#socket.close();
      this.#socket = null;
    }
  }

  public get client() {
    return this.#client;
  }

  public get socket() {
    return this.#socket;
  }

  public get guildSize() {
    return this.#guildSize;
  }

  public set guildSize(size: number) {
    if (isNumber(size)) this.#guildSize = size;
    else throw new TypeError('Guild size must be a number.');
  }
}
