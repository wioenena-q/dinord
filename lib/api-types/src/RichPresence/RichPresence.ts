export interface IApiUpdatePresencePayload {
	state: string;
	details: string;
	startTimestamp: number; // TODO(wioenena) Check is bigint
	endTimestamp: number; // TODO(wioenena) Check is bigint
	largeImageKey: string;
	largeImageText: string;
	smallImageKey: string;
	smallImageText: string;
	partyId: string;
	partySize: number;
	partyMax: number;
	matchSecret: string;
	spectateSecret: string;
	joinSecret: string;
	instance: number;
}

export interface IApiAskToJoinPayload {
	userId: string;
	username: string;
	discriminator: string;
	avatar: string;
}

export const enum ApiAskToJoinResponseCode {
	DISCORD_REPLY_NO = 0,
	DISCORD_REPLY_YES = 1,
	DISCORD_REPLY_IGNORE = 2,
}
