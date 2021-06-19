import type { Snowflake } from "./Snowflake.ts";

export interface IUser {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean;
    system: boolean;
    mfa_enabled: boolean;
    verified: boolean;
    flags: number;
    premium_type: number;
}
