import {
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildFeature,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
  type APIGuild,
  type APIUnavailableGuild,
  type GatewayGuildCreateDispatchData,
  type Snowflake
} from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import {
  GuildChannelManager,
  GuildEmojiManager,
  GuildMemberManager,
  GuildPresenceManager,
  GuildRoleManager,
  GuildStageInstanceManager,
  GuildStickerManager,
  GuildVoiceStateManager
} from '../../Managers/Guild/mod.ts';
import { toObject } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';

import type { Client } from '../../Client/Client.ts';

/**
 *
 * @class
 * @classdesc Guild structure
 */
export class Guild extends Base {
  /**
   * ID of the guild.
   */
  public readonly id!: Snowflake;
  private declare _available: boolean;
  private declare _name: string | null;
  private declare _icon: string | null;
  private declare _splash: string | null;
  private declare _discoverySplash: string | null;
  private declare _owner: boolean;
  private declare _ownerId: Snowflake | null;
  private declare _afkChannelId: Snowflake | null;
  private declare _afkTimeout: number;
  private declare _widgetEnabled: boolean;
  private declare _widgetChannelId: Snowflake | null;
  private declare _verificationLevel: GuildVerificationLevel | null;
  private declare _defaultMessageNotifications: GuildDefaultMessageNotifications | null;
  private declare _explicitContentFilter: GuildExplicitContentFilter | null;
  private declare _features: GuildFeature[] | null;
  private declare _mfaLevel: GuildMFALevel | null;
  private declare _applicationId: Snowflake | null;
  private declare _systemChannelId: Snowflake | null;
  private declare _systemChannelFlags: GuildSystemChannelFlags | null;
  private declare _rulesChannelId: Snowflake | null;
  private declare _maxPresences: number | null;
  private declare _maxMembers: number | null;
  private declare _vanityURLCode: string | null;
  private declare _description: string | null;
  private declare _banner: string | null;
  private declare _premiumTier: GuildPremiumTier | null;
  private declare _premiumSubscriptionCount: number | null;
  private declare _preferredLocale: string | null;
  private declare _publicUpdatesChannelId: Snowflake | null;
  private declare _maxVideoChannelUsers: number | null;
  private declare _approximateMemberCount: number | null;
  private declare _approximatePresenceCount: number | null;
  private declare _welcomeScreen: unknown; // TODO: Implement
  private declare _nsfwLevel: GuildNSFWLevel | null;
  private declare _premiumProgressBarEnabled: boolean;
  private declare _joinedAt: Date | null;
  private declare _large: boolean;
  private declare _memberCount: number | null;

  /**
   * A manager of the roles of this guild.
   */
  public readonly roles = new GuildRoleManager(this);
  /**
   * A manager of the emojis of this guild.
   */
  public readonly emojis = new GuildEmojiManager(this);
  /**
   * A manager of the stickers of this guild.
   */
  public readonly stickers = new GuildStickerManager(this);
  /**
   * A manager of the voice states of this guild.
   */
  public readonly voiceStates = new GuildVoiceStateManager(this);
  /**
   * A manager of the members of this guild.
   */
  public readonly members = new GuildMemberManager(this);
  /**
   * A manager of the channels of this guild.
   */
  public readonly channels = new GuildChannelManager(this);
  /**
   * A manager of the presences of this guild.
   */
  public readonly presences = new GuildPresenceManager(this);
  /**
   * A manager of the stage instances of this guild.
   */
  public readonly stageInstances = new GuildStageInstanceManager(this);
  /**
   * A manager of the scheduled events of this guild.
   */
  public readonly scheduledEvents = new GuildStageInstanceManager(this);

  public constructor(client: Client, data: APIGuild | APIUnavailableGuild) {
    super(client);

    // Constant property
    this.id = data.id;

    this.patch(data);
  }

