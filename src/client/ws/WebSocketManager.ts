import { EventEmitter } from "../../../deps.ts";
import type { Client } from "../Client.ts";
import {
    Constants,
    Logger,
    Heartbeat,
    Identify
} from "../../util/deps.ts";
import type { IPayload } from "../../structures/typedefs/deps.ts";


/**
 *
 * Class to provide WebSocket connection.
 * @export
 * @class WebSocketClient
 * @extends {EventEmitter}
 */
export default class WebSocketManager extends EventEmitter {

    /**
     *
     * Client in this class.
     * @private
     * @type {Client}
     * @memberof WebSocketClient
     */
    private client: Client;

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
     * The Interval for the sended heartbeat.
     * @private
     * @type {number}
     * @memberof WebSocketClient
     */
    private interval!: number;

    /**
     * Creates an instance of WebSocketClient.
     * @param {Client} client
     * @memberof WebSocketClient
     */
    public constructor(client: Client) {
        super();
        this.client = client;
    }

    /**
     *
     * To provide Gateway connection.
     * @memberof WebSocketClient
     */
    public connect() {
        this.socket = new WebSocket(Constants.GATEWAY);

        this.socket.onopen = () => {
            Logger.succes("Connected to GATEWAY.");
        }

        this.socket.onerror = (ev) => {
            Logger.error(ev);
        }

        this.socket.onclose = (ev) => {
            Logger.info(ev);
        }

        this.socket.onmessage = async (event) => {
            const data: IPayload = JSON.parse(event.data);
            const { d, op, t } = data;
            switch (op) {
                case 10:
                    this.interval = this.heartbeat(d.heartbeat_interval);
                    Identify.d.token = this.client.getToken!;
                    this.socket.send(JSON.stringify(Identify));
                    break;
                case 0:
                    Logger.debug(`An event has been triggered.`, t)
                    try {
                        const { default: action } = await import(`./actions/${t}.ts`);
                        action(this.client, data);
                    } catch (e) {
                        Logger.error(e);
                    }
                    break;
            }
        }
    }

    public get getSocket() { return this.socket; }

    /**
     *
     * Sends heartbeat to Gateway.
     * @private
     * @memberof WebSocketClient
     */
    private heartbeat(heartbeatInterval: number) {
        Logger.info("Heartbeat is being sent to the gateway.")
        return setInterval(() => {
            this.socket.send(JSON.stringify(Heartbeat));
        }, Math.floor(Math.random() * heartbeatInterval));
    }
}
