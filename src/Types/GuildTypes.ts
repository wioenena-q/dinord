import type { Snowflake } from "./Snowflake.ts";
import type { UserData } from "./UserTypes.ts";
import type { BaseChannelData } from "./ChannelTypes.ts";
import type { PresenceData } from "./PresenceTypes.ts";

export type GuildFeatures =
    "ANIMATED_ICON" |
    "BANNER" |
    "COMMERCE" |
    "COMMUNITY" |
    "DISCOVERABLE" |
    "FEATURABLE" |
    "INVITE_SPLASH" |
    "MEMBER_VERIFICATION_GATE_ENABLED" |
    "NEWS" |
    "PARTNERED" |
    "PREVIEW_ENABLED" |
    "VANITY_URL" |
    "VERIFIED" |
    "VIP_REGIONS" |
    "WELCOME_SCREEN_ENABLED" |
    "TICKETED_EVENTS_ENABLED" |
    "MONETIZATION_ENABLED" |
    "MORE_STICKERS"

export interface GuildData {
    id: Snowflake;
    name: string;
    icon?: string;
    icon_hash?: string;
    splash?: string;
    discovery_splash?: string;
    owner_id: Snowflake;
    region?: string;
    afk_channel_id?: Snowflake;
    afk_timeout: number;
    widget_enabled: boolean;
    widget_channel_id?: Snowflake;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: GuildRoleData[];
    emojis: GuildEmojiData[];
    features: GuildFeatures[];
    mfa_level: number;
    application_id?: Snowflake;
    system_channel_id?: Snowflake;
    system_channel_flags: number;
    rules_channel_id?: Snowflake;
    joined_at: number;
    large: boolean;
    unavailable: boolean;
    member_count: number;
    voice_states: GuildVoiceStateData[];
    members: GuildMemberData[];
    channels: GuildChannelData[];
    presences: PresenceData[]
    max_presences?: number;
    max_members: number;
    vanity_url_code?: string;
    description?: string;
    banner?: string;
    premium_tier: number;
    premium_subscription_count: number;
    preferred_locale: string;
    max_video_channel_users: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    nsfw_level?: number;
}

export interface GuildRoleData {
    id: Snowflake;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
}

export interface BaseEmoji {
    name?: string;
}

export interface GuildEmojiData extends BaseEmoji {
    id: Snowflake;
    roles: Snowflake[];
    user: UserData;
    managed: boolean;
    animated: boolean;
    available: boolean;
}

export interface GuildVoiceStateData {
    guild_id: Snowflake;
    channel_id?: Snowflake;
    user_id: Snowflake;
    member: GuildMemberData;
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_video: boolean;
    self_stream?: boolean;
}
export interface GuildMemberData {
    id: Snowflake;
    user: UserData;
    nick?: string;
    roles: Snowflake[];
    joined_at: number;
    premium_since?: number;
    deaf: boolean;
    mute: boolean;
    permissions: string;
}

export interface BaseGuildChannelData extends BaseChannelData {
    name: string;
    guild_id: Snowflake;
    parent_id?: Snowflake;
    position: number;
    permission_overwrites: unknown[];
    nsfw: boolean;
}

export interface GuildTextChannelData extends BaseGuildChannelData {
    rate_limit_per_user: number;
    topic?: string;
    last_message_id?: Snowflake;
}
export interface GuildVoiceChannelData extends BaseGuildChannelData {
    bitrate: number;
    user_limit: number;
    rtc_region?: string;
}

// Some interfaces were created for logical types, I know that they are empty.
export interface GuildCategoryChannelData extends BaseGuildChannelData { }

export interface GuildStoreChannelData extends BaseGuildChannelData { }

export interface GuildNewsChannelData extends Omit<GuildTextChannelData, "rate_limit_per_user"> { }

export interface GuildPresenceData { }

export type GuildChannelData = BaseGuildChannelData | GuildTextChannelData | GuildVoiceChannelData | GuildCategoryChannelData | GuildNewsChannelData | GuildStoreChannelData;
