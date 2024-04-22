import type { Snowflake } from "../../mod.ts";

export interface IApiResolvedData {
	users?: Record<Snowflake, IApiUser>;
	members?: Record<Snowflake, Partial<IApiGuildMember>>; // Without user, deaf and mute fields.
	roles?: Record<Snowflake, IApiRole>;
	channels?: Record<Snowflake, Partial<IApiChannel>>; // Only have id, name, type and permissions fields. Threads will also have thread_metadata and parent_id fields.
	messages?: Record<Snowflake, Partial<IApiMessage>>;
	attachments?: Record<Snowflake, IApiAttachment>;
}
