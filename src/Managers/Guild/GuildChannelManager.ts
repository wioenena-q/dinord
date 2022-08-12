import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';

/**
 * @class
 * @classdesc Manager of guild channels.
 * @extends {BaseManagerForGuild<Snowflake, unknown>}
 */
export class GuildChannelManager extends BaseManagerForGuild<Snowflake, unknown> {}
