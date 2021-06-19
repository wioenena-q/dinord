import type { Client } from "../../Client.ts";
import type { IPayload } from "../../../Types/IPayload.ts";
import { ClientUser } from "../../ClientUser.ts";
import type { IUser } from "../../../Types/StructureTypes.ts";

export default function (client: Client, { d }: IPayload) {
    client.setUser = new ClientUser(client, (d as Record<string, unknown>).user as IUser);

    client.getWsClient.setGuildSize = (d as any).guilds.length;

    console.log(client);
}
