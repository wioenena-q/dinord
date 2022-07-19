import { Client } from "../src/Client/Client.ts";
import { ClientConfig } from "../src/Client/ClientConfig.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts?code";

config({ export: true });

const client = new Client(new ClientConfig(Deno.env.get("TOKEN")));

client.login();
