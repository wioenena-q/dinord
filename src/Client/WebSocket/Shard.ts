import { TypedEmitter } from '../../Utils/TypedEmitter.ts';
import { Nullable } from '../../Utils/Utils.ts';
import { WebSocketManager } from './WebSocketManager.ts';
import { ZlibState } from './Zlib.ts';
import {
  pack as VoidPack,
  unpack as VoidUnpack,
} from 'https://deno.land/x/void@1.0.3/mod.ts';

export class Shard extends TypedEmitter<IShardEvents> implements IShard {
  private socket: Nullable<WebSocket> = null;
  public constructor(
    public readonly id: number,
    public readonly manager: WebSocketManager,
  ) {
    super();
  }

  connect(): Promise<void> {
    if (this.socket === null) {
      this.socket = new WebSocket(this.manager.GATEWAY_URL);
      this.socket.onopen = this.onOpen;
      this.socket.onmessage = this.onMessage;
      this.socket.onerror = this.onError;
      this.socket.onclose = this.onClose;
      return Promise.resolve();
    } else return Promise.reject(`Shard ${this.id} is already connected!`);
  }

  disconnect() {
    return Promise.resolve();
  }

  private onOpen = (event: Event) => {};

  private onMessage = async (event: MessageEvent<string | Blob>) => {
    if (event.data instanceof Blob) {
      const data = new Uint8Array(await event.data.arrayBuffer());

      if (this.manager.options.compress) {
        const compressed = await this.manager.zlib.decompress(data);
        if (
          compressed === null ||
          this.manager.zlib.state === ZlibState.PENDING_DECOMPRESS
        ) return;

        this.onPacket(
          this.manager.options.encoding === 'etf'
            ? VoidUnpack(compressed)
            : JSON.parse(compressed.toString()),
        );
        return;
      } else if (this.manager.options.encoding === 'etf') {
        this.onPacket(VoidUnpack(data));
      }
    } else this.onPacket(JSON.parse(event.data));
  };

  private onError = (event: Event | ErrorEvent) => {};

  private onClose = (event: CloseEvent) => {};

  private onPacket(data: Record<string, unknown>) {
    console.log(data);
  }
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
