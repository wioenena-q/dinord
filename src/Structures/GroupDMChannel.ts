import { BaseTextChannel } from "./BaseTextChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { GroupDMChannelData } from "../Types/ChannelTypes.ts";
import { User } from "./User.ts";
import { Collection } from "../../deps.ts";
import type { Snowflake } from "../Types/Snowflake.ts";

export class GroupDMChannel extends BaseTextChannel {
    private recipients = new Collection<Snowflake, User>();

    private ownerID!: Snowflake;

    private icon?: string | null;

    private name!: string;

    public constructor(client: Client, data: GroupDMChannelData) {
        super(client, data);
        this.patch(data);
    }

    protected patch(data: GroupDMChannelData) {
        super.patch(data);

        const { recipients } = data;

        for (const recipient of recipients) {
            let user: User | undefined = this.client.getUsers.get(recipient.id);

            if (!user) {
                user = new User(this.client, recipient);
                this.recipients.set(user.getID, user);
                this.client.getUsers.set(user.getID, user);
            } else
                this.recipients.set(user.getID, user);
        }

        this.ownerID = data.owner_id;
        this.icon = data.icon || null;
        this.name = data.name;
    }

    public get owner() { return this.client.getUsers.get(this.ownerID); }
}
