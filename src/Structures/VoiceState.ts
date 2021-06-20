import { Base } from "./Base.ts";
import type { User } from "./User.ts";
import type { Guild } from "./Guild.ts";
import type { GuildVoiceStateData } from "../Types/GuildTypes.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";

/**
 *
 * The voice state structure for guild members.
 * @export
 * @class VoiceState
 * @extends {Base<GuildVoiceStateData>}
 */
export class VoiceState extends Base<GuildVoiceStateData> {
    private guildID: Snowflake;

    private userID: Snowflake;

    private channelID?: Snowflake | null;

    private sessionID!: string;

    private deaf!: boolean;

    private mute!: boolean;

    private selfDeaf!: boolean;

    private selfMute!: boolean;

    private selfVideo!: boolean;

    private streaming!: boolean

    public constructor(client: Client, data: GuildVoiceStateData) {
        super(client);
        this.guildID = data.guild_id;
        this.userID = data.user_id;
        this.patch(data);
    }

    protected patch(data: GuildVoiceStateData): void {
        this.channelID = "channel_id" in data ? data.channel_id : null;
        this.sessionID = data.session_id;
        this.deaf = data.deaf || false;
        this.mute = data.mute || false;
        this.selfDeaf = data.self_deaf || false;
        this.selfMute = data.self_mute || false;
        this.selfVideo = data.self_video || false;
        this.streaming = "self_stream" in data ? data.self_stream! : false;
    }

    public get getUserID() { return this.userID; }
}
