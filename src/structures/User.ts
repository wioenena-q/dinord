import { Base } from "./deps.ts";
import type { Client } from "../client/deps.ts";
import type { Snowflake } from "./typedefs/deps.ts";
import { PremiumTypes } from "../util/deps.ts";

/**
 *
 * 
 * @export
 * @class User
 * @extends {Base}
 */
export class User extends Base {

    /**
     *
     * The id of this user.
     * @private
     * @type {Snowflake}
     * @memberof User
     */
    private id: Snowflake;

    /**
     *
     * The username of this user.
     * @private
     * @type {string}
     * @memberof User
     */
    private username!: string;

    /**
     *
     * The user's 4-digit discord-tag.
     * @private
     * @type {string}
     * @memberof User
     */
    private discriminator!: string;

    /**
     *
     * The user's avatar hash.
     * @private
     * @type {(string | null)}
     * @memberof User
     */
    private avatar?: string | null;

    /**
     *
     * Whether the user belongs to an OAuth2 application.
     * @private
     * @type {boolean}
     * @memberof User
     */
    private bot!: boolean;


    /**
     *
     * Whether the user is an Official Discord System user.
     * @private
     * @type {boolean}
     * @memberof User
     */
    private system!: boolean;


    /**
     *
     * Whether the user has two factor enabled on their account.
     * @private
     * @type {boolean}
     * @memberof User
     */
    private mfaEnabled!: boolean;


    /**
     *
     * Whether the email on this account has been verified.
     * @private
     * @type {boolean}
     * @memberof User
     */
    private verified!: boolean;

    /**
     *
     * The flags on a user's account.
     * @private
     * @type {number}
     * @memberof User
     */
    private flags!: number;

    /**
     *
     * The type of Nitro subscription on a user's account.
     * @private
     * @type {number}
     * @memberof User
     */
    private premiumType!: string;

    public constructor(client: Client, data: any) {
        super(client);
        this.id = data.id;
        this.patch(data);

    }

    protected patch(data: any) {
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar || null;
        this.bot = data.bot || false;
        this.system = data.system || false;
        this.mfaEnabled = data.mfa_enabled || false;
        this.verified = data.verified || false;
        this.flags = data.flags;
        this.premiumType = PremiumTypes[data.premium_type || 0];
    }
}