  public patch(data: APIGuild | APIUnavailableGuild | GatewayGuildCreateDispatchData) {
    this._available = 'unavailable' in data ? !data.unavailable : true;
    this._name = 'name' in data ? data.name : null;
    this._icon = 'icon' in data ? data.icon : null;
    this._splash = 'splash' in data ? data.splash : null;
    this._discoverySplash = 'discovery_splash' in data ? data.discovery_splash : null;
    this._owner = 'owner' in data ? data.owner! : false;
    this._ownerId = 'owner_id' in data ? data.owner_id : null;
    this._afkChannelId = 'afk_channel_id' in data ? data.afk_channel_id : null;
    this._afkTimeout = 'afk_timeout' in data ? data.afk_timeout : 0;
    this._widgetEnabled = 'widget_enabled' in data ? data.widget_enabled! : false;
    this._widgetChannelId = 'widget_channel_id' in data ? data.widget_channel_id! : null;
    this._verificationLevel = 'verification_level' in data ? data.verification_level : null;
    this._defaultMessageNotifications =
      'default_message_notifications' in data ? data.default_message_notifications : null;
    this._explicitContentFilter = 'explicit_content_filter' in data ? data.explicit_content_filter : null;
    this._features = 'features' in data ? data.features : null;
    this._mfaLevel = 'mfa_level' in data ? data.mfa_level : null;
    this._applicationId = 'application_id' in data ? data.application_id : null;
    this._systemChannelId = 'system_channel_id' in data ? data.system_channel_id : null;
    this._systemChannelFlags = 'system_channel_flags' in data ? data.system_channel_flags : null;
    this._rulesChannelId = 'rules_channel_id' in data ? data.rules_channel_id : null;
    this._maxPresences = 'max_presences' in data ? data.max_presences! : null;
    this._maxMembers = 'max_members' in data ? data.max_members! : null;
    this._vanityURLCode = 'vanity_url_code' in data ? data.vanity_url_code : null;
    this._description = 'description' in data ? data.description : null;
    this._banner = 'banner' in data ? data.banner : null;
    this._premiumTier = 'premium_tier' in data ? data.premium_tier : null;
    this._premiumSubscriptionCount =
      'premium_subscription_count' in data ? data.premium_subscription_count! : null;
    this._preferredLocale = 'preferred_locale' in data ? data.preferred_locale : null;
    this._publicUpdatesChannelId = 'public_updates_channel_id' in data ? data.public_updates_channel_id : null;
    this._maxVideoChannelUsers = 'max_video_channel_users' in data ? data.max_video_channel_users! : null;
    this._approximateMemberCount = 'approximate_member_count' in data ? data.approximate_member_count! : null;
    this._approximatePresenceCount =
      'approximate_presence_count' in data ? data.approximate_presence_count! : null;
    this._welcomeScreen = 'welcome_screen' in data ? data.welcome_screen : null;
    this._nsfwLevel = 'nsfw_level' in data ? data.nsfw_level : null;
    this._premiumProgressBarEnabled =
      'premium_progress_bar_enabled' in data ? data.premium_progress_bar_enabled : false;
    this._joinedAt = 'joined_at' in data ? new Date(data.joined_at) : null;
    this._large = 'large' in data ? data.large! : false;
    this._memberCount = 'member_count' in data ? data.member_count : null;

    if ('roles' in data) {
      // TODO: Implement roles
    }

    if ('emojis' in data) {
      // TODO: Implement emojis
    }

    if ('stickers' in data) {
      // TODO: Implement stickers
    }

    if ('channels' in data) {
      // TODO: Implement channels
    }

    if ('voice_states' in data) {
      // TODO: Implement voice states
    }

    if ('members' in data) {
      // TODO: Implement members
    }

    if ('presences' in data) {
      // TODO: Implement presences
    }

    if ('stage_instances' in data) {
      // TODO: Implement stage instances
    }

    if ('scheduled_events' in data) {
      // TODO: Implement scheduled events
    }
  }

  /**
   * TODO: Implement
   */
  public toJSON(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }

  public toString() {
    return `Guild (id: ${this.id})`;
  }

  public toObject() {
    return toObject(this, [
      'id',
      'available',
      'name',
      'icon',
      'splash',
      'discoverySplash',
      'owner',
      'ownerId',
      'afkChannelId',
      'afkTimeout',
      'widgetEnabled',
      'widgetChannelId',
      'verificationLevel',
      'defaultMessageNotifications',
      'explicitContentFilter',
      'features',
      'mfaLevel',
      'applicationId',
      'systemChannelId',
      'systemChannelFlags',
      'rulesChannelId',
      'maxPresences',
      'maxMembers',
      'vanityURLCode',
      'description',
      'banner',
      'premiumTier',
      'premiumSubscriptionCount',
      'preferredLocale',
      'publicUpdatesChannelId',
      'publicUpdatesChannelId',
      'maxVideoChannelUsers',
      'approximateMemberCount',
      'approximatePresenceCount',
      'welcomeScreen',
      'nsfwLevel',
      'premiumProgressBarEnabled',
      'joinedAt',
      'large',
      'memberCount',
      'roles',
      'emojis',
      'stickers',
      'voiceStates',
      'members',
      'channels',
      'presences',
      'stageInstances',
      'scheduledEvents'
    ]);
  }

  /**
   * Whether the guild is accessible.
   */
  public get available() {
    return this._available;
  }

