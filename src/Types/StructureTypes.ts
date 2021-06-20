import type { Snowflake } from "./Snowflake.ts";

export interface UserData {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string | null;
    bot: boolean;
    system: boolean;
    mfa_enabled: boolean;
    verified: boolean;
    flags: number;
    premium_type: number;
}

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
    features: string[];
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
    approximate_member_count: number;
    approximate_presence_count: number;
    nsfw_level: number;
}

export interface GuildRoleData { }

export interface GuildEmojiData { }

export interface GuildVoiceStateData { }
export interface GuildMemberData { }
export interface GuildChannelData { }
export interface GuildPresenceData { }
