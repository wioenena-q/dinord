import type { Optional, Snowflake } from "../mod.ts";
import type { IApiChannel } from "./Channel.ts";
import type { IApiGuild } from "./Guild.ts";
import type { IApiUser } from "./User.ts";

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
