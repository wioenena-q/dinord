import type { Snowflake } from "../mod.ts";

export interface IApiAutoModerationRule {
	id: Snowflake;
	guild_id: Snowflake;
	name: string;
	creator_id: Snowflake;
	event_type: ApiEventType;
	trigger_type: ApiTriggerTypes;
	trigger_metadata: IApiTriggerMetadata;
	actions: IApiAutoModerationAction[];
	enabled: boolean;
	exempt_roles: Snowflake[];
	exempt_channels: Snowflake[];
}

export const enum ApiTriggerType {
	KEYWORD = 1,
	SPAM = 3,
	KEYWORD_PRESET = 4,
	MENTION_SPAM = 5,
}

export interface IApiTriggerMetadata {
	keyword_filter: string[];
	regex_patterns: string[];
	presets: ApiKeywordPresetType[];
	allow_list: string[];
	mention_total_limit: number;
	mention_raid_protection_enabled: boolean;
}

export const enum ApiKeywordPresetType {
	PROFANITY = 1,
	SEXUAL_CONTENT = 2,
	SLURS = 3,
}

export const enum ApiEventType {
	MESSAGE_SEND = 1,
}

export interface IApiAutoModerationAction {
	type: ApiActionType;
	metadata?: IApiActionMetadata;
}

export const enum ApiActionTypes {
	BLOCK_MESSAGE = 1,
	SEND_ALERT_MESSAGE = 2,
	TIMEOUT = 3,
}

export interface IApiActionMetadata {
	channel_id: Snowflake;
	duration_seconds: number;
	custom_message?: string;
}
