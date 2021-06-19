import type { Client } from "../Client/Client.ts";

/**
 *
 *
 * @export
 * @abstract
 * @class Base
 * @template T
 */
export abstract class Base<T> {
    /**
     *
     *
     * @private
     * @type {Client}
     * @memberof Base
     */
    private client: Client

    /**
     * Creates an instance of Base.
     * @param {Client} client
     * @param {T} data
     * @memberof Base
     */
    public constructor(client: Client) {
        this.client = client;
    }

    /**
     *
     * The method to patch this class.
     * @protected
     * @abstract
     * @param {T} data
     * @memberof Base
     */
    protected abstract patch(data: T): void;
}
