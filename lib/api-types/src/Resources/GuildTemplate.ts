import type { Optional, Snowflake } from "../mod.ts";
import type { IApiGuild } from "./Guild.ts";

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
