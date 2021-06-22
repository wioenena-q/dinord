import { GuildChannel } from "./GuildChannel.ts";
import type { GuildNewsChannelData } from "../Types/GuildTypes.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";
import type { Guild } from "./Guild.ts";

export class GuildNewsChannel extends GuildChannel {
    private topic?: string | null;

    private lastMessageID?: Snowflake | null;

    public constructor(client: Client, guild: Guild, data: GuildNewsChannelData) {
        super(client, guild, data);
        this.patch(data);
    }

    protected patch(data: GuildNewsChannelData) {
        super.patch(data);
        this.topic = data.topic || null;
        this.lastMessageID = data.last_message_id || null;
    }
}
