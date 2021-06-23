import { Base } from "./Base.ts";
import type {
    PresenceActivityData,
    PresenceActivityAssetsData,
    PresenceActivityEmojiData,
    PresenceActivityPartyData,
    PresenceActivityTimestampData,
    PresenceActivityButtonsData
} from "../Types/PresenceTypes.ts";
import type { Client } from "../Client/Client.ts";
import type { Snowflake } from "../Types/Snowflake.ts";

export class Activity extends Base<PresenceActivityData> {
    private applicationID?: Snowflake | null;

    private assets?: PresenceActivityAssetsData | null;

    private createdAt!: Date;

    private detail?: string | null;

    private emoji?: PresenceActivityEmojiData | null;

    private flags!: number;

    private name!: string;

    private party?: PresenceActivityPartyData | null;

    private state?: string | null;

    private timestamps?: PresenceActivityTimestampData | null;

    private type!: number;

    private url?: string;

    private buttons?: PresenceActivityButtonsData[] | null;

    public constructor(client: Client, data: PresenceActivityData) {
        super(client);
        this.patch(data);
    }

    protected patch(data: PresenceActivityData) {
        this.applicationID = data.application_id || null;
        this.assets = data.assets || null;
        this.createdAt = new Date(data.created_at);
        this.detail = data.details || null;
        this.emoji = data.emoji || null;
        this.flags = data.flags || 0;
        this.name = data.name;
        this.party = data.party || null;
        this.state = data.state || null;
        this.timestamps = data.timestamps || null;
        this.type = data.type;
        this.url = data.url;
        this.buttons = data.buttons || null;
    }
}
