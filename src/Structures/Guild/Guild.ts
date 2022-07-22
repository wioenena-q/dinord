import type { Client } from '../../Client/Client.ts';
import { Collection } from '../../deps.ts';
import type {
  GuildFeatures,
  IGuild,
  IGuildCreatePayloadData,
  Snowflake
} from '../../Utils/ApiTypes.ts';
import { ChannelTypes } from '../../Utils/Constants.ts';
import { Debug, Todo } from '../../Utils/dev.ts';
import { Eq, INullable, isGuildHasExtraFields } from '../../Utils/Types.ts';
import { Utils } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';
import { BaseChannel } from '../Channel/BaseChannel.ts';
import { BaseGuildChannel } from './Channel/BaseGuildChannel.ts';
import { GuildCategoryChannel } from './Channel/GuildCategoryChannel.ts';
import { GuildTextChannel } from './Channel/GuildTextChannel.ts';
import { GuildThreadChannel } from './Channel/GuildThreadChannel.ts';
import { GuildVoiceChannel } from './Channel/GuildVoiceChannel.ts';
import { GuildEmoji } from './GuildEmoji.ts';
import { GuildMember } from './GuildMember.ts';
import { GuildRole } from './Role/GuildRole.ts';
import { VoiceState } from './VoiceState.ts';

@Debug
export class Guild extends Base implements Eq<Guild> {
  // #region Fields
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
  #roles = new Collection<Snowflake, GuildRole>();
  #emojis = new Collection<Snowflake, GuildEmoji>();
  #voiceStates = new Collection<Snowflake, VoiceState>();
  #members = new Collection<Snowflake, GuildMember>();
  #channels = new Collection<Snowflake, GuildChannels>();
  // #endregion

  // #region Constructor
  public constructor(client: Client, data: IGuildCreatePayloadData | IGuild) {
    super(client);
    this.#id = data.id;
    this.#name = data.name;
    this.#icon = data.icon ?? null;
    this.#splash = data.splash ?? null;
    this.#discoverySplash = data.discovery_splash ?? null;
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
    this.#premiumProgressBarEnabled = data.premium_progress_bar_enabled ?? false;

    for (const apiRoleData of data.roles) {
      this.#roles.set(apiRoleData.id, new GuildRole(this, apiRoleData));
    }

    for (const apiEmojiData of data.emojis) {
      this.#emojis.set(apiEmojiData.id!, new GuildEmoji(this, apiEmojiData));
    }

    if (isGuildHasExtraFields(data)) {
      for (const apiVoiceStateData of data.voice_states) {
        if (!this.#voiceStates.has(apiVoiceStateData.user_id!))
          this.#voiceStates.set(
            apiVoiceStateData.user_id!,
            new VoiceState(this, apiVoiceStateData)
          );
      }

      for (const apiGuildMemberData of data.members) {
        const member = new GuildMember(this, apiGuildMemberData);
        if (member.user) {
          if (!this.client.users.has(member.user.id)) {
            this.client.users.set(member.user.id, member.user);
          }

          this.#members.set(member.user.id, member);
        }
      }

      for (const channelData of data.channels) {
        let channel: GuildChannels | undefined;
        switch (channelData.type) {
          case ChannelTypes.GUILD_TEXT:
            channel = new GuildTextChannel(this, channelData);
            break;
          case ChannelTypes.GUILD_VOICE:
            channel = new GuildVoiceChannel(this, channelData);
            break;
          case ChannelTypes.GUILD_CATEGORY:
            channel = new GuildCategoryChannel(this, channelData);
            break;
          default:
            console.log('Unknown channel type: %d', channelData.type);
            break;
        }
        if (channel) this.#channels.set(channel.id, channel);
      }

      for (const threadData of data.threads) {
        this.#channels.set(threadData.id, new GuildThreadChannel(this, threadData));
      }

      console.log(this.#channels.size);
    }
  }
  // #endregion

  // #region Methods
  @Todo
  public override toJSON() {
    return {};
  }

  @Todo
  public override toString() {
    return '';
  }

  @Todo
  public eq(other: Guild) {
    return false;
  }
  // #endregion

  // #region Getter & Setter
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

  public get roles() {
    return this.#roles;
  }

  public get emojis() {
    return this.#emojis;
  }

  public get members() {
    return this.#members;
  }

  public get createdTimestamp() {
    return Utils.getTimestampFromId(this.#id);
  }

  public get createdAt() {
    return new Date(this.createdTimestamp);
  }
  // #endregion
}

export type GuildChannels =
  | (GuildCategoryChannel | GuildTextChannel | GuildVoiceChannel)
  | any;
