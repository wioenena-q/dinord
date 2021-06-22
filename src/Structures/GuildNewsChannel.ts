import { GuildChannel } from "./GuildChannel.ts";
import type { GuildNewsChannelData } from "../Types/GuildTypes.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";

export class GuildNewsChannel extends GuildChannel {
    private topic?: string | null;

    private lastMessageID?: Snowflake | null;

    public constructor(client: Client, data: GuildNewsChannelData) {
        super(client, data);
        this.patch(data);
    }

    protected patch(data: GuildNewsChannelData) {
        super.patch(data);
        this.topic = data.topic || null;
        this.lastMessageID = data.last_message_id || null;
    }
}
