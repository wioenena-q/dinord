export type Snowflake = string;

export interface IReadyPayloadData {
  v: number;
  user_settings: Record<string, unknown>;
  user: IUser;
  guilds: { id: Snowflake; unavailable: boolean }[];
  session_id: string;
  shard?: [number, number];
  application: Partial<IApplication>;
}

export interface IGuildCreatePayloadData extends IGuild {
  joined_at: number;
  large: boolean;
  unavailable: boolean;
  member_count: number;
  voice_states: Partial<IVoiceState>[];
  members: IGuildMember[];
  channels: IChannel[];
  threads: IChannel[];
  presences: Partial<IPresenceUpdateObject>[];
  stage_instances: IStageInstance[];
  guild_scheduled_events: IGuildScheduledEvent[];
}

export type IUnavailableGuild = Partial<IGuild>;

export interface IApplication {
  id: Snowflake;
  name: string;
  icon?: string;
  description: string;
  rpc_origins: string[];
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_service_url: string;
  privacy_policy_url: string;
  owner?: Partial<IUser>;
  summary: string;
  verify_key: string;
  team?: ITeam;
  guild_id?: Snowflake;
  primary_sku_id?: Snowflake;
  slug?: string;
  cover_image?: string;
  flags?: number;
  tags?: string[];
  install_params?: IInstallParams[];
  custom_install_url?: string;
}
export interface ITeam {
  icon?: string;
  id: Snowflake;
  members: ITeamMember[];
  name: string;
  owner_user_id: Snowflake;
}

export interface ITeamMember {
  membership_state: number;
  permissions: string[];
  team_id: Snowflake;
  user: Partial<IUser>;
}

export interface IInstallParams {
  scopes: string[];
  permissions: string;
}

export interface IPermissionOverwrite {
  id: Snowflake;
  type: number;
  allow: string;
  deny: string;
}

