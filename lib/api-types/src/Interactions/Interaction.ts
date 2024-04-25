import type { IApiEntitlement } from "api-types/src/Monetization/Entitlement.ts";
import type { ApiLocale } from "api-types/src/Reference/Locale.ts";
import type {
	IApiAllowedMentions,
	IApiAttachment,
	IApiChannel,
	IApiEmbed,
	IApiMessage,
} from "api-types/src/Resources/Channel.ts";
import type { IApiGuildMember } from "api-types/src/Resources/Guild.ts";
import type { IApiPollCreateRequest } from "api-types/src/Resources/Poll.ts";
import type { IApiUser } from "api-types/src/Resources/User.ts";
import type { IApiRole } from "api-types/src/Topics/Permissions.ts";
import type { Snowflake } from "api-types/src/mod.ts";
import type {
	ApiApplicationCommandOptionType,
	ApiApplicationCommandType,
	IApiApplicationCommandOptionChoice,
} from "api-types/src/Interactions/ApplicationCommands.ts";
import type {
	ApiComponentType,
	IApiMessageComponents,
	IApiSelectOption,
} from "api-types/src/Interactions/MessageComponents.ts";

export interface IApiInteraction {
	id: Snowflake;
	application_id: Snowflake;
	type: ApiInteractionType;
	data?: IApiInteractionData;
	guild_id?: Snowflake;
	channel?: Partial<IApiChannel>;
	channel_id?: Snowflake;
	member?: IApiGuildMember;
	user?: IApiUser;
	token: string;
	version: number; // Read-only property, always 1
	message?: IApiMessage;
	app_permissions: string;
	locale?: ApiLocale;
	guild_locale?: string;
	entitlements: IApiEntitlement[];
	authorizing_integration_owners: unknown; // TODO(wioenena) Implement this type.
	context?: ApiInteractionContextType;
}

export const enum ApiInteractionType {
	PING = 1,
	APPLICATION_COMMAND = 2,
	MESSAGE_COMPONENT = 3,
	APPLICATION_COMMAND_AUTOCOMPLETE = 4,
	MODAL_SUBMIT = 5,
}

export const enum ApiInteractionContextType {
	GUILD = 0,
	BOT_DM = 1,
	PRIVATE_CHANNEL = 2,
}

export interface IApiApplicationCommandData {
	id: Snowflake;
	name: string;
	type: ApiApplicationCommandType;
	resolved?: IApiResolvedData;
	options?: IApiApplicationCommandInteractionDataOption;
	guild_id?: Snowflake;
	target_id?: Snowflake;
}

export interface IApiMessageComponentData {
	custom_id: string;
	component_type: ApiComponentType;
	values?: IApiSelectOption[];
	resolved?: IApiResolvedData;
}

export interface IApiModalSubmitData {
	custom_id: string;
	components: IApiMessageComponents[];
}

export type IApiInteractionData =
	| IApiApplicationCommandData
	| IApiMessageComponentData
	| IApiModalSubmitData;

export interface IApiResolvedData {
	users?: Record<Snowflake, IApiUser>;
	members?: Record<Snowflake, Partial<IApiGuildMember>>; // Without user, deaf and mute fields
	roles?: Record<Snowflake, IApiRole>;
	channels?: Record<Snowflake, Partial<IApiChannel>>; // Only id, name, type and permissions fields
	messages?: Record<Snowflake, Partial<IApiMessage>>;
	attachments?: Record<Snowflake, IApiAttachment>;
}

export interface IApiApplicationCommandInteractionDataOption {
	name: string;
	type: ApiApplicationCommandOptionType;
	value?: string | number | boolean;
	options?: IApiApplicationCommandInteractionDataOption[];
	focused?: boolean;
}

export interface IApiMessageInteraction {
	id: Snowflake;
	type: ApiInteractionType;
	name: string;
	user: IApiUser;
	member?: Partial<IApiGuildMember>;
}

export interface IApiInteractionResponse {
	type: ApiInteractionCallbackType;
	data?: IApiInteractionCallbackData;
}

export const enum ApiInteractionCallbackType {
	PONG = 1,
	CHANNEL_MESSAGE_WITH_SOURCE = 4,
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
	DEFERRED_UPDATE_MESSAGE = 6,
	UPDATE_MESSAGE = 7,
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
	MODAL = 9,
	PREMIUM_REQUIRED = 1,
}

export interface IApiInteractionCallbackMessageData {
	tts?: boolean;
	content?: string;
	embeds?: IApiEmbed[];
	allowed_mentions?: IApiAllowedMentions;
	flags?: number;
	components?: IApiMessageComponents[];
	attachments?: Partial<IApiAttachment>[];
	poll?: IApiPollCreateRequest;
}

export interface IApiInteractionCallbackAutocompleteData {
	choices: IApiApplicationCommandOptionChoice[];
}

export interface IApiInteractionCallbackModalData {
	custom_id: string;
	title: string;
	components: IApiMessageComponents[];
}

export type IApiInteractionCallbackData =
	| IApiInteractionCallbackMessageData
	| IApiInteractionCallbackAutocompleteData
	| IApiInteractionCallbackModalData;
