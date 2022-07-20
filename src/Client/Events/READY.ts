import type { Client } from '../Client.ts';
import type { IReadyPayloadData } from '../../Utils/ApiTypes.ts';
import { ClientUser } from '../ClientUser.ts';

export default (client: Client, d: IReadyPayloadData) => {
  client.ws.guildSize = d.guilds.length;
  client.user = new ClientUser(client, d.user);
};
