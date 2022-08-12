import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';

/**
 * @class
 * @classdesc Manager of guild voice states.
 * @extends {BaseManagerForGuild<Snowflake, unknown>}
 */
export class GuildVoiceStateManager extends BaseManagerForGuild<Snowflake, unknown> {}
