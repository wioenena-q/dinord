import { BaseTextChannel } from "./BaseTextChannel.ts";
import type { Client } from "../Client/Client.ts";
import type { DMChannelData } from "../Types/ChannelTypes.ts";
import { User } from "./User.ts";

/**
 *
 * This structure was made for dm channels.
 * @export
 * @class DMChannel
 * @extends {BaseTextChannel}
 */
export class DMChannel extends BaseTextChannel {
    private recipient!: User;

    public constructor(client: Client, data: DMChannelData) {
        super(client, data);

        this.patch(data);
    }

    protected patch(data: DMChannelData) {
        super.patch(data);

        const { recipients } = data;
        let user: User | undefined = this.client.getUsers.get(recipients[0].id);
        if (!user) {
            user = new User(this.client, recipients[0]);
            this.recipient = user;
            this.client.getUsers.set(user.getID, user);
        } else
            this.recipient = user;
    }
}
