import { TypedEmitter } from '../../Utils/TypedEmitter.ts';
import { WebSocketManager } from './WebSocketManager.ts';

export class Shard extends TypedEmitter<IShardEvents> implements IShard {
  public constructor(
    public readonly id: number,
    public readonly manager: WebSocketManager,
  ) {
    super();
  }

  connect() {
    return Promise.resolve();
  }

  disconnect() {
    return Promise.resolve();
  }

  private onOpen: (event: Event) => {};

  private onMessage: (event: MessageEvent<unknown>) => {};

  private onError: (event: ErrorEvent) => {};

  private onClose: (event: CloseEvent) => {};
}

export interface IShard {
  /**
   * Connects the shard to the gateway
   */
  connect(): Promise<void>;
  /**
   * Disconnects the shard from the gateway
   */
  disconnect(): Promise<void>;
}

export type IShardEvents = {};
