import type { IApiApplication } from "api-types/src/Resources/Application.ts";
import type {
	ApiTriggerType,
	IApiAutoModerationAction,
} from "api-types/src/Resources/AutoModeration.ts";
import type {
	IApiChannel,
	IApiThreadMember,
} from "api-types/src/Resources/Channel.ts";
import type { IApiEmoji } from "api-types/src/Resources/Emoji.ts";
import type {
	IApiGuildMember,
	IApiUnavailableGuild,
} from "api-types/src/Resources/Guild.ts";
import type { IApiGuildScheduledEvent } from "api-types/src/Resources/GuildScheduledEvent.ts";
import type { ApiInviteTargetType } from "api-types/src/Resources/Invite.ts";
import type { IApiStageInstance } from "api-types/src/Resources/StageInstance.ts";
import type { IApiSticker } from "api-types/src/Resources/Sticker.ts";
import type { IApiVoiceState } from "api-types/src/Resources/Voice.ts";
import type { IApiUser } from "api-types/src/Resources/mod.ts";
import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiRole } from "api-types/src/Topics/Permissions.ts";

export interface IApiPayload {
	op: number;
	d: Optional<unknown>;
	s: Optional<number>;
	t: Optional<number>;
}

export interface IApiIdentify {
	token: string;
	properties: IApiIdentifyConnectionProperties;
	compress?: boolean;
	large_threshold?: number;
	shard?: [number, number];
	presence?: IApiGatewayPresenceUpdate;
	intents: number;
}

export interface IApiIdentifyConnectionProperties {
	os: string;
	browser: string;
	device: string;
}

export interface IApiResume {
	token: string;
	session_id: string;
	seq: number;
}

export interface IApiRequestGuildMembers {
	guild_id: Snowflake;
	query?: string;
	limit: number;
	presences?: boolean;
	user_ids?: Snowflake;
	nonce?: string;
}

export interface IApiGatewayVoiceStateUpdate {
	guild_id: Snowflake;
	channel_id: Optional<Snowflake>;
	self_mute: boolean;
	self_deaf: boolean;
}

export interface IApiGatewayPresenceUpdate {
	since: Optional<number>;
	activities: IApiActivity[];
	status: ApiStatusType;
	afk: boolean;
}

export const enum ApiStatusType {
	ONLINE = "online",
	DND = "dnd",
	IDLE = "idle",
	INVISIBLE = "invisible",
	OFFLINE = "offline",
}

export interface IApiHello {
	heartbeat_interval: number;
}

export interface IApiReadyEvent {
	v: number;
	user: IApiUser;
	guilds: IApiUnavailableGuild[];
	session_id: string;
	resume_gateway_url: string;
	shard?: [number, number];
	application: Partial<IApiApplication>;
}

export interface IApiAutoModerationActionExecutionEvent {
	guild_id: Snowflake;
	action: IApiAutoModerationAction;
	rule_id: Snowflake;
	rule_trigger_type: ApiTriggerType;
	user_id: Snowflake;
	channel_id?: Snowflake;
	message_id?: Snowflake;
	alert_system_message_id?: Snowflake;
	content: string;
	matched_keyword: Optional<string>;
	matched_content: Optional<string>;
}

export interface IApiThreadListSyncEvent {
	guild_id: Snowflake;
	channel_ids?: Snowflake[];
	threads: IApiChannel[];
	members: IApiThreadMember[];
}

export interface IApiThreadMemberUpdateEventExtra {
	guild_id: Snowflake;
}

export interface IApiThreadMembersUpdateEvent {
	id: Snowflake;
	guild_id: Snowflake;
	member_count: number;
	added_members?: IApiThreadMember[];
	removed_member_ids?: Snowflake[];
}

export interface IApiChannelPinsUpdateEvent {
	guild_id?: Snowflake;
	channel_id: Snowflake;
	last_pin_timestamp?: Optional<string>;
}

export interface IApiGuildCreateExtra {
	joined_at: string;
	large: boolean;
	unavailable?: boolean;
	member_count: number;
	voice_states: Partial<IApiVoiceState>[];
	members: IApiGuildMember[];
	channels: IApiChannel[];
	threads: IApiChannel[];
	presences: Partial<IApiPresenceUpdateEventFields>[];
	stage_instances: IApiStageInstance[];
	guild_scheduled_events: IApiGuildScheduledEvent[];
}

export interface IApiGuildBanAddEvent {
	guild_id: Snowflake;
	user: IApiUser;
}

export interface IApiGuildBanRemoveEvent {
	guild_id: Snowflake;
	user: IApiUser;
}

export interface IApiGuildEmojisUpdateEvent {
	guild_id: Snowflake;
	emojis: IApiEmoji[];
}

export interface IApiGuildStickersUpdateEvent {
	guild_id: Snowflake;
	stickers: IApiSticker[];
}

export interface IApiGuildIntegrationsUpdateEvent {
	guild_id: Snowflake;
}

export interface IApiGuildMemberAddExtra {
	guild_id: Snowflake;
}

export interface IApiGuildMemberRemoveEvent {
	guild_id: Snowflake;
	user: IApiUser;
}

export interface IApiGuildMemberUpdateEvent {
	guild_id: Snowflake;
	roles: Snowflake[];
	user: IApiUser;
	nick?: Optional<string>;
	avatar: Optional<string>;
	joined_at: Optional<string>;
	premium_since?: Optional<string>;
	deaf?: boolean;
	mute?: boolean;
	pending?: boolean;
	communication_disabled_until?: Optional<string>;
}

