import type { ApiOAuth2Scope } from "api-types/src/Topics/OAuth2.ts";
import type { IApiTeam } from "api-types/src/Topics/Teams.ts";
import type { Optional, Snowflake } from "api-types/src/mod.ts";
import type { IApiGuild } from "api-types/src/Resources/Guild.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";

export interface IApiApplication {
	id: Snowflake;
	name: string;
	icon: Optional<string>;
	description: string;
	rpc_origins?: string[];
	bot_public: boolean;
	bot_require_code_grant: boolean;
	bot?: Partial<IApiUser>;
	terms_of_service_url?: string;
	privacy_policy_url?: string;
	owner?: Partial<IApiUser>;
	summary: string; // Deprecated
	verify_key: string;
	team: Optional<IApiTeam>;
	guild_id?: Snowflake;
	guild?: Partial<IApiGuild>;
	primary_sku_id?: Snowflake;
	slug?: string;
	cover_image?: string;
	flags?: number;
	approximate_guild_count?: number;
	redirect_uris?: string[];
	interactions_endpoint_url?: string;
	role_connections_verification_url?: string;
	tags?: string[];
	install_params?: IApiInstallParams;
	integration_types_config?: unknown; // TODO(wioenena) Implement this
	custom_install_url?: string;
}

export const enum ApiApplicationIntegrationType {
	GUILD_INSTALL = 0,
	USER_INSTALL = 1,
}

export interface IApiApplicationIntegrationTypeConfiguration {
	oauth2_install_params?: IApiInstallParams;
}

export const enum ApiApplicationFlag {
	APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE = 1 << 6,
	GATEWAY_PRESENCE = 1 << 12,
	GATEWAY_PRESENCE_LIMITED = 1 << 13,
	GATEWAY_GUILD_MEMBERS = 1 << 14,
	GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
	VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
	EMBEDDED = 1 << 17,
	GATEWAY_MESSAGE_CONTENT = 1 << 18,
	GATEWAY_MESSAGE_CONTENT_LIMITED = 1 << 19,
	APPLICATION_COMMAND_BADGE = 1 << 23,
}

export interface IApiInstallParams {
	scopes: ApiOAuth2Scope[];
	permissions: string;
}
