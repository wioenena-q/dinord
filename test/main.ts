import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts?code';
import { IntentFlags } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/api/v10/Intents.ts';
import { Client } from '../src/Client/Client.ts';

config({ export: true });

const client = new Client({
  ws: {
    intents: IntentFlags.Guilds,
    shardCount: 1
  }
});

client.on('shardReady', (shard) => {
  console.log(shard.toString());
});

client.login(Deno.env.get('TOKEN')).then(() => {
  console.log(client.ws.toString());
});
