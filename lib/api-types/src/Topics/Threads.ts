import type { IApiThreadMetadata } from "../Resources/Channel.ts";
import type { ApiChannelType, IApiChannel } from "../Resources/Channel.ts";
import type { Snowflake } from "../mod.ts";

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
