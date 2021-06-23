import type { Client } from "../../Client.ts";
import type { IPayload } from "../../../Types/IPayload.ts";
import { Guild } from "../../../Structures/Guild.ts";
import type { GuildData } from "../../../Types/GuildTypes.ts";
import { ClientEvents } from "../../../Utils/Constants.ts";

export default function (client: Client, { d }: IPayload) {
    let guild: Guild | undefined = client.getGuilds.get((d as GuildData).id);

    if (typeof guild === "undefined") {
        guild = new Guild(client, d as GuildData);
        client.getGuilds.set(guild.getID, guild);
    }

    if (client.getGuilds.size === client.getWsClient.getGuildSize) {
        client.emit(ClientEvents.READY);
    }

    if (client.getGuilds.size > client.getWsClient.getGuildSize) {
        client.getWsClient.setGuildSize = client.getGuilds.size;
        client.emit(ClientEvents.GUILD_CREATE, guild);
    }
}
