import { Base } from "./Base.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";
import type { PresenceData, PresenceStatus, PresenceClientStatus } from "../Types/PresenceTypes.ts";
import type { User } from "./User.ts";
import type { Guild } from "./Guild.ts";
import { Activity } from "./Activity.ts";

export class Presence extends Base<PresenceData> {
    private user!: User;

    private guild: Guild;

    private status!: PresenceStatus;

    private activities: Activity[] = [];

    private clientStatus!: PresenceClientStatus;

    public constructor(client: Client, guild: Guild, data: PresenceData) {
        super(client);
        this.user = this.client.getUsers.get(data.user.id)!;
        this.guild = guild;
        this.patch(data);
    }

    protected patch(data: PresenceData) {
        this.user = this.client.getUsers.get(data.user.id)!;
        this.status = data.status;

        for (const activityData of data.activities) {
            this.activities.push(new Activity(this.client, activityData));
        }

        this.clientStatus = data.client_status;
    }

    public get getUser() { return this.user; }
}
