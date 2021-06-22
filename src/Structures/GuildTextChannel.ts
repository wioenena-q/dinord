import { GuildChannel } from "./GuildChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { GuildTextChannelData } from "../Types/GuildTypes.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Guild } from "./Guild.ts";

export class GuildTextChannel extends GuildChannel {
    private topic?: string | null;

    protected rateLimitPerUser!: number;

    private lastMessageID?: Snowflake | null;

    public constructor(client: Client, guild: Guild, data: GuildTextChannelData) {
        super(client, guild, data);
        this.patch(data);
    }

    protected patch(data: GuildTextChannelData) {
        super.patch(data);
        this.topic = data.topic || null;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.lastMessageID = data.last_message_id || null;
    }
}
