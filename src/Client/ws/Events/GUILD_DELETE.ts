import { ClientEvents } from '../../Client.ts';
import { Base } from './Base.ts';

import type { GatewayGuildDeleteDispatchData } from '../../../deps.ts';

/**
 * @class
 * @classdesc The class that will handle the GUILD_DELETE event
 */
export class GuildDeleteEvent extends Base {
  public exec(data: GatewayGuildDeleteDispatchData) {
    // If data is exist in cache, update it
    const guild = this.client.guilds.get(data.id);

    if (guild) {
      this.client.guilds.delete(data.id);
      this.client.ws.totalGuildCount--;
      this.client.emit(ClientEvents.GuildDelete, guild);
    }
  }
}
