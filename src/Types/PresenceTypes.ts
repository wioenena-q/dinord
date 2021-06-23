import type { Snowflake } from "./Snowflake.ts";
import type { UserData } from "./UserTypes.ts";

export interface PresenceData {
    user: UserData;
    guild_id: Snowflake;
    status: PresenceStatus;
    activities: PresenceActivityData[];
    client_status: PresenceClientStatus;
}

export interface PresenceActivityData {
    name: string;
    type: number;
    url?: string;
    created_at: number;
    timestamps: PresenceActivityTimestampData;
    application_id?: Snowflake;
    details?: string;
    state?: string;
    emoji?: PresenceActivityEmojiData;
    party?: PresenceActivityPartyData;
    assets?: PresenceActivityAssetsData;
    secrets?: PresenceActivitySecretsData;
    instance?: boolean;
    flags?: number;
    buttons?: PresenceActivityButtonsData[]
}

export type PresenceStatus = "idle" | "dnd" | "online" | "offline"

export interface PresenceClientStatus {
    desktop?: PresenceStatus;
    mobile?: PresenceStatus;
    web?: PresenceStatus;
}

export interface PresenceActivityTimestampData {
    start?: number;
    end?: number;
}

export interface PresenceActivityEmojiData {
    name: string;
    id?: Snowflake;
    animated?: boolean;
}

export interface PresenceActivityPartyData {
    id?: string;
    size?: number[]
}

export interface PresenceActivityAssetsData {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}

export interface PresenceActivitySecretsData {
    join?: string;
    spectate?: string;
    match?: string;
}

export interface PresenceActivityButtonsData {
    label: string;
    url: string;
}
