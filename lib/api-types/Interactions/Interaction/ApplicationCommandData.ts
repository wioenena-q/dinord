import type { Snowflake } from "../../mod.ts";
import type { IApiApplicationCommandInteractionDataOption } from "./ApplicationCommandInteractionDataOption.ts";
import type { IApiResolvedData } from "./ResolvedData.ts";

export interface IApiApplicationCommandData {
	id: Snowflake;
	name: string;
	type: ApiApplicationCommandType;
	resolved?: IApiResolvedData;
	options?: IApiApplicationCommandInteractionDataOption[];
	guild_id?: Snowflake;
	target_id?: Snowflake;
}
