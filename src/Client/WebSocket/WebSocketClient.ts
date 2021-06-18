/* eslint-disable camelcase */
import { EventEmitter } from "../../../deps.ts";
import * as Constants from "../../Utils/Constants.ts";
import { Client } from "../Client.ts";
import type { IPayload } from "../../Types/IPayload.ts";

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
    private socket!: WebSocket;

    /**
     *
     * The total guild size.
     * @private
     * @type {number}
     * @memberof WebSocketClient
     */
    private guildSize!: number;

    /**
     *
     * The base client.
     * @private
     * @type {unknown}
     * @memberof WebSocketClient
     */
    private client: Client;

    private interval!: number;

    /**
     * Creates an instance of WebSocketClient.
     * @param {Client} client - Base client.
     * @memberof WebSocketClient
     */
    public constructor(client: Client) {
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
    private onMessage(message: MessageEvent<string>) {
        const data: IPayload = JSON.parse(message.data);
        const { d, t, s, op } = data;

        let lastSeq = s;
        // OP Code Hello.
        if (op === Constants.OPCodes.HELLO) {
            const { heartbeat_interval } = d as Record<string, unknown>;
            this.heartbeat(heartbeat_interval as number);
        }
    }

    /**
     *
     *
     * @private
     * @param {string} url
     * @returns {Promise<WebSocket>}
     * @memberof WebSocketClient
     */
    private connectWebSocket(url: string): Promise<void> {
        return new Promise<void>((res, rej) => {
            const socket: WebSocket = new WebSocket(url);

            socket.onopen = () => {
                this.socket = socket;
                res();
            };

            socket.onerror = rej;
        });
    }

    private heartbeat(interval: number) {
        this.interval = setInterval(() => {
            this.socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        token: this.client.getToken,
                        intents: 513,
                        properties: {
                            $os: Deno.build.os,
                            $browser: "dinord",
                            $device: "dinord"
                        }
                    }
                })
            );
        }, interval * Math.random());
    }
}
