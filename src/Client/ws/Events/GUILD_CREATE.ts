import { Guild } from '../../../Structures/Guild/Guild.ts';
import { ClientEvents } from '../../Client.ts';
import { Base } from './Base.ts';

import type { GatewayGuildCreateDispatchData } from '../../../deps.ts';

/**
 * @class
 * @classdesc The class that will handle the GUILD_CREATE event
 */
export class GuildCreateEvent extends Base {
  public exec(data: GatewayGuildCreateDispatchData) {
    const existGuild = this.client.guilds.get(data.id);

    // If data is exist in cache, update it
    if (existGuild) {
      existGuild.patch(data);
    } else {
      // Create a new guild and set to cache.
      const guild = new Guild(this.client, data);
      this.client.guilds.set(data.id, guild);

      // If guild size is equal to total guild count, Client is ready
      if (this.client.guilds.size === this.client.ws.totalGuildCount) {
        this.client.emit(ClientEvents.Ready);
      } else if (this.client.guilds.size >= this.client.ws.totalGuildCount) {
        this.client.emit(ClientEvents.GuildCreate, guild);
      }
    }
  }
}
