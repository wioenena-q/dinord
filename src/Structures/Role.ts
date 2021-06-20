import { Base } from "./Base.ts";
import type { GuildRoleData } from "../Types/GuildTypes.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import { Util } from "../Utils/Util.ts";

/**
 *
 * The User structure for discord users.
 * @export
 * @class User
 * @extends {Base<GuildRoleData>}
 */
export class Role extends Base<GuildRoleData> {
    private id: Snowflake;

    private name!: string;

    private color!: number;

    private hoist!: boolean;

    private position!: number;

    private permissions!: string;

    private managed!: boolean;

    private mentionable!: boolean;

    public constructor(client: Client, data: GuildRoleData) {
        super(client);
        this.id = data.id;
        this.patch(data);
    }

    protected patch(data: GuildRoleData): void {
        this.name = data.name;
        this.color = data.color;
        this.hoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.managed = data.managed || false;
        this.mentionable = data.mentionable || false;
    }

    public get getID() { return this.id; }
}
