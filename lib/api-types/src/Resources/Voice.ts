import { Optional, Snowflake } from "../mod.ts";
import { IApiGuildMember } from "./Guild.ts";

export interface IApiVoiceState {
	guild_id?: Snowflake;
	channel_id: Optional<Snowflake>;
	user_id: Snowflake;
	member?: IApiGuildMember;
	session_id: string;
	deaf: boolean;
	mute: boolean;
	self_deaf: boolean;
	self_mute: boolean;
	self_stream?: boolean;
	self_video: boolean;
	suppress: boolean;
	request_to_speak_timestamp: Optional<string>;
}

export interface IApiVoiceRegion {
	id: string;
	name: string;
	optimal: boolean;
	deprecated: boolean;
	custom: boolean;
}
