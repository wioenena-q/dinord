import { Client } from '../src/Client/Client.ts';
import { ClientConfig } from '../src/Client/ClientConfig.ts';
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts?code';
import { ClientEvents, IntentFlags } from '../src/Utils/Constants.ts';

config({ export: true });

const client = new Client(
  new ClientConfig({
    token: Deno.env.get('TOKEN'),
    intents: IntentFlags.ALL
  })
);

client.on(ClientEvents.READY, () => {
  console.log('Ready!');
  for (const [id, guild] of client.guilds) {
    console.log('Guild (%s): %s', id, guild.name);
  }
});

client.on(ClientEvents.GUILD_CREATE, (guild: any) => {
  console.log('Guild created(%s): %s', guild.id, guild.name);
});

client.login();
