import { Optional } from "../mod.ts";
import { IApiApplication } from "./Application.ts";
import { IApiChannel } from "./Channel.ts";
import { IApiGuild, IApiGuildMember } from "./Guild.ts";

export interface IApiInvite {
	code: string;
	guild?: Partial<IApiGuild>;
	channel: Optional<Partial<IApiChannel>>;
	inviter?: IApiUser;
	target_type?: ApiInviteTargetType;
	target_user?: IApiUser;
	target_application?: Partial<IApiApplication>;
	approximate_presence_count?: number;
	approximate_member_count?: number;
	expires_at?: Optional<string>;
	stage_instance?: IApiInviteStageInstance;
	guild_scheduled_event?: IApiGuildScheduledEvent;
}

export const enum ApiInviteTargetType {
	STREAM = 1,
	EMBEDDED_APPLICATION = 2,
}

export interface IApiInviteMetadata {
	uses: number;
	max_uses: number;
	max_age: number;
	temporary: boolean;
	created_at: string;
}

/* DEPRECATED */
export interface IApiInviteStageInstance {
	members: Partial<IApiGuildMember>[];
	participant_count: number;
	speaker_count: number;
	topic: string;
}
