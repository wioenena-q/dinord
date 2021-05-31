import { BaseManager } from "./deps.ts";
import { Guild } from "../structures/deps.ts";
import type { Client } from "../client/deps.ts";

export class GuildManager extends BaseManager<Guild> {
    public constructor(client: Client) {
        super(client, Guild);
    }
}