export interface IUser {
  id: Snowflake;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export interface IGuild {
  id: Snowflake;
  name: string;
  icon?: string;
  icon_hash?: string;
  splash?: string;
  discovery_splash?: string;
  owner?: boolean;
  owner_id: Snowflake;
  permissions?: string;
  region?: string;
  afk_channel_id?: Snowflake;
  afk_timeout: number;
  widget_enabled?: boolean;
  widget_channel_id?: Snowflake;
  verification_level: number;
  default_message_notifications: number;
  explicit_content_filter: number;
  roles: IRole[];
  emojis: IEmoji[];
  features: GuildFeatures[];
  mfa_level: number;
  application_id?: Snowflake;
  system_channel_id?: Snowflake;
  system_channel_flags: number;
  rules_channel_id?: Snowflake;
  max_presences?: number;
  max_members?: number;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: number;
  premium_subscription_count?: number;
  preferred_locale: string;
  public_updates_channel_id?: Snowflake;
  max_video_channel_users?: number;
  approximate_member_count?: number;
  approximate_presence_count?: number;
  welcome_screen?: IWelcomeScreen;
  nsfw_level: number;
  stickers?: ISticker[];
  premium_progress_bar_enabled: boolean;
}

export interface IWelcomeScreen {
  description?: string;
  welcome_channels: IWelcomeScreenChannel[];
}
export interface IRole {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags: IRoleTags;
}
export interface IEmoji {
  id?: Snowflake;
  name?: string;
  roles?: Snowflake[];
  user?: IUser;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
export interface ISticker {
  id: Snowflake;
  pack_id?: Snowflake;
  name: string;
  description?: string;
  tags: string;
  asset?: string;
  type: number;
  format_type: number;
  available?: boolean;
  guild_id?: Snowflake;
  user?: IUser;
  sort_value?: number;
}
export interface IRoleTags {
  bot_id?: Snowflake;
  integration_id?: Snowflake;
  premium_subscriber?: null;
}

export interface IWelcomeScreenChannel {
  channel_id: Snowflake;
  description: string;
  emoji_id?: Snowflake;
  emoji_name?: string;
}

export type GuildFeatures =
  | 'ANIMATED_BANNER'
  | 'ANIMATED_ICON'
  | 'AUTO_MODERATION'
  | 'BANNER'
  | 'COMMERCE'
  | 'COMMUNITY'
  | 'DISCOVERABLE'
  | 'FEATURABLE'
  | 'INVITE_SPLASH'
  | 'MEMBER_VERIFICATION_GATE_ENABLED'
  | 'MONETIZATION_ENABLED'
  | 'MORE_STICKERS'
  | 'NEWS'
  | 'PARTNERED'
  | 'PREVIEW_ENABLED'
  | 'PRIVATE_THREADS'
  | 'ROLE_ICONS'
  | 'TICKETED_EVENTS_ENABLED'
  | 'VANITY_URL'
  | 'VERIFIED'
  | 'VIP_REGIONS'
  | 'WELCOME_SCREEN_ENABLED';

export interface IVoiceState {
  guild_id?: Snowflake;
  channel_id?: Snowflake;
  user_id: Snowflake;
  member?: IGuildMember;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: number;
}

export interface IGuildMember {
  user?: IUser;
  nick?: string;
  avatar?: string;
  roles: Snowflake[];
  joined_at: number;
  premium_since?: number;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until: number;
}

export interface IChannel {
  id: Snowflake;
  type: number;
  guild_id?: Snowflake;
  position?: number;
  permission_overwrites?: IOverwriteObject[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: Snowflake;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: IUser[];
  icon?: string;
  owner_id?: Snowflake;
  application_id?: Snowflake;
  parent_id?: Snowflake;
  last_pin_timestamp?: number;
  rtc_region?: string;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: IThreadMetadataObject;
  member?: IThreadMemberObject;
  default_auto_archive_duration?: number;
  permissions?: string;
  flags?: number;
  total_message_sent?: number;
}

export interface IPresenceUpdateObject {
  user: IUser;
  guild_id: Snowflake;
  status: string;
  activities: IActivity[];
  client_status: IClientStatus;
}

export interface IStageInstance {
  id: Snowflake;
  guild_id: Snowflake;
  channel_id: Snowflake;
  topic: string;
  privacy_level: number;
  discoverable_disabled: boolean;
  guild_scheduled_event_id?: Snowflake;
}

export interface IGuildScheduledEvent {
  id: Snowflake;
  guild_id: Snowflake;
  channel_id?: Snowflake;
  creator_id?: Snowflake;
  name: string;
  description?: string;
  scheduled_start_time: number;
  scheduled_end_time?: number;
  privacy_level: number;
  status: number;
  entity_type: number;
  entity_id?: Snowflake;
  entity_metadata?: IGuildScheduledEventEntityMetadata;
  creator?: IUser;
  user_count?: number;
  image?: string;
}

export interface IOverwriteObject {
  id: Snowflake;
  type: number;
  allow: string;
  deny: string;
}

export interface IThreadMetadataObject {
  archived: boolean;
  auto_archive_duration: number;
  archive_timestamp: number;
  locked: boolean;
  invitable?: boolean;
  create_timestamp?: number;
}

export interface IThreadMemberObject {
  id?: Snowflake;
  user_id?: Snowflake;
  join_timestamp: number;
  flags: number;
}

export interface IActivity {
  name: string;
  type: number;
  url?: string;
  created_at: number;
  timestamps?: IActivityTimestamps;
  application_id?: Snowflake;
  details?: string;
  state?: string;
  emoji?: IActivityEmoji;
  party?: IActivityParty;
  assets?: IActivityAssets;
  secrets?: IActivitySecrets;
  instance?: boolean;
  flags?: number;
  buttons?: IActivityButton[];
}

export interface IClientStatus {
  desktop?: string;
  mobile?: string;
  web?: string;
}

export interface IActivityTimestamps {
  start?: number;
  end?: number;
}

export interface IActivityEmoji {
  name: string;
  id?: Snowflake;
  animated?: boolean;
}

export interface IActivityParty {
  id?: Snowflake;
  size?: [number, number];
}

export interface IActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface IActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export interface IActivityButton {
  label: string;
  url: string;
}

export interface IGuildScheduledEventEntityMetadata {
  location?: string;
}
