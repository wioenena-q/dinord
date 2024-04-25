import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";

export interface IApiEmoji {
	id: Optional<Snowflake>;
	name: Optional<string>;
	roles?: Snowflake[];
	user?: IApiUser;
	require_colons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
}
