import {
	ApiInteractionType,
	IApiResolvedData,
} from "../Interactions/Interaction.ts";
import { IApiMessageComponents } from "../Interactions/MessageComponents.ts";
import { Optional, Snowflake } from "../mod.ts";
import { IApiApplication } from "./Application.ts";

export interface IApiChannel {
	id: Snowflake;
	type: ApiChannelType;
	guild_id?: Snowflake;
	position?: number;
	permission_overwrites?: IApiOverwrite[];
	name?: Optional<string>;
	topic?: Optional<string>;
	nsfw?: boolean;
	last_message_id?: Optional<Snowflake>;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipients?: IApiUser[];
	icon?: Optional<string>;
	owner_id?: Snowflake;
	application_id?: Snowflake;
	managed?: boolean;
	parent_id?: Optional<Snowflake>;
	last_pin_timestamp?: Optional<string>;
	rtc_region?: Optional<string>;
	video_quality_mode?: number;
	message_count?: number;
	member_count?: number;
	thread_metadata?: IApiThreadMetadata;
	member?: IApiThreadMember;
	default_auto_archive_duration?: number;
	permissions?: string;
	flags?: number;
	total_message_sent?: number;
	available_tags?: IApiForumTag[];
	applied_tags?: Snowflake[];
	default_reaction_emoji?: Optional<IApiDefaultReaction>;
	default_thread_rate_limit_per_user?: number;
	default_sort_order?: Optional<number>;
	default_forum_layout?: number;
}

export const enum ApiChannelType {
	GUILD_TEXT = 0,
	DM = 1,
	GUILD_VOICE = 2,
	GROUP_DM = 3,
	GUILD_CATEGORY = 4,
	GUILD_ANNOUNCEMENT = 5,
	ANNOUNCEMENT_THREAD = 10,
	PUBLIC_THREAD = 11,
	PRIVATE_THREAD = 12,
	GUILD_STAGE_VOICE = 13,
	GUILD_DIRECTORY = 14,
	GUILD_FORUM = 15,
	GUILD_MEDIA = 16,
}

export const enum ApiVideoQualityModes {
	AUTO = 1,
	FULL = 2,
}

export const enum ApiChannelFlag {
	PINNED = 1 << 1,
	REQUIRE_TAG = 1 << 4,
	HIDE_MEDIA_DOWNLOAD_OPTIONS = 1 << 15,
}

export const enum ApiSortOrderTypes {
	LATEST_ACTIVITY = 0,
	CREATION_DATE = 1,
}

export const enum ApiForumLayoutType {
	NOT_SET = 0,
	LIST_VIEW = 1,
	GALLERY_VIEW = 2,
}

export interface IApiMessage {
	id: Snowflake;
	channel_id: Snowflake;
	author: IApiUser;
	content: string;
	timestamp: string;
	edited_timestamp: Optional<string>;
	tts: boolean;
	mention_everyone: boolean;
	mentions: IApiUser[];
	mention_roles: Snowflake[]; // TODO(wioenena) Check role or role ids
	mention_channels?: IApiChannelMention[];
	attachments: IApiAttachment[];
	embeds: IApiEmbed[];
	reactions?: IApiReaction[];
	nonce?: number | string;
	pinned: boolean;
	webhook_id?: Snowflake;
	type: ApiMessageType;
	activity?: IApiMessageActivity;
	application?: Partial<IApiApplication>;
	application_id?: Snowflake;
	message_reference?: IApiMessageReference;
	flags?: number;
	referenced_message?: Optional<IApiMessage>;
	interaction_metadata?: IApiMessageInteractionMetadata;
	interaction?: IApiMessageInteraction;
	thread?: IApiChannel;
	components?: IApiMessageComponents[];
	sticker_items?: IApiStickerItem[];
	stickers?: IApiSticker[];
	position?: number;
	role_subscription_data?: IApiRoleSubscriptionData;
	resolved?: IApiResolvedData;
	poll?: IApiPollCreateRequest;
}

export const enum ApiMessageType {
	DEFAULT = 0,
	RECIPIENT_ADD = 1,
	RECIPIENT_REMOVE = 2,
	CALL = 3,
	CHANNEL_NAME_CHANGE = 4,
	CHANNEL_ICON_CHANGE = 5,
	CHANNEL_PINNED_MESSAGE = 6,
	USER_JOIN = 7,
	GUILD_BOOST = 8,
	GUILD_BOOST_TIER_1 = 9,
	GUILD_BOOST_TIER_2 = 10,
	GUILD_BOOST_TIER_3 = 11,
	CHANNEL_FOLLOW_ADD = 12,
	GUILD_DISCOVERY_DISQUALIFIED = 14,
	GUILD_DISCOVERY_REQUALIFIED = 15,
	GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
	GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
	THREAD_CREATED = 18,
	REPLY = 19,
	CHAT_INPUT_COMMAND = 20,
	THREAD_STARTER_MESSAGE = 21,
	GUILD_INVITE_REMINDER = 22,
	CONTEXT_MENU_COMMAND = 23,
	AUTO_MODERATION_ACTION = 24,
	ROLE_SUBSCRIPTION_PURCHASE = 25,
	INTERACTION_PREMIUM_UPSELL = 26,
	STAGE_START = 27,
	STAGE_END = 28,
	STAGE_SPEAKER = 29,
	STAGE_TOPIC = 31,
	GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
}

