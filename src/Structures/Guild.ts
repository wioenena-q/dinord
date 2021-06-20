import { Base } from "./Base.ts";
import type { GuildData } from "../Types/StructureTypes.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import { Util } from "../Utils/Util.ts";

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

    private roles!: unknown;

    private emojis!: unknown;

    private features!: unknown;

    private mfaLevel!: number;

    private applicationID?: Snowflake | null;

    private systemChannelID?: Snowflake | null;

    private systemChannelFlags!: number;

    private rulesChannelID?: Snowflake | null;

    private joinedAt!: Date;

    private large!: boolean;

    private memberCount!: number;

    private voiceStates!: unknown;

    private members!: unknown;

    private channels!: unknown;

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

    public constructor(client: Client, data: GuildData) {
        super(client);

        this.id = data.id;

        this.available = !data.unavailable;

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
        this.approximateMemberCount = "approximate_member_count" in data ? data.approximate_member_count! : null;
        this.approximatePresenceCount = "approximate_presence_count" in data ? data.approximate_presence_count! : null;
        this.nsfwLevel = "nsfw_level" in data ? data.nsfw_level! : null;
        console.log(this);
    }
}
