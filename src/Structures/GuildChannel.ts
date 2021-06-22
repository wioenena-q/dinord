import { Channel } from "./Channel.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { BaseGuildChannelData } from "../Types/GuildTypes.ts";
import type { Guild } from "./Guild.ts";

export class GuildChannel extends Channel<BaseGuildChannelData> {
    private guild: Guild;

    private nsfw!: boolean;

    private name!: string;

    private parentID?: Snowflake | null;

    private permissionOverwrites!: unknown[];

    private position!: number;

    public constructor(client: Client, guild: Guild, data: BaseGuildChannelData) {
        super(client, data);
        this.guild = guild;
        this.patch(data);
    }

    protected patch(data: BaseGuildChannelData) {
        super.patch(data);
        this.nsfw = data.nsfw || false;
        this.name = data.name;
        this.parentID = data.parent_id;
        this.permissionOverwrites = data.permission_overwrites;
        this.position = data.position;
    }
}
