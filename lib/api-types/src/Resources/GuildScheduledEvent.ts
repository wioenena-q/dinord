import type { Optional, Snowflake } from "../mod.ts";
import type { IApiGuildMember } from "./Guild.ts";

export interface IApiGuildScheduledEvent {
	id: Snowflake;
	guild_id: Snowflake;
	channel_id: Optional<Snowflake>;
	creator_id?: Optional<Snowflake>;
	name: string;
	description?: Optional<string>;
	scheduled_start_time: string;
	scheduled_end_time: Optional<string>;
	privacy_level: ApiGuildScheduledEventPrivacyLevel;
	status: ApiGuildScheduledEventStatu;
	entity_type: ApiGuildScheduledEventEntityType;
	entity_id: Optional<Snowflake>;
	entity_metadata: Optional<IApiGuildScheduledEventEntityMetadata>;
	creator?: IApiUser;
	user_count?: integer;
	image?: Optional<string>;
}

export const enum ApiGuildScheduledEventPrivacyLevel {
	GUILD_ONLY = 2,
}

export const enum ApiGuildScheduledEventEntityType {
	STAGE_INSTANCE = 1,
	VOICE = 2,
	EXTERNAL = 3,
}

export const enum ApiGuildScheduledEventStatus {
	SCHEDULED = 1,
	ACTIVE = 2,
	COMPLETED = 3,
	CANCELED = 4,
}

export interface IApiGuildScheduledEventEntityMetadata {
	location?: string;
}

export interface IApiGuildScheduledEventUser {
	guild_scheduled_event_id: Snowflake;
	user: IApiUser;
	member?: IApiGuildMember;
}
