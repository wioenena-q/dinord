import type { Client } from '../Client.ts';
import type {
  IGuildCreatePayloadData,
  IUnavailableGuild
} from '../../Utils/ApiTypes.ts';
import { ClientEvents } from '../../Utils/Constants.ts';

export default (client: Client, d: IUnavailableGuild) => {
  const guild = client.guilds.get(d.id!);
  if (guild) {
    client.emit(ClientEvents.GUILD_DELETE, guild);
    client.guilds.delete(d.id!);
    client.ws.guildSize--;
  }
};
