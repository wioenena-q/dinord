import { Optional, Snowflake } from "../mod.ts";
import { IApiApplicationRoleConnectionMetadata } from "./ApplicationRoleConnectionMetadata.ts";
import { IApiIntegration } from "./Guild.ts";

export interface IApiUser {
	id: Snowflake;
	username: string;
	discriminator: string;
	global_name: Optional<string>;
	avatar: Optional<string>;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	banner?: Optional<string>;
	accent_color?: Optional<number>;
	locale?: string;
	verified?: boolean;
	email?: Optional<string>;
	flags?: number;
	premium_type?: number;
	public_flags?: number;
	avatar_decoration?: Optional<string>;
}

export const enum ApiUserFlag {
	STAFF = 1 << 0,
	PARTNER = 1 << 1,
	HYPESQUAD = 1 << 2,
	BUG_HUNTER_LEVEL_1 = 1 << 3,
	HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
	HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
	HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
	PREMIUM_EARLY_SUPPORTER = 1 << 9,
	TEAM_PSEUDO_USER = 1 << 10,
	BUG_HUNTER_LEVEL_2 = 1 << 14,
	VERIFIED_BOT = 1 << 16,
	VERIFIED_DEVELOPER = 1 << 17,
	CERTIFIED_MODERATOR = 1 << 18,
	BOT_HTTP_INTERACTIONS = 1 << 19,
	ACTIVE_DEVELOPER = 1 << 22,
}

export const enum ApiPremiumType {
	None = 0,
	NitroClassic = 1,
	Nitro = 2,
	NitroBasic = 3,
}

export interface IApiConnection {
	id: string;
	name: string;
	type: string;
	revoked?: boolean;
	integrations?: Partial<IApiIntegration>[];
	verified: boolean;
	friend_sync: boolean;
	show_activity: boolean;
	two_way_link: boolean;
	visibility: ApiVisibilityType;
}

/* Services */
// TODO(wioenena) Implement enum
/*
 * battlenet	Battle.net
 * bungie	Bungie.net
 * ebay	eBay
 * epicgames	Epic Games
 * facebook	Facebook
 * github	GitHub
 * instagram	Instagram
 * leagueoflegends	League of Legends
 * paypal	PayPal
 * playstation	PlayStation Network
 * reddit	Reddit
 * riotgames	Riot Games
 * spotify	Spotify
 * skype *	Skype
 * steam	Steam
 * tiktok	TikTok
 * twitch	Twitch
 * twitter	X (Twitter)
 * xbox	Xbox
 * youtube	YouTube
 */

export const enum ApiVisibilityType {
	None = 0,
	Everyone = 1,
}

export interface IApiApplicationRoleConnection {
	platform_name: Optional<string>;
	platform_username: Optional<string>;
	metadata: IApiApplicationRoleConnectionMetadata;
}
