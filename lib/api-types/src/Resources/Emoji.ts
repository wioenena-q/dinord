import { Optional, Snowflake } from "../mod.ts";

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
