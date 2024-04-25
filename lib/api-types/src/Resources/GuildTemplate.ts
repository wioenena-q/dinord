import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiGuild } from "api-types/src/Resources/Guild.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";

export interface IApiGuildTemplate {
	code: string;
	name: string;
	description: Optional<string>;
	usage_count: number;
	creator_id: Snowflake;
	creator: IApiUser;
	created_at: string;
	updated_at: string;
	source_guild_id: Snowflake;
	serialized_source_guild: Partial<IApiGuild>;
	is_dirty: Optional<boolean>;
}
