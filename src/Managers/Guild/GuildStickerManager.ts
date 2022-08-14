import { GuildSticker } from '../../Structures/Guild/GuildSticker.ts';
import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';
import type { APISticker } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

/**
 * @class
 * @classdesc Manager of guild stickers.
 * @extends {BaseManagerForGuild<Snowflake, GuildSticker>}
 */
export class GuildStickerManager extends BaseManagerForGuild<Snowflake, GuildSticker> {
  public add(data: APISticker) {
    const exists = this.cache.get(data.id);
    if (exists) exists.patch(data);
    else this.cache.set(data.id, new GuildSticker(this.guild, data));
  }
}
