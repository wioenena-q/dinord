import type { IPayload } from "../../../structures/typedefs/deps.ts";
import type { Client } from "../../deps.ts";
import { Guild } from "../../../structures/deps.ts";

export default function (client: Client, { d }: IPayload) {
    client.getGuilds.add(d);
}