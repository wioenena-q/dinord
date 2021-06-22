import type { Snowflake } from "./Snowflake.ts";
import type { UserData } from "./UserTypes.ts";

export interface BaseChannelData {
    id: Snowflake;
    type: number;
}

export interface BaseTextChannelData extends BaseChannelData {
    last_message_id?: Snowflake;
}

export interface DMChannelData extends BaseTextChannelData {
    recipients: UserData[];
}

export interface GroupDMChannelData extends DMChannelData {
    name: string;
    icon?: string;
    owner_id: Snowflake;
}