  /**
   * Name of the guild or null.
   */
  public get name() {
    return this._name;
  }

  /**
   * Icon hash of the guild or null.
   */
  public get icon() {
    return this._icon;
  }

  /**
   * The hash of this guild's invitation splash image
   */
  public get splash() {
    return this._splash;
  }

  /**
   * The hash of this guild's discovery opening image
   */
  public get discoverySplash() {
    return this._discoverySplash;
  }

  /**
   * Whether the bot owns the server
   */
  public get owner() {
    return this._owner;
  }

  /**
   * ID of owner
   */
  public get ownerId() {
    return this._ownerId;
  }

  /**
   * ID of afk channel
   */
  public get afkChannelId() {
    return this._afkChannelId;
  }

  /**
   * AFK timeout in seconds
   */
  public get afkTimeout() {
    return this._afkTimeout;
  }

  /**
   * True if the server widget is enabled
   */
  public get widgetEnabled() {
    return this._widgetEnabled;
  }

  /**
   * The channel id that the widget will generate an invite to, or null if set to no invite
   */
  public get widgetChannelId() {
    return this._widgetChannelId;
  }

  /**
   * Verification level required for the guild
   */
  public get verificationLevel() {
    return this._verificationLevel;
  }

  /**
   * Default guild message notifications level
   */
  public get defaultMessageNotifications() {
    return this._defaultMessageNotifications;
  }

  /**
   * Guild explicit content filter level
   */
  public get explicitContentFilter() {
    return this._explicitContentFilter;
  }

  /**
   * Enabled guild features
   */
  public get features() {
    return this._features;
  }

  /**
   * Required MFA level for the guild
   */
  public get mfaLevel() {
    return this._mfaLevel;
  }

  /**
   * Application id of the guild creator if it is bot-created
   */
  public get applicationId() {
    return this._applicationId;
  }

  /**
   * The id of the channel where guild notices such as welcome messages and boost events are posted
   */
  public get systemChannelId() {
    return this._systemChannelId;
  }

  /**
   * System channel flags for the guild
   */
  public get systemChannelFlags() {
    return this._systemChannelFlags;
  }

  /**
   * The id of the channel where Community guilds can display rules and/or guidelines
   */
  public get rulesChannelId() {
    return this._rulesChannelId;
  }

  /**
   * The maximum number of presences for the guild (null is always, apart from the largest of guilds)
   */
  public get maxPresences() {
    return this._maxPresences;
  }

  /**
   * The maximum number of members for the guild
   */
  public get maxMembers() {
    return this._maxMembers;
  }

  /**
   * The vanity url code for the guild
   */
  public get vanityURLCode() {
    return this._vanityURLCode;
  }

  /**
   * The description of a guild
   */
  public get description() {
    return this._description;
  }

  /**
   * Guild banner hash
   */
  public get banner() {
    return this._banner;
  }

  /**
   * Premium tier (Server Boost level)
   */
  public get premiumTier() {
    return this._premiumTier;
  }

  /**
   * The number of boosts this guild currently has
   */
  public get premiumSubscriptionCount() {
    return this._premiumSubscriptionCount;
  }

  /**
   * The preferred locale of a Community guild; used in server discovery and notices from Discord, and sent in interactions
   */
  public get preferredLocale() {
    return this._preferredLocale;
  }

  /**
   * The id of the channel where admins and moderators of Community guilds receive notices from Discord
   */
  public get publicUpdatesChannelId() {
    return this._publicUpdatesChannelId;
  }

  /**
   * The maximum amount of users in a video channel
   */
  public get maxVideoChannelUsers() {
    return this._maxVideoChannelUsers;
  }

  /**
   * Approximate number of members in this guild.
   */
  public get approximateMemberCount() {
    return this._approximateMemberCount;
  }

  /**
   * Approximate number of non-offline members in this guild.
   */
  public get approximatePresenceCount() {
    return this._approximatePresenceCount;
  }

  /**
   * The welcome screen of a Community guild.
   */
  public get welcomeScreen() {
    return this._welcomeScreen;
  }

  /**
   * Guild NSFW level
   */
  public get nsfwLevel() {
    return this._nsfwLevel;
  }

  /**
   * Whether the guild has the boost progress bar enabled
   */
  public get premiumProgressBarEnabled() {
    return this._premiumProgressBarEnabled;
  }

  /**
   * When the client joins this guild
   */
  public get joinedAt() {
    return this._joinedAt;
  }

  /**
   * True if this is considered a large guild
   */
  public get large() {
    return this._large;
  }

  /**
   * Total number of members in this guild
   */
  public get memberCount() {
    return this._memberCount;
  }
}
