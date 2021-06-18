import { EventEmitter } from "../../../deps.ts";
import * as Constants from "../../Utils/Constants.ts";

function connectWebSocket(url:string):Promise<WebSocket> {
    return new Promise<WebSocket>((res, rej) => {
        const socket:WebSocket = new WebSocket(url);

        socket.onopen = () => {
            res(socket);
        };
        socket.onerror = rej;
    });
}

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
     * The method to connect to the API.
     * @memberof WebSocketClient
     */
    public async connect() {
        this.socket = await connectWebSocket(Constants.Discord.GATEWAY);
        this.socket.onmessage = this.onMessage;
    }

    private onMessage(d:unknown) {
    }
}
