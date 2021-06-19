/* eslint-disable camelcase */
import { EventEmitter } from "../../../deps.ts";
import * as Constants from "../../Utils/Constants.ts";
import { Client } from "../Client.ts";
import type { IPayload } from "../../Types/IPayload.ts";
import { Util } from "../../Utils/Util.ts";

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
        Util.Logger.info("Connected to WebSocket.");
        this.emit("connectedWebSocket", this);
        this.socket.onmessage = this.onMessage.bind(this);
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

        switch (op) {
            // Op Code hello.
            case Constants.OPCodes.HELLO:
                // eslint-disable-next-line no-case-declarations
                const { heartbeat_interval } = d as Record<string, unknown>;
                this.heartbeat(heartbeat_interval as number, lastSeq);
                this.identify();
                break;
            case Constants.OPCodes.DISPATCH:
                break;

            default:
                break;
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

            socket.onclose = (e) => console.log(e);

            socket.onopen = () => {
                this.socket = socket;
                res();
            };

            socket.onerror = rej;
        });
    }

    private heartbeat(interval: number, lastSeq: number | null) {
        this.interval = setInterval(() => {
            this.socket.send(
                JSON.stringify({
                    op: 1,
                    d: lastSeq
                })
            );
        }, Math.floor(interval * Math.random()));
    }

    private identify() {
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
    }
}
