import { Guild } from '../../Structures/Guild.ts';
import { ClientEvents } from '../../Utils/Constants.ts';
import type { Client } from '../Client.ts';
import type { IGuildCreatePayloadData } from '../../Utils/ApiTypes.ts';

export default (client: Client, d: IGuildCreatePayloadData) => {
  const guild = new Guild(client, d);
  client.guilds.set(d.id, guild);

  if (client.guilds.size === client.ws.guildSize) {
    client.emit(ClientEvents.READY);
  } else if (client.guilds.size > client.ws.guildSize) {
    client.emit(ClientEvents.GUILD_CREATE, guild);
    client.ws.guildSize++;
  }
};
