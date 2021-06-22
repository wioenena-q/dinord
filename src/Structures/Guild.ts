import { Base } from "./Base.ts";
import type {
    GuildData,
    GuildFeatures,
    GuildTextChannelData,
    GuildVoiceChannelData,
    GuildCategoryChannelData,
    GuildNewsChannelData,
    GuildStoreChannelData
} from "../Types/GuildTypes.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import { Util } from "../Utils/Util.ts";
import { Collection } from "../../deps.ts";
import { Role } from "./Role.ts";
import { GuildEmoji } from "./GuildEmoji.ts";
import { VoiceState } from "./VoiceState.ts";
import { GuildMember } from "./GuildMember.ts";
import type { GuildChannel } from "./GuildChannel.ts";
import { GuildTextChannel } from "./GuildTextChannel.ts";
import { GuildVoiceChannel } from "./GuildVoiceChannel.ts";
import { GuildCategoryChannel } from "./GuildCategoryChannel.ts";
import { GuildNewsChannel } from "./GuildNewsChannel.ts";
import { GuildStoreChannel } from "./GuildStoreChannel.ts";

/**
 *
 * The Guild structure for discord servers.
 * @export
 * @class Guild
 * @extends {Base<GuildData>}
 */
export class Guild extends Base<GuildData> {
    private id!: Snowflake;

    private name!: string;

    private available: boolean;

    private icon?: string | null;

    private iconHash?: string | null;

    private splash?: string | null;

    private discoverySplash?: string | null;

    private ownerID!: Snowflake;

    private region?: string | null;

    private afkChannelID?: Snowflake | null;

    private afkTimeout!: number

    private widgetEnabled!: boolean;

    private widgetChannelID?: Snowflake | null;

    private verificationLevel!: number;

    private defaultMessageNotifications!: number;

    private explicitContentFilter!: number;

    private roles = new Collection<Snowflake, Role>();

    private emojis = new Collection<Snowflake, GuildEmoji>();

    private features!: GuildFeatures[];

    private mfaLevel!: number;

    private applicationID?: Snowflake | null;

    private systemChannelID?: Snowflake | null;

    private systemChannelFlags!: number;

    private rulesChannelID?: Snowflake | null;

    private joinedAt!: Date;

    private large!: boolean;

    private memberCount!: number;

    private voiceStates = new Collection<Snowflake, VoiceState>();

    private members = new Collection<Snowflake, GuildMember>();

    private channels = new Collection<Snowflake, GuildChannel>();

    private presences!: unknown;

    private maxPresences?: number | null;

    private maxMembers!: number;

    private vanityURLCode?: string | null;

    private description?: string | null;

    private banner?: string | null;

    private premiumTier!: number;

    private premiumSubscriptionCount!: number;

    private preferredLocale!: string;

    private maxVideoChannelUsers!: number;

    private approximateMemberCount?: number | null;

    private approximatePresenceCount?: number | null;

    private nsfwLevel?: number | null;

    private createdAt!: Date;

    public constructor(client: Client, data: GuildData) {
        super(client);

        this.id = data.id;

        this.available = !data.unavailable;

        if (!("channels" in data)) {
            this.available = false;
        }

        if (this.available) {
            this.patch(data);
        }
    }

    protected patch(data: GuildData): void {
        this.name = data.name;
        this.icon = data.icon || null;
        this.iconHash = data.icon_hash || null;
        this.splash = data.splash || null;
        this.discoverySplash = data.discovery_splash || null;
        this.ownerID = data.owner_id;
        this.region = data.region || null;
        this.afkChannelID = data.afk_channel_id || null;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled || false;
        this.widgetChannelID = data.widget_channel_id || null;
        this.verificationLevel = data.verification_level;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.explicitContentFilter = data.explicit_content_filter;
        this.mfaLevel = data.mfa_level;
        this.applicationID = data.application_id || null;
        this.systemChannelID = data.system_channel_id || null;
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelID = data.rules_channel_id || null;
        this.joinedAt = new Date(data.joined_at);
        this.large = data.large;
        this.memberCount = data.member_count;
        this.maxPresences = data.max_presences || null;
        this.maxMembers = data.max_members;
        this.vanityURLCode = data.vanity_url_code || null;
        this.description = data.description || null;
        this.banner = data.banner || null;
        this.premiumTier = data.premium_tier;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.preferredLocale = data.preferred_locale;
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.approximateMemberCount = "approximate_member_count" in data ? data.approximate_member_count : null;
        this.approximatePresenceCount = "approximate_presence_count" in data ? data.approximate_presence_count : null;
        this.nsfwLevel = "nsfw_level" in data ? data.nsfw_level : null;
        this.createdAt = new Date(Util.idToTimestamp(this.id));
        this.features = data.features;

        if ("roles" in data) {
            // Delete this guild's 'roles' cache.
            this.roles.clear();

            for (const roleData of data.roles) {
                const role = new Role(this.client, roleData);
                this.roles.set(role.getID, role);
            }
        }

        if ("emojis" in data) {
            // Delete this guild's 'emojis' cache.
            this.emojis.clear();

            for (const emojiData of data.emojis) {
                const emoji = new GuildEmoji(this.client, this, emojiData);
                this.emojis.set(emoji.getID, emoji);
            }
        }

        if ("voice_states" in data) {
            // Delete this guild's 'voiceStates' cache.
            this.voiceStates.clear();

            for (const voiceStateData of data.voice_states) {
                const voiceState = new VoiceState(this.client, voiceStateData);
                this.voiceStates.set(voiceState.getUserID, voiceState);
            }
        }

        if ("members" in data) {
            // Delete this guild's 'members' cache.
            this.members.clear();

            for (const memberData of data.members) {
                const member = new GuildMember(this.client, this, memberData);
                this.members.set(member.getID, member);
            }
        }

        if ("channels" in data) {
            // Delete this guild's 'channels' cache.
            this.channels.clear();

            for (const channelData of data.channels) {
                let channel: GuildChannel | undefined;

                // eslint-disable-next-line default-case
                switch (channelData.type) {
                    case 0:
                        channel = new GuildTextChannel(this.client, this, channelData as GuildTextChannelData);
                        break;
                    case 2:
                        channel = new GuildVoiceChannel(this.client, this, channelData as GuildVoiceChannelData);
                        break;
                    case 4:
                        channel = new GuildCategoryChannel(this.client, this, channelData as GuildCategoryChannelData);
                        break;
                    case 5:
                        channel = new GuildNewsChannel(this.client, this, channelData as GuildNewsChannelData);
                        break;
                    case 6:
                        channel = new GuildStoreChannel(this.client, this, channelData as GuildStoreChannelData);
                        break;
                }
                if (typeof channel !== "undefined")
                    this.channels.set(channel.getID, channel!);
            }
        }
    }

    public get getRoles() { return this.roles; }

    public get getChannels() { return this.channels; }
}
