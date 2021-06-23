import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Client } from "../mod.ts";

const env = config();

const client = new Client({
    token: env.TOKEN,
    deepLogs: true
});

client.login();

client.on("ready", () => {
    console.log("Bot has logged in!", client.getGuilds.size, client.getWsClient.getGuildSize);
});

client.on("guildCreate", (g) => {
    console.log(g.name, client.getGuilds.size, client.getWsClient.getGuildSize);
});
