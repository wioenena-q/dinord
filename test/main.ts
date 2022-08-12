import { GatewayIntentBits } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts?code';
import { Client } from '../src/Client/Client.ts';

config({ export: true });

const client = new Client({
  ws: {
    intents: GatewayIntentBits.Guilds,
    shardCount: 1
  }
});

client.on('shardReady', (shard) => {
  console.log(shard.toString());
});

client.login(Deno.env.get('TOKEN')).then(() => {
  console.log(client.ws.toString());
});
