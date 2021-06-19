import { EventEmitter } from "../../deps.ts";
import type { IClientOptions } from "../Types/IClientTypes.ts";
import { WebSocketClient } from "./WebSocket/WebSocketClient.ts";
import type { ClientUser } from "./ClientUser.ts";

export class Client extends EventEmitter {
    /**
     *
     * The options for client.
     * @private
     * @type {ClientOptions}
     * @memberof Client
     */
    private options: IClientOptions;

    /**
     *
     * The class to connect to the API.
     * @private
     * @type {WebSocketClient}
     * @memberof Client
     */
    private ws: WebSocketClient = new WebSocketClient(this);

    /**
     *
     * The token for client.
     * @private
     * @type {(string|null)}
     * @memberof Client
     */
    private token: string | null | undefined = null;

    /**
     *
     * The user class for this client.
     * @private
     * @type {(ClientUser | null)}
     * @memberof Client
     */
    private user: ClientUser | null;

    /**
     * Creates an instance of Client.
     * @param {ClientOptions} [options]
     * @memberof Client
     */
    public constructor(options: IClientOptions = {}) {
        super();
        this.options = { deepLogs: false, ...options };

        this.user = null;
        this.token = null;

        if ("token" in this.options) {
            this.token = this.options.token;
        }
    }

    /**
     *
     * The client logs in.
     * @memberof Client
     */
    public async login(token?: string) {
        if (
            this.token === null ||
            this.token === undefined ||
            !this.token ||
            typeof this.token !== "string"
        ) {
            this.token = token;
        }

        if (!this.token) {
            throw new Error("Token invalid.");
        }
        await this.ws.connect();
    }

    public get getToken() {
        return this.token;
    }

    public get getWsClient() {
        return this.ws;
    }

    public get getOptions() { return this.options; }

    public set setUser(user: ClientUser) {
        this.user = user;
    }
}
