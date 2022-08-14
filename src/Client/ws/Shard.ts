import {
  EventEmitter,
  GatewayDispatchEvents,
  GatewayIdentifyData,
  GatewayOpcodes,
  GatewayResumeData,
  type GatewayReadyDispatchData,
  type GatewayReceivePayload
} from '../../deps.ts';
import { URLManager } from '../../Managers/URLManager.ts';
import { defineReadonlyProperty, isInstanceOf, isString, toObject } from '../../Utils/Utils.ts';
// Compression and decompression library
import { Inflate } from 'https://deno.land/x/compress@v0.4.5/zlib/mod.ts?code';

import type { ToString } from '../../Utils/Types.ts';
import { ClientEvents } from '../Client.ts';
import type { WebSocketManager } from './WebSocketManager.ts';

export interface Shard {
  on<E extends keyof IShardEvents>(eventName: E, listener: (...args: IShardEvents[E]) => void): this;
  on(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  once<E extends keyof IShardEvents>(eventName: E, listener: (...args: IShardEvents[E]) => void): this;
  once(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  emit<E extends keyof IShardEvents>(eventName: E, ...args: IShardEvents[E]): boolean;
  emit(eventName: string | symbol, ...args: unknown[]): boolean;
  off<E extends keyof IShardEvents>(eventName: E, listener: (...args: IShardEvents[E]) => void): this;
  off(eventName: string | symbol, listener: (...args: unknown[]) => void): this;
  removeAllListeners<E extends keyof IShardEvents>(eventName?: E): this;
  removeAllListeners(eventName?: string | symbol): this;
  listeners<E extends keyof IShardEvents>(eventName: E): Array<(...args: IShardEvents[E]) => void>;
  listeners(eventName: string | symbol): Array<(...args: unknown[]) => void>;
  rawListeners<E extends keyof IShardEvents>(eventName: E): Array<(...args: IShardEvents[E]) => void>;
  rawListeners(eventName: string | symbol): Array<(...args: unknown[]) => void>;
  listenerCount<E extends keyof IShardEvents>(type: E): number;
  listenerCount(type: string | symbol): number;
}

/**
 * @class
 * @extends {EventEmitter<IShardEvents>}
 * @implements {ToString}
 */
export class Shard extends EventEmitter implements ToString {
  /**
   * ID of this shard.
   */
  public declare readonly id: number;
  /**
   * WebSocketManager instance
   */
  public declare readonly manager: WebSocketManager;
  #sessionId: string | null = null;
  // WebSocket connection for this shard
  #ws: WebSocket | null = null;
  #state: ShardState = ShardState.Disconnected;
  // Heartbeat interval ID or null
  #heartbeatInterval: number | null = null;
  // Sequence number, used for resuming sessions and heartbeats or null
  #sequence: number | null = null;
  // To inflate if compression option is enabled, otherwise null
  #inflate: Inflate | null = null;
  // Time to when the last heartbeat was sent
  #lastPingTimestamp: number | null = null;
  #ping = -1;

  /**
   *
   * @param manager - WebSocketManager instance
   * @param id - ID of the shard
   */
  public constructor(manager: WebSocketManager, id: number) {
    super();

    // Define readonly properties
    defineReadonlyProperty(this, 'id', id);
    defineReadonlyProperty(this, 'manager', manager);

    if (this.manager.options.compress) {
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
    // If connected, return.
    if (this.#ws?.readyState === WebSocket.OPEN) return Promise.resolve();

    // Return new promise for shard queue
    return new Promise<void>((resolve, reject) => {
      if (!isString(this.manager.client.options.token)) reject(new Error('Token is not a string'));
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
    this.#debug(`Connected`);
  }

  /**
   *
   * TODO: Implement
   * Works when the connection is closed
   * @param {WebSocketEvent} event - WebSocket close event
   * @returns {void}
   */
  #onClose(event: CloseEvent) {
    if (event.code === 1000)
      // Self-disconnect
      this.manager.client.emit(ClientEvents.ShardDisconnect, this.id);
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
        if (this.manager.options.encoding === 'json') data = this.manager.decoder.decode(data);
      }
    } else data = message.data;

    this.#onPacked(this.manager.unpack(data));
  }

  /**
   *
   *
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
        this.#identifyNew();
        this.#debug(`Ready`);
        break;
      }
      // Invalid session, reconnect
      case GatewayOpcodes.InvalidSession:
        this.#debug(`Invalid session trying to reconnect`);
        this.disconnect();
        this.connect();
        this.#state = ShardState.Connected;
        break;
      // Resume session
      case GatewayOpcodes.Reconnect:
        this.#identifyResume();
        break;
      // Events are triggered
      case GatewayOpcodes.Dispatch:
        this.#handleEvent(t!, d);
        break;
      case GatewayOpcodes.HeartbeatAck:
        this.#heartbeatACK();
        break;
      default:
        this.#debug(`Unknown opcode: ${op}`);
        break;
    }
  }

  #reset() {
    if (this.#heartbeatInterval !== null) {
      clearInterval(this.#heartbeatInterval);
      this.#heartbeatInterval = null;
    }
  }

  /**
   *
   * Disconnect from gateway
   */
  public disconnect() {
    if (this.#ws === null || this.#ws.readyState !== WebSocket.OPEN) return;
    this.#ws.close(1000);
    this.#ws = null;
    this.#reset();
  }

  /**
   *
   * Send identify data to gateway
   */
  public identify() {
    if (this.#state !== ShardState.Connected || this.#ws === null) return;
    if (this.#sessionId !== null && this.#sequence !== null) {
      this.#debug(`[RESUME] Shard ${this.id}/${this.manager.options.shardCount}`);
      this.#identifyResume();
    } else {
      this.#debug(
        `[IDENTIFY] Shard ${this.id}/${this.manager.options.shardCount} with intents ${this.manager.options.intents}`
      );
      this.#identifyNew();
    }
  }

  /**
   * Send OP 2 new Identify data to Gateway
   * @see {@link https://discord.com/developers/docs/topics/gateway#identifying}
   * @returns {void}
   */
  #identifyNew() {
    // First connection to gateway
    const d: GatewayIdentifyData = {
      token: this.manager.client.options.token!,
      properties: {
        os: Deno.build.os,
        browser: 'dinord',
        device: 'dinord'
      },
      large_threshold: this.manager.options.largeThreshold,
      shard: [this.id, this.manager.options.shardCount as number],
      intents: this.manager.options.intents,
      compress: this.manager.options.compress
    };

    this.send({ op: GatewayOpcodes.Identify, d });
  }

  /**
   *
   * Send OP 6 Resume data to Gateway
   */
  #identifyResume() {
    // Resume connection to gateway
    const d: GatewayResumeData = {
      token: this.manager.client.options.token!,
      seq: this.#sequence!,
      session_id: this.#sessionId!
    };

    this.send({ op: GatewayOpcodes.Resume, d });
  }

  /**
   * Handle events
   * @param eventName - Event name
   * @param data - Event data
   */
  #handleEvent(eventName: GatewayDispatchEvents, data: unknown) {
    // Get event handler.
    const event = this.manager.events.get(eventName);

    if (event === undefined) return;

    if (eventName === GatewayDispatchEvents.Ready) {
      this.#sessionId = (data as GatewayReadyDispatchData).session_id;
      // Set to total guild count.
      if (this.manager.totalGuildCount !== (data as GatewayReadyDispatchData).guilds.length)
        this.manager.totalGuildCount = (data as GatewayReadyDispatchData).guilds.length;
      this.emit(ShardEvents.Ready);
    }

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
        if (this.#ws !== null) {
          this.#lastPingTimestamp = Date.now();
          this.#debug(`Sent heartbeat to gateway.`);
          this.send({
            op: GatewayOpcodes.Heartbeat,
            d: this.#sequence
          });
        }
      }, ms);
    }
  }

  /**
   * Handle heartbeat ACK
   */
  #heartbeatACK() {
    const latency = Date.now() - (this.#lastPingTimestamp ?? 0);
    this.#ping = latency;
    this.#debug(`Received heartbeat ACK. Latency: ${latency}ms`);
  }

  /**
   * Send data to the gateway
   * @param data - Data to send to the gateway
   */
  public send(data: unknown) {
    if (this.#ws === null || this.#ws.readyState !== WebSocket.OPEN)
      throw new Error('Shard is not connected, message cannot be sent');
    this.#ws.send(this.manager.pack(data));
  }

  #debug(message: string) {
    this.manager.client.debug(`[Dinord => Shard (${this.id})]: ${message}`);
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(toObject(this, ['id', 'manager', 'sessionId', 'state', 'ping']), options);
  }

  public toString() {
    return `Shard (id: ${this.id}, state: ${this.#state})`;
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

  /**
   *
   * Ping of this shard
   */
  public get ping() {
    return this.#ping;
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
