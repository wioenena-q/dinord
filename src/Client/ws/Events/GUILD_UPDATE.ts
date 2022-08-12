import { ClientEvents } from '../../Client.ts';
import { Base } from './Base.ts';

import type { GatewayGuildUpdateDispatchData } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

/**
 * @class
 * @classdesc The class that will handle the GUILD_UPDATE event
 */
export class GuildUpdateEvent extends Base {
  public exec(data: GatewayGuildUpdateDispatchData) {
    // If data is exist in cache, update it
    const existGuild = this.client.guilds.get(data.id);

    if (existGuild) {
      const old = existGuild.update(data);
      this.client.emit(ClientEvents.GuildUpdate, old, existGuild);
    }
  }
}
