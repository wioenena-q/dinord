import { GuildEmoji } from '../../Structures/Guild/GuildEmoji.ts';
import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';
import type { APIEmoji } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

/**
 * @class
 * @classdesc Manager of guild emojis.
 * @extends {BaseManagerForGuild<Snowflake, GuildEmoji>}
 */
export class GuildEmojiManager extends BaseManagerForGuild<Snowflake, GuildEmoji> {
  public add(data: APIEmoji) {
    const exists = this.cache.get(data.id!);

    if (exists) exists.patch(data);
    else this.cache.set(data.id!, new GuildEmoji(this.guild, data));
  }
}
