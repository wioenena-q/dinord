import { BaseEmoji } from "./BaseEmoji.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import type { Client } from "../Client/Client.ts";
import type { GuildEmojiData } from "../Types/GuildTypes.ts";
import type { Role } from "./Role.ts";
import type { Guild } from "./Guild.ts";
import { Collection } from "../../deps.ts";
import { User } from "./User.ts";

export class GuildEmoji extends BaseEmoji {
    private id: Snowflake;

    private roles = new Collection<Snowflake, Role>();

    private guild: Guild;

    private managed!: boolean;

    private animated!: boolean

    private available!: boolean;

    private author?: User | null;

    public constructor(client: Client, guild: Guild, data: GuildEmojiData) {
        super(client);
        this.id = data.id;
        this.guild = guild;
        this.patch(data);
    }

    protected patch(data: GuildEmojiData) {
        this.name = data.name || null;

        if ("roles" in data) {
            this.roles.clear();
            for (const id of data.roles) {
                this.roles.concat(
                    this.guild.getRoles.filter((r) => r.getID === id)
                );
            }
        }

        this.managed = data.managed;

        this.animated = data.animated;

        this.available = data.available;

        if ("user" in data) {
            if (!this.client.getUsers.has(data.user.id)) {
                const user = new User(this.client, data.user);
                this.client.getUsers.set(user.getID, user);
            } else {
                this.author = this.client.getUsers.get(data.user.id);
            }
        } else
            this.author = null;
    }

    public get getID() { return this.id; }
}
