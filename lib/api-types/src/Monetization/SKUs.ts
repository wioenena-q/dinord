import type { Snowflake } from "../mod.ts";

export interface IApiSKU {
	id: Snowflake;
	type: ApiSKUType;
	application_id: Snowflake;
	name: string;
	slug: string;
	flags: number;
}

export const enum ApiSKUType {
	SUBSCRIPTION = 5,
	SUBSCRIPTION_GROUP = 6,
}

export const enum ApiSKUFlag {
	Available = 1 << 2,
	GuildSubscription = 1 << 7,
	UserSubscription = 1 << 8,
}
