import type { Snowflake } from "../../mod.ts";
import type { Locale } from "../../Reference/Locale.ts";
import type { IApiApplicationCommandData } from "./ApplicationCommandData.ts";
import type { IApiMessageComponentData } from "./MessageComponentData.ts";
import type { IApiModalSubmitData } from "./ModalSubmitData.ts";

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
	version: number; // Read-only, always 1.
	message?: IApiMessage;
	app_permissions: string;
	locale?: Locale;
	guild_locale?: Locale; // If invoked in a guild.
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

export type IApiInteractionData =
	| IApiApplicationCommandData
	| IApiMessageComponentData
	| IApiModalSubmitData;
