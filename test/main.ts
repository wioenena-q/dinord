import { Client } from '../src/Client/Client.ts';
import 'dotenv/load.ts';

const client = new Client(
  {
    token: Deno.env.get('TOKEN')!,
    ws: {
      compress: false,
      intents: 0,
      encoding: 'etf',
    },
  },
);

client.connect();
