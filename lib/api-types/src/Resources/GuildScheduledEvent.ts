import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiGuildMember } from "api-types/src/Resources/Guild.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";

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
	status: ApiGuildScheduledEventStatus;
	entity_type: ApiGuildScheduledEventEntityType;
	entity_id: Optional<Snowflake>;
	entity_metadata: Optional<IApiGuildScheduledEventEntityMetadata>;
	creator?: IApiUser;
	user_count?: number;
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
