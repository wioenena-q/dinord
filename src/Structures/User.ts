import { Base } from "./Base.ts";
import type { IUser } from "../Types/StructureTypes.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";
import { Util } from "../Utils/Util.ts";

export class User extends Base<IUser> {
    private id!: Snowflake;

    private username!: string;

    private discriminator!: string;

    private avatar!: string | null;

    private bot!: boolean;

    private system!: boolean;

    private mfaEnabled!: boolean

    private verified!: boolean

    private flags!: number

    private premiumType!: number;

    private createdAt!: Date;

    public constructor(client: Client, data: IUser) {
        super(client);
        this.patch(data);
    }

    protected patch(data: IUser): void {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar || null;
        this.bot = data.bot || false;
        this.system = data.system || false;
        this.mfaEnabled = data.mfa_enabled || false;
        this.verified = data.verified || false;
        this.flags = data.flags;
        this.premiumType = data.premium_type;
        this.createdAt = new Date(Util.idToTimestamp(this.id));
    }

    public get createdTimestamp() {
        return this.createdAt.getTime();
    }
}