export interface IApiMessageActivity {
	type: ApiMessageActivityType;
	party_id?: string;
}

export const enum ApiMessageActivityType {
	JOIN = 1,
	SPECTATE = 2,
	LISTEN = 3,
	JOIN_REQUEST = 5,
}

export const enum ApiMessageFlag {
	CROSSPOSTED = 1 << 0,
	IS_CROSSPOST = 1 << 1,
	SUPPRESS_EMBEDS = 1 << 2,
	SOURCE_MESSAGE_DELETED = 1 << 3,
	URGENT = 1 << 4,
	HAS_THREAD = 1 << 5,
	EPHEMERAL = 1 << 6,
	LOADING = 1 << 7,
	FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
	SUPPRESS_NOTIFICATIONS = 1 << 12,
	IS_VOICE_MESSAGE = 1 << 13,
}

export interface IApiMessageInteractionMetadata {
	id: Snowflake;
	type: ApiInteractionType;
	user_id: Snowflake;
	authorizing_integration_owners: unknown; // TODO(wioenena) Check type
	original_response_message_id?: Snowflake;
	interacted_message_id?: Snowflake;
	triggering_interaction_metadata?: IApiMessageInteractionMetadata;
}

export interface IApiMessageReference {
	message_id?: Snowflake;
	channel_id?: Snowflake;
	guild_id?: Snowflake;
	fail_if_not_exists?: boolean;
}

export interface IApiFollowedChannel {
	channel_id: Snowflake;
	webhook_id: Snowflake;
}

export interface IApiReaction {
	count: number;
	count_details: IApiReactionCountDetails;
	me: boolean;
	me_burst: boolean;
	emoji: Partial<IApiEmoji>;
	burst_colors: string[];
}

export interface IApiReactionCountDetails {
	burst: number;
	normal: number;
}

export interface IApiOverwrite {
	id: Snowflake;
	type: 0 | 1; // Either 0 (role) or 1 (member)
	allow: string;
	deny: string;
}

export interface IApiThreadMetadata {
	archived: boolean;
	auto_archive_duration: number;
	archive_timestamp: string;
	locked: boolean;
	invitable?: boolean;
	create_timestamp?: Optional<string>;
}

export interface IApiThreadMember {
	id?: Snowflake;
	user_id?: Snowflake;
	join_timestamp: string;
	flags: number;
	member?: IApiGuildMember;
}

export interface IApiDefaultReaction {
	emoji_id: Optional<Snowflake>;
	emoji_name: Optional<string>;
}

export interface IApiForumTag {
	id: Snowflake;
	name: string;
	moderated: boolean;
	emoji_id: Optional<Snowflake>;
	emoji_name: Optional<string>;
}

export interface IApiEmbed {
	title?: string;
	type?: ApiEmbedType; // (always "rich" for webhook embeds)
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: IApiEmbedFooter;
	image?: IApiEmbedImage;
	thumbnail?: IApiEmbedThumbnail;
	video?: IApiEmbedVideo;
	provider?: IApiEmbedProvider;
	author?: IApiEmbedAuthor;
	fields?: IApiEmbedField[];
}

export const enum ApiEmbedType {
	RICH = "rich",
	IMAGE = "image",
	VIDEO = "video",
	GIFV = "gifv",
	ARTICLE = "article",
	LINK = "link",
}

export interface IApiEmbedThumbnail {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface IApiEmbedVideo {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface IApiEmbedImage {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface IApiEmbedProvider {
	name?: string;
	url?: string;
}

export interface IApiEmbedAuthor {
	name: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface IApiEmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface IApiEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

/* Embed Limits */
/*
 * title	256 characters
 * description	4096 characters
 * fields	Up to 25 field objects
 * field.name	256 characters
 * field.value	1024 characters
 * footer.text	2048 characters
 * author.name	256 characters
 */

export interface IApiAttachment {
	id: Snowflake;
	filename: string;
	description?: string;
	content_type?: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: Optional<number>; // Height of file (if image)
	width?: Optional<number>; // Width of file (if image)
	ephemeral?: boolean;
	duration_secs?: number;
	waveform?: string;
	flags?: number;
}

export const enum ApiAttachmentFlag {
	IS_REMIX = 1 << 2,
}

export interface IApiChannelMention {
	id: Snowflake;
	guild_id: Snowflake;
	type: ApiChannelType;
	name: string;
}

export const enum ApiAllowedMentionType {
	RoleMentions = "roles",
	UserMentions = "users",
	EveryoneMentions = "everyone",
}

export interface IApiAllowedMentions {
	parse: ApiAllowedMentionType[];
	roles: Snowflake[];
	users: Snowflake[];
	replied_user: boolean;
}

export interface IApiRoleSubscriptionData {
	role_subscription_listing_id: Snowflake;
	tier_name: string;
	total_months_subscribed: number;
	is_renewal: boolean;
}
