import { Role } from '../../Structures/Guild/Role.ts';
import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';
import { APIRole } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

/**
 * @class
 * @classdesc Manager of guild roles.
 * @extends {BaseManagerForGuild<Snowflake, Role>}
 */
export class GuildRoleManager extends BaseManagerForGuild<Snowflake, Role> {
  public add(data: APIRole) {
    const exists = this.get(data.id);

    if (exists) exists.patch(data);
    else this.set(data.id, new Role(this.guild, data));
  }
}
