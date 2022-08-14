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
import { defineReadonlyProperty, isBoolean, isString, toObject } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';

import type { Client } from '../../Client/Client.ts';
import type {
  APIGuild,
  APIUnavailableGuild,
  GatewayGuildCreateDispatchData,
  GuildDefaultMessageNotifications,
  GuildExplicitContentFilter,
  GuildFeature,
  GuildMFALevel,
  GuildNSFWLevel,
  GuildPremiumTier,
  GuildSystemChannelFlags,
  GuildVerificationLevel,
  Snowflake
} from '../../deps.ts';
import { URLManager } from '../../Managers/URLManager.ts';
import { DiscordSnowflake } from '../DiscordSnowflake.ts';

/**
 *
 * @class
 * @classdesc Guild structure
 */
export class Guild extends Base {
  /**
   * ID of the guild.
   */
  public declare readonly id: Snowflake;
  /**
   * Created timestamp of this guild.
   */
  public declare readonly createdTimestamp: number;
  protected declare _available: boolean;
  protected declare _name: string | null;
  protected declare _icon: string | null;
  protected declare _splash: string | null;
  protected declare _discoverySplash: string | null;
  protected declare _owner: boolean;
  protected declare _ownerId: Snowflake | null;
  protected declare _afkChannelId: Snowflake | null;
  protected declare _afkTimeout: number;
  protected declare _widgetEnabled: boolean;
  protected declare _widgetChannelId: Snowflake | null;
  protected declare _verificationLevel: GuildVerificationLevel | null;
  protected declare _defaultMessageNotifications: GuildDefaultMessageNotifications | null;
  protected declare _explicitContentFilter: GuildExplicitContentFilter | null;
  protected declare _features: GuildFeature[] | null;
  protected declare _mfaLevel: GuildMFALevel | null;
  protected declare _applicationId: Snowflake | null;
  protected declare _systemChannelId: Snowflake | null;
  protected declare _systemChannelFlags: GuildSystemChannelFlags | null;
  protected declare _rulesChannelId: Snowflake | null;
  protected declare _maxPresences: number | null;
  protected declare _maxMembers: number | null;
  protected declare _vanityURLCode: string | null;
  protected declare _description: string | null;
  protected declare _banner: string | null;
  protected declare _premiumTier: GuildPremiumTier | null;
  protected declare _premiumSubscriptionCount: number | null;
  protected declare _preferredLocale: string | null;
  protected declare _publicUpdatesChannelId: Snowflake | null;
  protected declare _maxVideoChannelUsers: number | null;
  protected declare _approximateMemberCount: number | null;
  protected declare _approximatePresenceCount: number | null;
  protected declare _welcomeScreen: unknown; // TODO: Implement
  protected declare _nsfwLevel: GuildNSFWLevel | null;
  protected declare _premiumProgressBarEnabled: boolean;
  protected declare _joinedAt: Date | null;
  protected declare _large: boolean;
  protected declare _memberCount: number | null;

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