export interface IApiGuildMembersChunkEvent {
	guild_id: Snowflake;
	members: IApiGuildMember[];
	chunk_index: number;
	chunk_count: number;
	not_found?: Snowflake[];
	presences?: IApiPresenceUpdateEventFields[];
	nonce?: string;
}

export interface IApiGuildRoleCreateEvent {
	guild_id: Snowflake;
	role: IApiRole;
}

export interface IApiGuildRoleUpdateEvent {
	guild_id: Snowflake;
	role: IApiRole;
}

export interface IApiGuildRoleDeleteEvent {
	guild_id: Snowflake;
	role_id: Snowflake;
}

export interface IApiGuildScheduledEventUserAddEvent {
	guild_scheduled_event_id: Snowflake;
	user_id: Snowflake;
	guild_id: Snowflake;
}

export interface IApiGuildScheduledEventUserRemoveEvent {
	guild_scheduled_event_id: Snowflake;
	user_id: Snowflake;
	guild_id: Snowflake;
}

export interface IApiIntegrationCreateEventAdditional {
	guild_id: Snowflake;
}

export interface IApiIntegrationUpdateEventAdditional {
	guild_id: Snowflake;
}

export interface IApiIntegrationDeleteEvent {
	id: Snowflake;
	guild_id: Snowflake;
	application_id?: Snowflake;
}

export interface IApiInviteCreateEvent {
	channel_id: Snowflake;
	code: string;
	created_at: string;
	guild_id?: Snowflake;
	inviter?: IApiUser;
	max_age: number;
	max_uses: number;
	target_type?: ApiInviteTargetType;
	target_user?: IApiUser;
	target_application?: Partial<IApiApplication>;
	temporary: boolean;
	uses: number;
}

export interface IApiInviteDeleteEvent {
	channel_id: Snowflake;
	guild_id?: Snowflake;
	code: string;
}

export interface IApiMessageCreateExtra {
	guild_id?: Snowflake;
	member?: Partial<IApiGuildMember>;
	mentions: IApiUser[];
}

export interface IApiMessageDeleteEvent {
	id: Snowflake;
	channel_id: Snowflake;
	guild_id?: Snowflake;
}

export interface IApiMessageDeleteBulkEvent {
	ids: Snowflake[];
	channel_id: Snowflake;
	guild_id?: Snowflake;
}

export interface IApiMessageReactionAddEvent {
	user_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
	member?: IApiGuildMember;
	emoji: Partial<IApiEmoji>;
	message_author_id?: Snowflake;
}

export interface IApiMessageReactionRemoveEvent {
	user_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
	emoji: Partial<IApiEmoji>;
}

export interface IApiMessageReactionRemoveAllEvent {
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
}

export interface IApiMessageReactionRemoveEmojiEvent {
	channel_id: Snowflake;
	guild_id?: Snowflake;
	message_id: Snowflake;
	emoji: Partial<IApiEmoji>;
}

export interface IApiPresenceUpdateEventFields {
	user: IApiUser;
	guild_id: Snowflake;
	status: ApiStatusType;
	activities: IApiActivity[];
	client_status: IApiClientStatus;
}
export interface IApiClientStatus {
	desktop?: string;
	mobile?: string;
	web?: string;
}

export interface IApiActivity {
	name: string;
	type: ApiActivityType;
	url?: Optional<string>;
	created_at: number;
	timestamps?: IApiActivityTimestamps;
	application_id?: Snowflake;
	details?: Optional<string>;
	state?: Optional<string>;
	emoji?: Optional<IApiActivityEmoji>;
	party?: IApiActivityParty;
	assets?: IApiActivityAssets;
	secrets?: IApiActivitySecrets;
	instance?: boolean;
	flags?: number;
	buttons?: IApiActivityButtons[];
}

export const enum ApiActivityType {
	Game = 0,
	Streaming = 1,
	Listening = 2,
	Watching = 3,
	Custom = 4,
	Competing = 5,
}

export interface IApiActivityTimestamps {
	start?: number;
	end?: number;
}

export interface IApiActivityEmoji {
	name: string;
	id?: Snowflake;
	animated?: boolean;
}

export interface IApiActivityParty {
	id?: string;
	size?: [number, number];
}

export interface IApiActivityAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

export interface IApiActivitySecrets {
	join?: string;
	spectate?: string;
	match?: string;
}

export const enum ApiActivityFlag {
	INSTANCE = 1 << 0,
	JOIN = 1 << 1,
	SPECTATE = 1 << 2,
	JOIN_REQUEST = 1 << 3,
	SYNC = 1 << 4,
	PLAY = 1 << 5,
	PARTY_PRIVACY_FRIENDS = 1 << 6,
	PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
	EMBEDDED = 1 << 8,
}

export interface IApiActivityButtons {
	label: string;
	url: string;
}

export interface IApiTypingStartEvent {
	channel_id: Snowflake;
	guild_id?: Snowflake;
	user_id: Snowflake;
	timestamp: number;
	member?: IApiGuildMember;
}

export interface IApiVoiceServerUpdateEvent {
	token: string;
	guild_id: Snowflake;
	endpoint: Optional<string>;
}

export interface IApiWebhooksUpdateEvent {
	guild_id: Snowflake;
	channel_id: Snowflake;
}

export interface IApiMessagePollVoteAdd {
	user_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
	answer_id: number;
}

export interface IApiMessagePollVoteRemove {
	user_id: Snowflake;
	channel_id: Snowflake;
	message_id: Snowflake;
	guild_id?: Snowflake;
	answer_id: number;
}
