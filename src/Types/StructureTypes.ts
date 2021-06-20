import type { Snowflake } from "./Snowflake.ts";

export interface UserData {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string | null;
    bot: boolean;
    system: boolean;
    mfa_enabled: boolean;
    verified: boolean;
    flags: number;
    premium_type: number;
}

export interface GuildData {
    id: Snowflake;
    name: string;
    icon?: string;
}
