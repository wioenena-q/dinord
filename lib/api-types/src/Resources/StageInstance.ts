import type { Optional, Snowflake } from "../mod.ts";

export interface IApiStageInstance {
	id: Snowflake;
	guild_id: Snowflake;
	channel_id: Snowflake;
	topic: string;
	privacy_level: ApiPrivacyLevel;
	discoverable_disabled: boolean;
	guild_scheduled_event_id: Optional<Snowflake>;
}

export const enum ApiPrivacyLevel {
	PUBLIC = 1,
	GUILD_ONLY = 2,
}
