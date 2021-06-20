/* eslint-disable no-underscore-dangle */
import { Base } from "./Base.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { GuildMemberData } from "../Types/GuildTypes.ts";
import type { Guild } from "./Guild.ts";
import { User } from "./User.ts";

export class GuildMember extends Base<GuildMemberData> {
    private id: Snowflake;

    private guild: Guild;

    private nickname?: string | null;

    private _roles!: Snowflake[];

    private joinedAt!: Date;

    private premiumSince?: Date | null;

    private deaf!: boolean;

    private mute!: boolean;

    public constructor(client: Client, guild: Guild, data: GuildMemberData) {
        super(client);
        this.id = data.user.id;
        this.guild = guild;
        this.patch(data);
    }

    protected patch(data: GuildMemberData): void {
        this.nickname = (data.nick !== undefined && data.nick !== null) ? data.nick : null;
        this._roles = data.roles;
        this.joinedAt = new Date(data.joined_at);
        this.premiumSince = "premium_since" in data ? new Date(data.premium_since!) : null;
        this.deaf = data.deaf || false;
        this.mute = data.mute || false;

        if (!this.client.getUsers.has(this.id)) {
            const user = new User(this.client, data.user);
            this.client.getUsers.set(user.getID, user);
        }
    }

    public get roles() { return this.guild.getRoles.filter((r) => this._roles.includes(r.getID)); }

    public get user() { return this.client.getUsers.get(this.id) || null; }

    public get getID() { return this.id; }
}
