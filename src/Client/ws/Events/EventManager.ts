import { GatewayDispatchEvents } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import { Collection } from '../../../deps.ts';
import { WebSocketManager } from '../WebSocketManager.ts';
import type { Base } from './Base.ts';
import { ReadyEvent } from './READY.ts';

/**
 * @class
 * @extends {Collection<GatewayDispatchEvents, Base>}
 */
export class EventManager extends Collection<GatewayDispatchEvents, Base> {
  // WebSocketManager instance, for access to Client
  #ws: WebSocketManager;

  public constructor(ws: WebSocketManager) {
    super();
    this.#ws = ws;
  }

  public registerAll() {
    const eventNames = Object.values(GatewayDispatchEvents);

    for (const eventName of eventNames) {
      switch (eventName) {
        case GatewayDispatchEvents.Ready:
          this.set(GatewayDispatchEvents.Ready, new ReadyEvent(this.#ws.client));
          break;
      }
    }
  }
}
