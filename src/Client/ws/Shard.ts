import { EventEmitter } from '../../deps.ts';
import { URLManager } from '../../Managers/URLManager.ts';
import { isInstanceOf, toObject } from '../../Utils/Utils.ts';
// Compression and decompression library
import { Inflate } from 'https://deno.land/x/compress@v0.4.5/zlib/mod.ts?code';
import { GatewayDispatchEvents, GatewayOpcodes } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

import type { GatewayReceivePayload } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import type { ToObject, ToString } from '../../Utils/Types.ts';
import type { WebSocketManager } from './WebSocketManager.ts';

/**
 * @class
 * @extends {EventEmitter<IShardEvents>}
 * @implements {ToObject, ToString}
 */
export class Shard extends EventEmitter<IShardEvents> implements ToObject, ToString {
  #id: number;
  #manager: WebSocketManager;
  #sessionId: string | null = null;
  // WebSocket connection for this shard
  #ws?: WebSocket | null = null;
  #state: ShardState = ShardState.Disconnected;
  // Heartbeat interval ID or null
  #heartbeatInterval: number | null = null;
  // Sequence number, used for resuming sessions and heartbeats or null
  #sequence: number | null = null;
  // To inflate if compression option is enabled, otherwise null
  #inflate: Inflate | null = null;

