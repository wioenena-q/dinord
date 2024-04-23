import type { ApiLocale } from "../Reference/Locale.ts";
import type { Optional, Snowflake } from "../mod.ts";

export interface IApiApplicationCommand {
	id: Snowflake;
	type?: ApiApplicationCommandType;
	application_id: Snowflake;
	guild_id?: Snowflake;
	name: string;
	name_localizations?: Optional<ApiLocale>; // TODO(wioenena) Check this type
	description: string;
	description_localizations?: Optional<ApiLocale>; // TODO(wioenena) Check this type
	options?: IApiApplicationCommandOption[];
	default_member_permissions: Optional<string>;
	dm_permission?: boolean; // Deprecated. Use contexts instead
	default_permission?: Optional<boolean>;
	nsfw?: boolean;
	integration_types?: ApiApplicationIntegrationType[]; // TODO(wioenena) Check this type is array
	contexts?: Optional<IApiInteractionContextType[]>;
	version: Snowflake;
}

export const enum ApiApplicationCommandType {
	CHAT_INPUT = 1,
	USER = 2,
	MESSAGE = 3,
}

export interface IApiApplicationCommandOption {
	type: ApiApplicationCommandOptionType;
	name: string;
	name_localizations?: Optional<ApiLocale>; // TODO(wioenena) Check this type
	description: string;
	description_localizations?: Optional<ApiLocale>; // TODO(wioenena) Check this type
	required?: boolean;
	choices?: IApiApplicationCommandOptionChoice[];
	options?: IApiApplicationCommandOption[];
	channel_types?: ApiChannelType[];
	min_value?: number;
	max_value?: number;
	min_length?: number;
	max_length?: number;
	autocomplete?: boolean;
}

export const enum ApiApplicationCommandOptionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
	MENTIONABLE = 9,
	NUMBER = 10,
	ATTACHMENT = 11,
}

export interface IApiApplicationCommandOptionChoice {
	name: string;
	name_localizations?: Optional<ApiLocale>; // TODO(wioenena) Check this type
	value: string | number | unknown;
}

export interface IApiGuildApplicationCommandPermissions {
	id: Snowflake;
	application_id: Snowflake;
	guild_id: Snowflake;
	permissions: IApiApplicationCommandPermissions[];
}

export interface IApiApplicationCommandPermissions {
	id: Snowflake;
	type: ApiApplicationCommandPermissionType;
	permission: boolean;
}

// TODO(wioenena) Application Command Permissions Constants

export const enum ApiApplicationCommandPermissionType {
	ROLE = 1,
	USER = 2,
	CHANNEL = 3,
}
