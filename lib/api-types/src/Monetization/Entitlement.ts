import type { Snowflake } from "../mod.ts";

export interface IApiEntitlement {
	id: Snowflake;
	sku_id: Snowflake;
	application_id: Snowflake;
	user_id?: Snowflake;
	type: ApiEntitlementType;
	deleted: boolean;
	starts_at?: string;
	ends_at?: string;
	guild_id?: Snowflake;
}

export const enum ApiEntitlementType {
	APPLICATION_SUBSCRIPTION = 8,
}
