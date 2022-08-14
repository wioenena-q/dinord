import { Collection, GatewayDispatchEvents } from '../../../deps.ts';
import { WebSocketManager } from '../WebSocketManager.ts';
import type { Base } from './Base.ts';
import { GuildCreateEvent } from './GUILD_CREATE.ts';
import { GuildDeleteEvent } from './GUILD_DELETE.ts';
import { GuildUpdateEvent } from './GUILD_UPDATE.ts';
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
        case GatewayDispatchEvents.GuildCreate:
          this.set(GatewayDispatchEvents.GuildCreate, new GuildCreateEvent(this.#ws.client));
          break;
        case GatewayDispatchEvents.GuildDelete:
          this.set(GatewayDispatchEvents.GuildDelete, new GuildDeleteEvent(this.#ws.client));
          break;
        case GatewayDispatchEvents.GuildUpdate:
          this.set(GatewayDispatchEvents.GuildUpdate, new GuildUpdateEvent(this.#ws.client));
          break;
      }
    }
  }
}
