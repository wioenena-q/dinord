import type { Snowflake } from "./Snowflake.ts";
import type { UserData } from "./UserTypes.ts";

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

export interface GuildVoiceStateData { }
export interface GuildMemberData { }
export interface GuildChannelData { }
export interface GuildPresenceData { }
