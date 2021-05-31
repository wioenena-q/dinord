import type { IPayload } from "../../../structures/typedefs/deps.ts";
import type { Client } from "../../deps.ts";
import { ClientUser } from "../../deps.ts";

export default function (client: Client, { d }: IPayload) {
    client.setUser = new ClientUser(client, d.user);

    console.log(client.getUser);
}