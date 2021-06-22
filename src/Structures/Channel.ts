import { Base } from "./Base.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";
import type { BaseChannelData } from "../Types/ChannelTypes.ts";

/**
 *
 * The main channel structure for discord channels.
 * @export
 * @class Channel
 * @extends {Base<BaseChannelData>}
 */
export class Channel<T> extends Base<BaseChannelData> {
    private id: Snowflake;
    private type!: number;

    public constructor(client: Client, data: BaseChannelData) {
        super(client);
        this.id = data.id;
        this.type = data.type;
    }

    protected patch(data: unknown) { }
}