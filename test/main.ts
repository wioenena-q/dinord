import { Client } from "../src/Client/Client.ts";
import { ClientConfig } from "../src/Client/ClientConfig.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts?code";
import { IntentFlags } from "../src/Utils/Constants.ts";

config({ export: true });

const client = new Client(
  new ClientConfig(
    new ClientConfig({
      token: Deno.env.get("TOKEN"),
      intents: IntentFlags.ALL
    })
  )
);

client.login();
