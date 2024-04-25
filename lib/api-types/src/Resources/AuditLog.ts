import type { IApiApplicationCommand } from "api-types/src/Interactions/ApplicationCommands.ts";
import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiChannel } from "api-types/src/Resources/Channel.ts";
import type { IApiIntegration } from "api-types/src/Resources/Guild.ts";
import type { IApiGuildScheduledEvent } from "api-types/src/Resources/GuildScheduledEvent.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";
import type { IApiWebhook } from "api-types/src/Resources/Webhook.ts";
import type { IApiAutoModerationRule } from "api-types/src/Resources/mod.ts";

export interface IApiAuditLog {
	application_commands: IApiApplicationCommand[];
	audit_log_entries: IApiAuditLogEntry[];
	auto_moderation_rules: IApiAutoModerationRule[];
	guild_scheduled_events: IApiGuildScheduledEvent[];
	integrations: Partial<IApiIntegration>[];
	threads: IApiChannel[];
	users: IApiUser[];
	webhooks: IApiWebhook[];
}

export interface IApiAuditLogEntry {
	target_id: Optional<string>;
	changes?: IApiAuditLogChange[];
	user_id: Optional<Snowflake>;
	id: Snowflake;
	action_type: ApiAuditLogEvent;
	options?: IApiOptionalAuditEntryInfo;
	reason?: string;
}

export const enum ApiAuditLogEvent {
	GUILD_UPDATE = 1,
	CHANNEL_CREATE = 10,
	CHANNEL_UPDATE = 11,
	CHANNEL_DELETE = 12,
	CHANNEL_OVERWRITE_CREATE = 13,
	CHANNEL_OVERWRITE_UPDATE = 14,
	CHANNEL_OVERWRITE_DELETE = 15,
	MEMBER_KICK = 20,
	MEMBER_PRUNE = 21,
	MEMBER_BAN_ADD = 22,
	MEMBER_BAN_REMOVE = 23,
	MEMBER_UPDATE = 24,
	MEMBER_ROLE_UPDATE = 25,
	MEMBER_MOVE = 26,
	MEMBER_DISCONNECT = 27,
	BOT_ADD = 28,
	ROLE_CREATE = 30,
	ROLE_UPDATE = 31,
	ROLE_DELETE = 32,
	INVITE_CREATE = 40,
	INVITE_UPDATE = 41,
	INVITE_DELETE = 42,
	WEBHOOK_CREATE = 50,
	WEBHOOK_UPDATE = 51,
	WEBHOOK_DELETE = 52,
	EMOJI_CREATE = 60,
	EMOJI_UPDATE = 61,
	EMOJI_DELETE = 62,
	MESSAGE_DELETE = 72,
	MESSAGE_BULK_DELETE = 73,
	MESSAGE_PIN = 74,
	MESSAGE_UNPIN = 75,
	INTEGRATION_CREATE = 80,
	INTEGRATION_UPDATE = 81,
	INTEGRATION_DELETE = 82,
	STAGE_INSTANCE_CREATE = 83,
	STAGE_INSTANCE_UPDATE = 84,
	STAGE_INSTANCE_DELETE = 85,
	STICKER_CREATE = 90,
	STICKER_UPDATE = 91,
	STICKER_DELETE = 92,
	GUILD_SCHEDULED_EVENT_CREATE = 100,
	GUILD_SCHEDULED_EVENT_UPDATE = 101,
	GUILD_SCHEDULED_EVENT_DELETE = 102,
	THREAD_CREATE = 110,
	THREAD_UPDATE = 111,
	THREAD_DELETE = 112,
	APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
	AUTO_MODERATION_RULE_CREATE = 140,
	AUTO_MODERATION_RULE_UPDATE = 141,
	AUTO_MODERATION_RULE_DELETE = 142,
	AUTO_MODERATION_BLOCK_MESSAGE = 143,
	AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
	AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
	CREATOR_MONETIZATION_REQUEST_CREATED = 150,
	CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
}

export interface IApiOptionalAuditEntryInfo {
	application_id: Snowflake;
	auto_moderation_rule_name: string;
	auto_moderation_rule_trigger_type: string;
	channel_id: Snowflake;
	count: string;
	delete_member_days: string;
	id: Snowflake;
	members_removed: string;
	message_id: Snowflake;
	role_name: string;
	type: string;
	integration_type: string;
}

export interface IApiAuditLogChange {
	new_value?: unknown;
	old_value?: unknown;
	key: string;
}
