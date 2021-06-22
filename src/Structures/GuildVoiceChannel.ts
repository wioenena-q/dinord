import { GuildChannel } from "./GuildChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { GuildVoiceChannelData } from "../Types/GuildTypes.ts";
import type { Guild } from "./Guild.ts";

export class GuildVoiceChannel extends GuildChannel {
    private bitrate!: number;

    private userLimit!: number;

    private rtcRegion?: string | null;

    public constructor(client: Client, guild: Guild, data: GuildVoiceChannelData) {
        super(client, guild, data);
        this.patch(data);
    }

    protected patch(data: GuildVoiceChannelData) {
        super.patch(data);
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
        this.rtcRegion = data.rtc_region || null;
    }
}