  /**
   *
   * @param manager - WebSocketManager instance
   * @param id - ID of the shard
   */
  public constructor(manager: WebSocketManager, id: number) {
    super();
    this.#id = id;
    this.#manager = manager;

    if (this.#manager.options.compress) {
      this.#inflate = new Inflate({
        // 128KB
        chunkSize: 128 * 1024,
        windowBits: 15
      });
    }
  }

  /**
   *
   * Connect to gateway
   * @returns {Promise<void>}
   */
  public connect() {
    // error if ws is not null or status is not Disconnected
    if (this.#ws !== null || this.#state !== ShardState.Disconnected)
      return Promise.reject(new Error('Already connected'));

    // Return new promise for shard queue
    return new Promise<void>((resolve, reject) => {
      // Call resolve when shard is ready
      this.once(ShardEvents.Ready, () => {
        resolve();
      });

      // Initialize ws.
      this.#ws = new WebSocket(URLManager.wss());
      // Handle events
      this.#ws.onopen = this.#onOpen.bind(this);
      this.#ws.onclose = this.#onClose.bind(this);
      this.#ws.onerror = this.#onError.bind(this);
      this.#ws.onmessage = this.#onMessage.bind(this);
    });
  }

  /**
   *
   * TODO: Implement
   * Works when the connection is complete
   * @param {WebSocketEvent} event - WebSocket event
   * @returns {void}
   */
  #onOpen(event: Event) {
    // Set state to Connected
    this.#state = ShardState.Connected;
  }

  /**
   *
   * TODO: Implement
   * Works when the connection is closed
   * @param {WebSocketEvent} event - WebSocket close event
   * @returns {void}
   */
  #onClose(event: CloseEvent) {
    this.emit(ShardEvents.Disconnect);
  }

  /**
   *
   * TODO: Implement
   * Works when there is an error in the connection
   * @param {WebSocketEvent} event - WebSocket error event
   * @returns {void}
   */
  #onError(error: Event | ErrorEvent) {}

  /**
   *
   * Works when receive message from connection
   * @returns {Promise<void>}
   */
  async #onMessage(message: MessageEvent<string | Blob>) {
    let data!: string | Uint8Array;

    // If the data is compressed or encoding etf, the data is treated as a Blob.
    if (isInstanceOf(message.data, Blob)) {
      // Convert to byte array
      const bytes = new Uint8Array(await message.data.arrayBuffer());
      // Let's inflate the data if compression is active
      if (this.#inflate !== null) {
        this.#inflate.push(bytes, 2 /* Z_SYNC_FLUSH */);
        if (this.#inflate.strm.output === null) return;

        // Slice the inflated data
        data = this.#inflate.strm.output.slice(0, this.#inflate.strm.next_out);

        // If encoding is "json", decode
        if (this.#manager.options.encoding === 'json') data = this.#manager.decoder.decode(data);
      }
    } else data = message.data;

    this.#onPacked(this.#manager.unpack(data));
  }

  /**
   *
   * TODO: Full implement
   * Handle the incoming packet
   * @param data - Packet from Gateway
   */
  #onPacked(data: GatewayReceivePayload) {
    const { op, s, d, t } = data;

    // If last sequence is exist, set it
    if (s) this.#sequence = s;

    switch (op) {
      // First handshake
      case GatewayOpcodes.Hello: {
        const { heartbeat_interval } = d;
        this.#sendHeartbeats(heartbeat_interval as number);
        this.#identify();
        break;
      }
      // Events are triggered
      case GatewayOpcodes.Dispatch:
        this.#handleEvent(t!, d);
        break;
      default:
        console.log(`Shard: ${this.#id} Unknown opcode: ${op}`);
        break;
    }
  }

  /**
   *
   * TODO: Implement
   * Reconnect to the gateway
   */
  public reconnect() {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * TODO: Implement
   * Disconnect from gateway
   */
  public disconnect() {
    throw new Error('Method not implemented.');
  }

  /**
   * Send OP 2 Identify data to Gateway
   * @see {@link https://discord.com/developers/docs/topics/gateway#identifying}
   * @returns {void}
   */
  #identify() {
    if (this.#ws === null || this.#state !== ShardState.Connected) return;
    if (this.#sessionId) {
      // TODO: Reconnect to gateway
    } else {
      // First connection to gateway
      const d = {
        token: this.#manager.client.options.token,
        properties: {
          os: Deno.build.os,
          browser: 'dinord',
          device: 'dinord'
        },
        large_threshold: this.#manager.options.largeThreshold,
        shard: [this.#id, this.#manager.options.shardCount],
        intents: this.#manager.options.intents,
        compress: this.#manager.options.compress
      };

      this.#ws!.send(this.#manager.pack({ op: GatewayOpcodes.Identify, d }));
    }
  }

  /**
   * Handle events
   * @param eventName - Event name
   * @param data - Event data
   */
  #handleEvent(eventName: GatewayDispatchEvents, data: unknown) {
    // Get event handler.
    const event = this.#manager.events.get(eventName);

    if (event === undefined) return;
    // Emit Ready to this shard.
    if (eventName === GatewayDispatchEvents.Ready) this.emit(ShardEvents.Ready);

    // Execute event handler with data.
    event.exec(data);
  }

  /**
   * Send heartbeat to the gateway
   * @param ms - Time in milliseconds
   * @returns {void}
   */
  #sendHeartbeats(ms: number): void {
    if (this.#heartbeatInterval === null && this.#state === ShardState.Connected && this.#ws !== null) {
      this.#heartbeatInterval = setInterval(() => {
        this.#ws!.send(
          this.#manager.pack({
            op: GatewayOpcodes.Heartbeat,
            d: this.#sequence
          })
        );
      }, ms);
    }
  }

  toObject() {
    return toObject(this, ['id', 'manager', 'toObject', 'toString']);
  }

  public toString() {
    return `Shard (id: ${this.#id}, state: ${this.#state})`;
  }

  /**
   *
   * ID of the shard
   */
  public get id() {
    return this.#id;
  }

  /**
   *
   * WebSocketManager instance
   */
  public get manager() {
    return this.#manager;
  }

  /**
   *
   * Session ID of the shard
   */
  public get sessionId() {
    return this.#sessionId;
  }

  /**
   *
   * Connection state of the shard
   */
  public get state() {
    return this.#state;
  }
}

export type IShardEvents = {
  ready: [];
  disconnect: [];
};

export const enum ShardEvents {
  Ready = 'ready',
  Disconnect = 'disconnect'
}

export const enum ShardState {
  Connecting,
  Connected,
  Reconnecting,
  Disconnecting,
  Disconnected
}
