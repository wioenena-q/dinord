import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiChannel } from "api-types/src/Resources/Channel.ts";
import type { IApiGuild } from "api-types/src/Resources/Guild.ts";
import type { IApiUser } from "api-types/src/Resources/mod.ts";

export interface IApiWebhook {
	id: Snowflake;
	type: ApiWebhookType;
	guild_id?: Optional<Snowflake>;
	channel_id: Optional<Snowflake>;
	user?: IApiUser;
	name: Optional<string>;
	avatar: Optional<string>;
	token?: string;
	application_id: Optional<Snowflake>;
	source_guild?: Partial<IApiGuild>;
	source_channel?: Partial<IApiChannel>;
	url?: string;
}

export const enum ApiWebhookType {
	Incoming = 1,
	ChannelFollower = 2,
	Application = 3,
}
