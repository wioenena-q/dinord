import { EventEmitter } from "../../deps.ts";
import WebSocketManager from "./ws/WebSocketManager.ts";







/**
 *
 * Base Client.
 * @export
 * @class Client
 * @extends {EventEmitter}
 */
export class Client extends EventEmitter {

    private ws = new WebSocketManager(this);

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
     * Creates an instance of Client.
     * @param {*} [options]
     * @memberof Client
     */
    public constructor(options?: any) {
        super();
        this.guildSize = null;
        this._token = null;
        this.options = options;
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
}