import { Base } from "./deps.ts";
import type { Client } from "../client/deps.ts";
import type { Snowflake } from "./typedefs/deps.ts";

export class Guild extends Base {

    private id: Snowflake;

    public constructor(client: Client, data: any) {
        super(client);
        this.id = data.id;
        this.patch(data);
    }

    protected patch(data: any) {
        data;
    }
}