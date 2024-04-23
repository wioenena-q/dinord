import { Optional, Snowflake } from "../mod.ts";
import { IApiApplication } from "./Application.ts";
import { IApiChannel } from "./Channel.ts";
import { IApiEmoji } from "./Emoji.ts";

export interface IApiGuild {
	id: Snowflake;
	name: string;
	icon: Optional<string>;
	icon_hash?: Optional<string>;
	splash: Optional<string>;
	discovery_splash: Optional<string>;
	owner?: boolean;
	owner_id: Snowflake;
	permissions?: string;
	region?: Optional<string>;
	afk_channel_id: Optional<Snowflake>;
	afk_timeout: number;
	widget_enabled?: boolean;
	widget_channel_id?: Optional<Snowflake>;
	verification_level: ApiVerificationLevel;
	default_message_notifications: ApiDefaultMessageNotificationLevel;
	explicit_content_filter: ApiExplicitContentFilterLevel;
	roles: IApiRole[];
	emojis: IApiEmoji[];
	features: ApiGuildFeature[];
	mfa_level: ApiMFALevel;
	application_id: Optional<Snowflake>;
	system_channel_id: Optional<Snowflake>;
	system_channel_flags: number;
	rules_channel_id: Optional<Snowflake>;
	max_presences?: Optional<number>;
	max_members?: number;
	vanity_url_code: Optional<string>;
	description: Optional<string>;
	banner: Optional<string>;
	premium_tier: ApiPremiumTier;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id: Optional<Snowflake>;
	max_video_channel_users?: number;
	max_stage_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
	welcome_screen?: IApiWelcomeScreen;
	nsfw_level: ApiGuildNSFWLevel;
	stickers?: IApiSticker[];
	premium_progress_bar_enabled: boolean;
	safety_alerts_channel_id: Optional<Snowflake>;
}

export const enum ApiDefaultMessageNotificationLevel {
	ALL_MESSAGES = 0,
	ONLY_MENTIONS = 1,
}

export const enum ApiExplicitContentFilterLevel {
	DISABLED = 0,
	MEMBERS_WITHOUT_ROLES = 1,
	ALL_MEMBERS = 2,
}

export const enum ApiMFALevel {
	NONE = 0,
	ELEVATED = 1,
}

export const enum ApiVerificationLevel {
	NONE = 0,
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
	VERY_HIGH = 4,
}

export const enum ApiGuildNSFWLevel {
	DEFAULT = 0,
	EXPLICIT = 1,
	SAFE = 2,
	AGE_RESTRICTED = 3,
}

export const enum ApiPremiumTier {
	NONE = 0,
	TIER_1 = 1,
	TIER_2 = 2,
	TIER_3 = 3,
}

export const enum ApiSystemChannelFlag {
	SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
	SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
	SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
	SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
	SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 1 << 4,
	SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5,
}

export type ApiGuildFeature =
	| "ANIMATED_BANNER"
	| "ANIMATED_ICON"
	| "APPLICATION_COMMAND_PERMISSIONS_V2"
	| "AUTO_MODERATION"
	| "BANNER"
	| "COMMUNITY"
	| "CREATOR_MONETIZABLE_PROVISIONAL"
	| "CREATOR_STORE_PAGE"
	| "DEVELOPER_SUPPORT_SERVER"
	| "DISCOVERABLE"
	| "FEATURABLE"
	| "INVITES_DISABLED"
	| "INVITE_SPLASH"
	| "MEMBER_VERIFICATION_GATE_ENABLED"
	| "MORE_STICKERS"
	| "NEWS"
	| "PARTNERED"
	| "PREVIEW_ENABLED"
	| "RAID_ALERTS_DISABLED"
	| "ROLE_ICONS"
	| "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE"
	| "ROLE_SUBSCRIPTIONS_ENABLED"
	| "TICKETED_EVENTS_ENABLED"
	| "VANITY_URL"
	| "VERIFIED"
	| "VIP_REGIONS"
	| "WELCOME_SCREEN_ENABLED";

