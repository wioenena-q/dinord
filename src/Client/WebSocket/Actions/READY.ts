import type { Client } from "../../Client.ts";
import type { IPayload } from "../../../Types/IPayload.ts";
import { ClientUser } from "../../ClientUser.ts";
import type { UserData } from "../../../Types/UserTypes.ts";

export default function (client: Client, { d }: IPayload) {
    client.setUser = new ClientUser(client, (d as Record<string, unknown>).user as UserData);

    const { guilds } = d as Record<string, unknown>;

    client.getWsClient.setGuildSize = (guilds as unknown[]).length;
}
