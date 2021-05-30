import { Client } from "../mod.ts";
import { config } from "../deps.ts";
const client = new Client();
const env = config();






client.login(env.TOKEN);