    // Define readonly properties
    defineReadonlyProperty(this, 'id', data.id);
    defineReadonlyProperty(this, 'createdTimestamp', DiscordSnowflake.getTimestampFromId(this.id));

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
      for (const role of data.roles) this.roles.add(role);
    }

    if ('emojis' in data) {
      for (const emoji of data.emojis) this.emojis.add(emoji);
    }

    if ('stickers' in data) {
      for (const sticker of data.stickers) this.stickers.add(sticker);
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
   *
   * Set name of this guild.
   * @param name - The name of the guild.
   * @param [reason] - Reason for changing the guild name.
   */
  public setName(name: string, reason?: string) {
    if (!isString(name) || name === '') throw new TypeError('Name must be a non-empty string.');
    if (name.length < 2 || name.length > 100)
      throw new RangeError('Name must be between or equal 2 and 100 characters.');
    return this.edit({ name }, reason);
  }

  /**
   *
   * Set verification level of this guild.
   * @param level - The verification level of the guild.
   * @param [reason] - Reason for changing the verification level.
   */
  public setVerificationLevel(level: GuildVerificationLevel, reason?: string) {
    if (level < 0 || level > 4) throw new RangeError('Verification level must be between or equals 0 and 4.');
    return this.edit({ verificationLevel: level }, reason);
  }

  /**
   *
   * Set default message notifications of this guild.
   * @param notifications - The default message notifications of the guild.
   * @param [reason] - Reason for changing the default message notifications.
   */
  public setDefaultMessageNotifications(notifications: GuildDefaultMessageNotifications, reason?: string) {
    if (notifications < 0 || notifications > 1)
      throw new RangeError('Default message notifications must be equals 0 or 1.');
    return this.edit({ defaultMessageNotifications: notifications }, reason);
  }

  /**
   *
   * Set explicit content filter of this guild.
   * @param filter - The explicit content filter of the guild.
   * @param [reason] - Reason for changing the explicit content filter.
   */
  public setExplicitContentFilter(filter: GuildExplicitContentFilter, reason?: string) {
    if (filter < 0 || filter > 2)
      throw new RangeError('Explicit content filter must be between or equals 0 and 2.');
    return this.edit({ explicitContentFilter: filter }, reason);
  }

  /**
   *
   * Set afk channel of this guild.
   * @param channel - The channel to set as the afk channel. TODO: Accept channel id or channel object
   * @param [reason] - Reason for changing the afk channel.
   */
  public setAFKChannel(channel: Snowflake | null, reason?: string) {
    // TODO: Check channel is voice channel
    return this.edit({ afkChannelId: channel }, reason);
  }

  /**
   *
   * Set afk timeout of this guild.
   * @param timeout - The timeout in seconds to set as the afk timeout.
   * @param [reason] - Reason for changing the afk timeout.
   */
  public setAFKTimeout(timeout: number, reason?: string) {
    if (timeout < 60 || timeout > 3600) throw new RangeError('AFK timeout must be between or equal 60 and 3600.');
    return this.edit({ afkTimeout: timeout }, reason);
  }

  /**
   *
   * Set icon of this guild.
   * @param icon - The icon to set as the guild icon.
   * @param [reason] - Reason for changing the guild icon.
   */
  public setIcon(icon: unknown | null, reason?: string) {
    return this.edit({ icon }, reason);
  }

  /**
   *
   * Set owner of this guild, if the bot owns the server
   * @param owner - The owner of the guild. TODO: Accept user id, user object or member object
   * @param [reason] - Reason for changing the guild owner.
   */
  public setOwner(owner: Snowflake, reason?: string) {
    // TODO: Check if bot owns the server
    return this.edit({ ownerId: owner }, reason);
  }

  /**
   *
   * Set splash of this guild.
   * @param splash - The splash to set as the guild splash.
   * @param [reason] - Reason for changing the guild splash.
   */
  public setSplash(splash: unknown | null, reason?: string) {
    return this.edit({ splash }, reason);
  }

  /**
   *
   * Set discovery splash of this guild.
   * @param splash - The discovery splash to set as the guild splash.
   * @param [reason] - Reason for changing the discovery splash.
   */
  public setDiscoverSplash(splash: unknown | null, reason?: string) {
    return this.edit({ discoverySplash: splash }, reason);
  }

  /**
   *
   * Set banner of this guild.
   * @param banner - The banner to set as the guild banner.
   * @param [reason] - Reason for changing the banner.
   */
  public setBanner(banner: unknown | null, reason?: string) {
    return this.edit({ banner }, reason);
  }

  /**
   *
   * Set system channel of this guild.
   * @param channel - The channel to set as the system channel. TODO: Accept channel id or channel object
   * @param [reason] - Reason for changing the system channel.
   */
  public setSystemChannel(channel: Snowflake | null, reason?: string) {
    // TODO: Check channel is a text channel
    return this.edit({ systemChannelId: channel }, reason);
  }

  /**
   *
   * Set system channel flags of this guild.
   * @param flags - The flags to set as the sytem channel flags.
   * @param [reason] - Reason for changing the system channel flags.
   */
  public setSystemChannelFlags(flags: GuildSystemChannelFlags, reason?: string) {
    if (!(flags === 1 || flags === 2 || flags === 4 || flags === 8))
      throw new RangeError('System channel flags must be equal 1, 2, 4 or 8.');
    return this.edit({ systemChannelFlags: flags }, reason);
  }

  /**
   *
   * Set rules channel of this guild.
   * @param channel - The channel to set as the rules channel. TODO: Accept channel id or channel object
   * @param [reason] - Reason for changing the rules channel.
   */
  public setRulesChannel(channel: Snowflake, reason?: string) {
    // TODO: Check channel is a text channel
    return this.edit({ rulesChannelId: channel }, reason);
  }

  /**
   *
   * Set public updates channel of this guild.
   * @param channel - The channel to set as the public updates channel. TODO: Accept channel id or channel object
   * @param [reason] - Reason for changing the public updates channel.
   */
  public setPublicUpdatesChannel(channel: Snowflake, reason?: string) {
    // TODO: Check channel is a text channel
    return this.edit({ publicUpdatesChannelId: channel }, reason);
  }

  /**
   *
   * Set preferred locale of this guild.
   * @param locale - The locale to set as the guild locale.
   * @param [reason] - Reason for changing the preferred locale.
   */
  public setPreferredLocale(locale: string, reason?: string) {
    return this.edit({ preferredLocale: locale }, reason);
  }

  /**
   *
   * Set features of this guild.
   * @param features - The features to set as the guild features.
   * @param [reason] - Reason for changing the guild features.
   */
  public setFeatures(features: GuildFeature[], reason?: string) {
    return this.edit({ features }, reason);
  }

  /**
   *
   * Set description of this guild.
   * @param description - The description of the guild.
   * @param [reason] - Reason for changing the description.
   */
  public setDescription(description: string, reason?: string) {
    if (!isString(description) || description.length > 120)
      throw new TypeError('Description must be a string of less than 120 characters.');

    return this.edit({ description }, reason);
  }

  /**
   * Enable or disable the premium progress bar for this guild
   * @param enabled - Whether the guild's boost progress bar should be enabled
   * @param [reason] - Reason for changing setting the premium progress bar
   */
  public setPremiumProgressBarEnabled(enabled: boolean, reason?: string) {
    if (!isBoolean(enabled)) throw new TypeError('Enabled must be a boolean.');
    return this.edit({ premiumProgressBarEnabled: enabled }, reason);
  }

  /**
   *
   * Edit this guild.
   * @param data - The data to edit the guild with.
   * @param reason - The reason to edit the guild with.
   */
  public async edit(data: GuildEditData, reason?: string) {
    const _data: Record<PropertyKey, unknown> = {};

    if ('name' in data) _data.name = data.name;
    if ('verificationLevel' in data) _data.verification_level = data.verificationLevel;
    if ('defaultMessageNotifications' in data)
      _data.default_message_notifications = data.defaultMessageNotifications;
    if ('explicitContentFilter' in data) _data.explicit_content_filter = data.explicitContentFilter;
    if ('afkChannelId' in data) _data.afk_channel_id = data.afkChannelId;
    if ('afkTimeout' in data) _data.afk_timeout = data.afkTimeout;
    if ('icon' in data) _data.icon = data.icon;
    if ('ownerId' in data) _data.owner_id = data.ownerId;
    if ('splash' in data) _data.splash = data.splash;
    if ('discoverySplash' in data) _data.discovery_splash = data.discoverySplash;
    if ('banner' in data) _data.banner = data.banner;
    if ('systemChannelId' in data) _data.system_channel_id = data.systemChannelId;
    if ('systemChannelFlags' in data) _data.system_channel_flags = data.systemChannelFlags;
    if ('rulesChannelId' in data) _data.rules_channel_id = data.rulesChannelId;
    if ('publicUpdatesChannelId' in data) _data.public_updates_channel_id = data.publicUpdatesChannelId;
    if ('preferredLocale' in data) _data.preferred_locale = data.preferredLocale;
    if ('features' in data) _data.features = data.features;
    if ('description' in data) _data.description = data.description;
    if ('premiumProgressBarEnabled' in data) _data.premium_progress_bar_enabled = data.premiumProgressBarEnabled;

    await this.client.rest.patch(URLManager.guild(this.id), {
      body: JSON.stringify(_data),
      headers: reason
        ? {
            'X-Audit-Log-Reason': reason
          }
        : {}
    });

    return this;
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

  [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(
      toObject(this, [
        'client',
        'id',
        'createdTimestamp',
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
      ]),
      options
    );
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

/**
 * @typedef {Object} GuildEditData
 * @property {string?} [name] - Name of the guild.
 * @property {GuildVerificationLevel} [verificationLevel] - Verification level of the guild.
 * @property {GuildNotificationLevel} [defaultMessageNotifications] - Default message notifications level of the guild.
 * @property {GuildExplicitContentFilter} [explicitContentFilter] - Explicit content filter level of the guild.
 * @property {(Snowflake|null)?} [afkChannelId] - ID of the AFK channel. If null, the guild won't have an AFK channel.
 * @property {number?} [afkTimeout] - AFK timeout in seconds.
 * @property {(unknown|null)?} [icon] - Image data for the guild icon. If null, the guild won't have an icon.
 * @property {Snowflake?} [ownerId] - ID of the guild owner.
 * @property {(unknown|null)?} [splash] - Image data for the guild splash. If null, the guild won't have a splash.
 * @property {(unknown|null)?} [discoverySplash] - Image data for the guild discovery splash.
 * @property {(unknown|null)?} [banner] - Image data for the guild banner. If null, the guild won't have a banner.
 * @property {(Snowflake|null)?} [systemChannelId] - ID of the system channel. If null, the guild won't have a system channel.
 * @property {GuildSystemChannelFlags?} [systemChannelFlags] - System channel flags of the guild.
 * @property {Snowflake?} [rulesChannelId] - ID of the rules channel.
 * @property {string?} [preferredLocale] - Preferred locale of the guild.
 * @property {GuildFeature[]?} [features] - Enabled guild features.
 * @property {(string|null)?} [description] - Description of the guild. If null, the guild won't have a description.
 * @property {boolean?} [premiumProgressBarEnabled] - Enable or disable the premium progress bar for this guild.
 *
 */
export interface GuildEditData {
  name?: string;
  verificationLevel?: GuildVerificationLevel | null;
  defaultMessageNotifications?: GuildDefaultMessageNotifications | null;
  explicitContentFilter?: GuildExplicitContentFilter | null;
  afkChannelId?: Snowflake | null;
  afkTimeout?: number;
  icon?: unknown | null /* TODO: change type */;
  ownerId?: Snowflake;
  splash?: unknown | null /* TODO: change type */;
  discoverySplash?: unknown | null /* TODO: change type */;
  banner?: unknown | null /* TODO: change type */;
  systemChannelId?: Snowflake | null;
  systemChannelFlags?: GuildSystemChannelFlags;
  rulesChannelId?: Snowflake | null;
  publicUpdatesChannelId?: Snowflake | null;
  preferredLocale?: string | null;
  features?: GuildFeature[];
  description?: string | null;
  premiumProgressBarEnabled?: boolean;
}