export type ApiMutableGuildFeature =
	| "COMMUNITY"
	| "DISCOVERABLE"
	| "INVITES_DISABLED"
	| "RAID_ALERTS_DISABLED";

export interface IApiUnavailableGuild extends Pick<IApiGuild, "id"> {
	unavailable: boolean; // Always true
}

export interface IApiGuildPreview {
	id: Snowflake;
	name: string;
	icon: Optional<string>;
	splash: Optional<string>;
	discovery_splash: Optional<string>;
	emojis: IApiEmoji[];
	features: ApiGuildFeature[];
	approximate_member_count: number;
	approximate_presence_count: number;
	description: Optional<string>;
	stickers: IApiSticker[];
}

export interface IApiGuildWidgetSettings {
	enabled: boolean;
	channel_id: Optional<Snowflake>;
}

export interface IApiGuildWidget {
	id: Snowflake;
	name: string;
	instant_invite: Optional<string>;
	channels: Partial<IApiChannel>[];
	members: Partial<IApiUser>[];
	presence_count: number;
}

export interface IApiGuildMember {
	user?: IApiUser;
	nick?: Optional<string>;
	avatar?: Optional<string>;
	roles: Snowflake[];
	joined_at: string;
	premium_since?: Optional<string>;
	deaf: boolean;
	mute: boolean;
	flags: number;
	pending?: boolean;
	permissions?: string;
	communication_disabled_until?: Optional<string>;
}

export const enum ApiGuildMemberFlag {
	DID_REJOIN = 1 << 0,
	COMPLETED_ONBOARDING = 1 << 1,
	BYPASSES_VERIFICATION = 1 << 2,
	STARTED_ONBOARDING = 1 << 3,
}

export interface IApiIntegration {
	id: Snowflake;
	name: string;
	type: string; // 	Integration type (twitch, youtube, discord, or guild_subscription)
	enabled: boolean;
	syncing?: boolean;
	role_id?: Snowflake;
	enable_emoticons?: boolean;
	expire_behavior?: ApiIntegrationExpireBehavior;
	expire_grace_period?: number;
	user?: IApiUser;
	account: IApiIntegrationAccount;
	synced_at?: string;
	subscriber_count?: number;
	revoked?: boolean;
	application?: IApiIntegrationApplication;
	scopes?: ApiOAuth2Scope;
}

export const enum ApiIntegrationExpireBehavior {
	Removerole = 0,
	Kick = 1,
}

export interface IApiIntegrationAccount {
	id: string;
	name: string;
}

export interface IApiIntegrationApplication {
	id: Snowflake;
	name: string;
	icon: Optional<string>;
	description: string;
	bot?: IApiUser;
}

export interface IApiBan {
	reason: Optional<string>;
	user: IApiUser;
}

export interface IApiWelcomeScreen {
	description: Optional<string>;
	welcome_channels: IApiWelcomeScreenChannel[];
}

export interface IApiWelcomeScreenChannel {
	channel_id: Snowflake;
	description: string;
	emoji_id: Optional<Snowflake>;
	emoji_name: Optional<string>;
}

export interface IApiGuildOnboarding {
	guild_id: Snowflake;
	prompts: IApiOnboardingPrompt[];
	default_channel_ids: Snowflake[];
	enabled: boolean;
	mode: ApiOnboardingMode;
}

export interface IApiOnboardingPrompt {
	id: Snowflake;
	type: ApiPromptType;
	options: IApiPromptOption[];
	title: string;
	single_select: boolean;
	required: boolean;
	in_onboarding: boolean;
}

export interface IApiPromptOption {
	id: Snowflake;
	channel_ids: Snowflake[];
	role_ids: Snowflake[];
	emoji?: IApiEmoji;
	emoji_id?: Snowflake;
	emoji_name?: string;
	emoji_animated?: boolean;
	title: string;
	description: Optional<string>;
}

export const enum ApiOnboardingMode {
	ONBOARDING_DEFAULT = 0,
	ONBOARDING_ADVANCED = 1,
}

export const enum ApiPromptType {
	MULTIPLE_CHOICE = 0,
	DROPDOWN = 1,
}
