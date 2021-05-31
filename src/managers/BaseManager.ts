import { Collection } from "../../deps.ts";
import type { Client } from "../client/deps.ts";
import type { Snowflake } from "../structures/typedefs/deps.ts";

/**
 *
 *
 * @export
 * @class BaseManager
 * @template ST
 */
export class BaseManager<ST> {

    /**
     *
     * The cache for this manager.
     * @private
     * @type {Collection<Snowflake, ST>}
     * @memberof BaseManager
     */
    private cache: Collection<Snowflake, ST>;

    /**
     *
     * The target structure for this manager.
     * @private
     * @type {*}
     * @memberof BaseManager
     */
    private structure: any;

    private client: Client;

    /**
     * Creates an instance of BaseManager.
     * @param {*} structure
     * @memberof BaseManager
     */
    public constructor(client: Client, structure: any) {
        this.client = client;
        this.structure = structure;
        this.cache = new Collection();
    }

    /**
     *
     * Adds data to the cache.
     * @param {*} data
     * @param {Record<string, any>} { id }
     * @returns
     * @memberof BaseManager
     */
    public add(data: any, { id }: Record<string, any> = {}) {
        const existing = this.cache.get(id || data.id) as any;
        if (existing && existing.patch) existing.patch(data);
        if (existing) return existing;

        const newStructure = new this.structure(this.client, data);
        this.cache.set(newStructure.id, newStructure);
        return newStructure;
    }

    public get getCache() { return this.cache; }
    public get getStructure() { return this.structure; }
    public get getClient() { return this.client; }
}