import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts?code';
import { Client } from '../src/Client/Client.ts';
import { allIntents } from '../src/Utils/dev.ts';

config({ export: true });

const client = new Client({
  ws: {
    intents: allIntents(),
    shardCount: 1
  }
});

client.on('ready', () => {
  const g = client.guilds.get('1000004567452352552');
  if (g) {
    g.setName('test');
  }
});

client.on('guildCreate', (guild) => {
  console.log(`Client joined guild: ${guild.name}`);
});

client.on('guildDelete', (guild) => {
  console.log(`Client left guild: ${guild.name}`);
});

client.on('guildUpdate', (oldGuild, newGuild) => {
  console.log(`Client guild update: ${oldGuild.name} => ${newGuild.name}`);
});

client.on('debug', console.log);

client.login(Deno.env.get('TOKEN'));
