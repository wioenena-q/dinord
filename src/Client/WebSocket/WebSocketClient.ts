import { EventEmitter } from "../../../deps.ts";
import * as Constants from "../../Utils/Constants.ts";
import { Client } from "../Client.ts";

/**
 *
 * The class to connect to the API.
 * @export
 * @class WebSocketClient
 * @extends {EventEmitter}
 */
export class WebSocketClient extends EventEmitter {
    /**
     *
     * The WebSocket class.
     * @private
     * @type {WebSocket}
     * @memberof WebSocketClient
     */
    private socket!:WebSocket;

    /**
     *
     * The total guild size.
     * @private
     * @type {number}
     * @memberof WebSocketClient
     */
    private guildSize!:number;

    /**
     *
     * The base client.
     * @private
     * @type {unknown}
     * @memberof WebSocketClient
     */
    private client:Client;

    /**
     * Creates an instance of WebSocketClient.
     * @param {Client} client - Base client.
     * @memberof WebSocketClient
     */
    public constructor(client:Client) {
        super();
        this.client = client;
    }

    /**
     *
     * The method to connect to the API.
     * @memberof WebSocketClient
     */
    public async connect() {
        await this.connectWebSocket(Constants.Discord.GATEWAY);
        this.socket.onmessage = this.onMessage;
    }

    /**
     *
     *
     * @private
     * @param {unknown} d
     * @memberof WebSocketClient
     */
    private onMessage(d:unknown) {

    }

    /**
     *
     *
     * @private
     * @param {string} url
     * @returns {Promise<WebSocket>}
     * @memberof WebSocketClient
     */
    private connectWebSocket(url:string):Promise<void> {
        return new Promise<void>((res, rej) => {
            const socket:WebSocket = new WebSocket(url);

            socket.onopen = () => {
                this.socket = socket;
                res();
            };

            socket.onerror = rej;
        });
    }
}
