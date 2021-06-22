import { Channel } from "./Channel.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { BaseTextChannelData } from "../Types/ChannelTypes.ts";
import type { Client } from "../Client/Client.ts";

/**
 *
 * The base text channel structure for (DMChannel | GroupDMChannel | GuildTextChannel) structures.
 * @export
 * @class BaseTextChannel
 * @extends {Channel<BaseTextChannelData>}
 */
export class BaseTextChannel extends Channel<BaseTextChannelData> {
    private lastMessageID?: Snowflake | null;

    public constructor(client: Client, data: BaseTextChannelData) {
        super(client, data);
        this.patch(data);
    }

    protected patch(data: BaseTextChannelData) {
        super.patch(data);
        this.lastMessageID = data.last_message_id;
    }
}
