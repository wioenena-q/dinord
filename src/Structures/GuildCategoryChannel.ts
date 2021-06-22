import { GuildChannel } from "./GuildChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { GuildCategoryChannelData } from "../Types/GuildTypes.ts";

export class GuildCategoryChannel extends GuildChannel {
    public constructor(client: Client, data: GuildCategoryChannelData) {
        super(client, data);
        this.patch(data);
    }
}
