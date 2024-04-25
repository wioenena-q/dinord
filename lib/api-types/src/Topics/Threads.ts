import type {
	ApiChannelType,
	IApiChannel,
	IApiThreadMetadata,
} from "api-types/src/Resources/Channel.ts";
import type { Snowflake } from "api-types/src/mod.ts";

export interface IApiThread extends
	Required<
		Pick<
			IApiChannel,
			| "id"
			| "guild_id"
			| "name"
			| "owner_id"
			| "parent_id"
			| "member_count"
			| "message_count"
			| "total_message_sent"
			| "thread_metadata"
		>
	> {
	guild_id: Snowflake;
	type: ApiChannelType;
	name: string;
	owner_id: Snowflake;
	parent_id: Snowflake;
	member_count: number;
	message_count: number;
	total_message_sent: number;
	thread_metadata: Required<IApiThreadMetadata>;
}
