import { Nullable, wait } from '../../Utils/Utils.ts';
import { Client } from '../Client.ts';
import { Shard } from './Shard.ts';
import { Zlib } from './Zlib.ts';

export class WebSocketManager implements IWebSocketManager {
  private readonly shardQueue: Shard[] = [];
  public readonly shards: Shard[] = [];
  private totalShardCount = 0;
  private maxConcurrency: Nullable<number> = null;
  public readonly GATEWAY_URL = 'wss://gateway.discord.gg/?v=10';
  public readonly zlib = new Zlib();

  constructor(public readonly client: Client) {
    this.GATEWAY_URL += `&encoding=${this.options.encoding}`;
    if (this.options.compress === true) {
      this.GATEWAY_URL += '&compress=zlib-stream';
    }
  }

  public async connect() {
    const response = await this.client.rest.get('/gateway/bot');
    const gatewayInfo = await response.json();
    this.maxConcurrency = gatewayInfo.session_start_limit.max_concurrency;
    this.totalShardCount = this.options.shardCount ?? gatewayInfo.shards;
    this.createShards();
    console.log(
      `WebSocketManager: Trying to connect ${this.totalShardCount} shards...`,
    );
    await this.tryConnectShards();
  }

  public disconnect() {
    throw new Error('Method not implemented.');
  }

  public createShards() {
    console.log(`WebSocketManager: Creating ${this.totalShardCount} shards...`);
    for (let i = 0; i < this.totalShardCount; i++) {
      this.shardQueue.push(new Shard(i, this));
    }
  }

  public async tryConnectShards() {
    while (true) {
      if (this.shardQueue.length === 0) break;

      const shard = this.shardQueue.shift();
      if (!shard) break;

      const rateLimitKey = shard.id % this.maxConcurrency!;
      if (shard.id !== 0 && rateLimitKey === 0) {
        console.log(
          `WebSocketManager: Waiting 5 seconds for shard ${shard.id} rate limit...`,
        );
        await wait(5000);
      }
      await shard.connect();
      this.shards.push(shard);
    }

    if (this.shardQueue.length > 0) {
      await this.tryConnectShards();
    }
  }

  public get options(): IWebSocketManagerOptions {
    return this.client.options.ws;
  }
}

export interface IWebSocketManager {
  /**
   * Create shards and connect to gateway.
   */
  connect(): Promise<void>;
  /**
   * Disconnects the client from the gateway.
   */
  disconnect(): Promise<void>;
  /**
   * Create shards.
   */
  createShards(): void;
  /**
   * Try to connect shards.
   */
  tryConnectShards(): Promise<void>;
}

export interface IWebSocketManagerOptions {
  /**
   * Gateway intents.
   */
  intents: number;
  /**
   * Total shard count.
   */
  shardCount?: number;
  /**
   * Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list
   */
  largeThreshold?: number;
  /**
   * Whether this connection supports compression of packets
   */
  compress: boolean;
  /**
   * The encoding of received gateway packets
   */
  encoding: 'json' | 'etf';
}
