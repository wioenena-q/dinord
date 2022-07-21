import type { Client } from '../../Client/Client.ts';
import { Collection } from '../../deps.ts';
import type {
  GuildFeatures,
  IGuildCreatePayloadData,
  Snowflake
} from '../../Utils/ApiTypes.ts';
import { Debug } from '../../Utils/dev.ts';
import type { INullable } from '../../Utils/Types.ts';
import { Utils } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';
import { Role } from './Role/Role.ts';

@Debug
export class Guild extends Base {
  // #region Props and type definitions
  #id: Snowflake;
  #name: string;
  #icon?: INullable<string>;
  #splash?: INullable<string>;
  #discoverySplash?: INullable<string>;
  #ownerId: Snowflake;
  #afkChannelId?: INullable<Snowflake>;
  #afkTimeout: number;
  #widgetEnabled: boolean;
  #widgetChannelId?: INullable<Snowflake>;
  #verificationLevel: number;
  #defaultMessageNotifications: number;
  #explicitContentFilter: number;
  #roles = new Collection<Snowflake, Role>();
  #emojis: unknown[] = [];
  #features: GuildFeatures[] = [];
  #mfaLevel: number;
  #applicationId?: INullable<Snowflake>;
  #systemChannelId?: INullable<Snowflake>;
  #systemChannelFlags: number;
  #rulesChannelId?: INullable<Snowflake>;
  #maxPresences?: INullable<number>;
  #maxMembers?: INullable<number>;
  #vanityUrlCode?: INullable<string>;
  #description?: INullable<string>;
  #banner?: INullable<string>;
  #premiumTier: number;
  #premiumSubscriptionCount?: INullable<number>;
  #preferredLocale: string;
  #publicUpdatesChannelId?: INullable<Snowflake>;
  #maxVideoChannelUsers?: INullable<number>;
  #approximateMemberCount?: INullable<number>;
  #approximatePresenceCount?: INullable<number>;
  #welcomeScreen?: INullable<unknown>;
  #nsfwLevel: number;
  #stickers: INullable<unknown[]>;
  #premiumProgressBarEnabled: boolean;
  // #endregion

  public constructor(client: Client, data: IGuildCreatePayloadData) {
    super(client);
    // #region Handle props
    this.#id = data.id;
    this.#name = data.name;
    this.#icon = data.icon ?? null;
    this.#splash = data.splash ?? null;
    this.#ownerId = data.owner_id;
    this.#afkChannelId = data.afk_channel_id ?? null;
    this.#afkTimeout = data.afk_timeout;
    this.#widgetEnabled = data.widget_enabled ?? false;
    this.#widgetChannelId = data.widget_channel_id ?? null;
    this.#verificationLevel = data.verification_level;
    this.#defaultMessageNotifications = data.default_message_notifications;
    this.#explicitContentFilter = data.explicit_content_filter;
    this.#mfaLevel = data.mfa_level;
    this.#applicationId = data.application_id ?? null;
    this.#systemChannelId = data.system_channel_id ?? null;
    this.#systemChannelFlags = data.system_channel_flags;
    this.#rulesChannelId = data.rules_channel_id ?? null;
    this.#maxPresences = data.max_presences ?? null;
    this.#maxMembers = data.max_members;
    this.#vanityUrlCode = data.vanity_url_code ?? null;
    this.#description = data.description ?? null;
    this.#banner = data.banner ?? null;
    this.#premiumTier = data.premium_tier;
    this.#premiumSubscriptionCount = data.premium_subscription_count ?? null;
    this.#preferredLocale = data.preferred_locale;
    this.#publicUpdatesChannelId = data.public_updates_channel_id ?? null;
    this.#maxVideoChannelUsers = data.max_video_channel_users ?? null;
    this.#approximateMemberCount = data.approximate_member_count ?? null;
    this.#approximatePresenceCount = data.approximate_presence_count ?? null;
    this.#welcomeScreen = data.welcome_screen ?? null;
    this.#nsfwLevel = data.nsfw_level;
    this.#stickers = data.stickers ?? null;
    this.#premiumProgressBarEnabled =
      data.premium_progress_bar_enabled ?? false;
    // #endregion

    // #region Handle roles
    for (const apiRoleData of data.roles) {
      this.#roles.set(apiRoleData.id, new Role(this, apiRoleData));
    }
    // #endregion
  }

  // #region Getters
  public get id() {
    return this.#id;
  }

  public get name() {
    return this.#name;
  }

  public get icon() {
    return this.#icon;
  }

  public get splash() {
    return this.#splash;
  }

  public get discoverySplash() {
    return this.#discoverySplash;
  }

  public get ownerId() {
    return this.#ownerId;
  }

  public get afkChannelId() {
    return this.#afkChannelId;
  }

  public get afkTimeout() {
    return this.#afkTimeout;
  }

  public get widgetEnabled() {
    return this.#widgetEnabled;
  }

  public get widgetChannelId() {
    return this.#widgetChannelId;
  }

  public get verificationLevel() {
    return this.#verificationLevel;
  }

  public get defaultMessageNotifications() {
    return this.#defaultMessageNotifications;
  }

  public get explicitContentFilter() {
    return this.#explicitContentFilter;
  }

  public get roles() {
    return this.#roles;
  }

  public get emojis() {
    return this.#emojis;
  }

  public get features() {
    return this.#features;
  }

  public get mfaLevel() {
    return this.#mfaLevel;
  }

  public get applicationId() {
    return this.#applicationId;
  }

  public get systemChannelId() {
    return this.#systemChannelId;
  }

  public get systemChannelFlags() {
    return this.#systemChannelFlags;
  }

  public get rulesChannelId() {
    return this.#rulesChannelId;
  }

  public get maxPresences() {
    return this.#maxPresences;
  }

  public get maxMembers() {
    return this.#maxMembers;
  }

  public get vanityUrlCode() {
    return this.#vanityUrlCode;
  }

  public get description() {
    return this.#description;
  }

  public get banner() {
    return this.#banner;
  }

  public get premiumTier() {
    return this.#premiumTier;
  }

  public get premiumSubscriptionCount() {
    return this.#premiumSubscriptionCount;
  }

  public get preferredLocale() {
    return this.#preferredLocale;
  }

  public get publicUpdatesChannelId() {
    return this.#publicUpdatesChannelId;
  }

  public get maxVideoChannelUsers() {
    return this.#maxVideoChannelUsers;
  }

  public get approximateMemberCount() {
    return this.#approximateMemberCount;
  }

  public get approximatePresenceCount() {
    return this.#approximatePresenceCount;
  }

  public get welcomeScreen() {
    return this.#welcomeScreen;
  }

  public get nsfwLevel() {
    return this.#nsfwLevel;
  }

  public get stickers() {
    return this.#stickers;
  }

  public get premiumProgressBarEnabled() {
    return this.#premiumProgressBarEnabled;
  }

  public get createdTimestamp() {
    return Utils.getTimestampFromId(this.#id);
  }

  public get createdAt() {
    return new Date(this.createdTimestamp);
  }
  // #endregion
}
