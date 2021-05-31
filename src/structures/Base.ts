import type { Client } from "../client/deps.ts";



/**
 *
 * The base structure.
 * @export
 * @class Base
 */
export abstract class Base {

    /**
     *
     * Client in this class.
     * @private
     * @type {Client}
     * @memberof Base
     */
    private client: Client;

    /**
     * Creates an instance of Base.
     * @param {Client} client
     * @memberof Base
     */
    public constructor(client: Client) {
        this.client = client;
    }

    /**
     *
     * Patches data.
     * @protected
     * @abstract
     * @param {unknown} data
     * @memberof Base
     */
    protected abstract patch(data: unknown): void;


    public get getClient() { return this.client; }
}