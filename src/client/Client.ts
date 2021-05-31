import { EventEmitter } from "../../deps.ts";
import WebSocketManager from "./ws/WebSocketManager.ts";
import type { ClientUser } from "./deps.ts";
import { GuildManager } from "../managers/deps.ts";





/**
 *
 * Base Client.
 * @export
 * @class Client
 * @extends {EventEmitter}
 */
export class Client extends EventEmitter {

    /**
     *
     * @private
     * @memberof Client
     */
    private ws = new WebSocketManager(this);

    /**
     *
     * The ClientUser class for client.
     * @private
     * @type {(ClientUser | null)}
     * @memberof Client
     */
    private user!: ClientUser | null;


    /**
     *
     * Total guild size.
     * @private
     * @type {(number | null)}
     * @memberof Client
     */
    private guildSize?: number | null;

    /**
     *
     * The token for this client.
     * @private
     * @type {(string | null)}
     * @memberof Client
     */
    private _token?: string | null;

    /**
     *
     * The options for this client.
     * @private
     * @type {*}
     * @memberof Client
     */
    private options: any;


    /**
     *
     * The Guild manager for client.
     * @private
     * @memberof Client
     */
    private guilds = new GuildManager(this);

    /**
     * Creates an instance of Client.
     * @param {*} [options]
     * @memberof Client
     */
    public constructor(options: any = {}) {
        super();
        this.guildSize = null;
        this._token = null;
        this.options = options;
        this.user = null;
    }

    /**
     *
     * Logs in.
     * @param {string} token
     * @memberof Client
     */
    public login(token: string) {
        if (!this.getToken) this._token = token;
        this.ws.connect();
    }

    public get getToken() { return this._token; }
    public get getGuildSize() { return this.guildSize; }
    public get getWs() { return this.ws; }
    public get getOptions() { return this.options; }
    public get getUser() { return this.user; }
    public get getGuilds() { return this.guilds; }

    public set setUser(struc: ClientUser) { this.user = struc; }
}