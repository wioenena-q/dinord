import { GuildChannel } from "./GuildChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { GuildCategoryChannelData } from "../Types/GuildTypes.ts";
import type { Guild } from "./Guild.ts";

export class GuildCategoryChannel extends GuildChannel {
    public constructor(client: Client, guild: Guild, data: GuildCategoryChannelData) {
        super(client, guild, data);
        this.patch(data);
    }
}
