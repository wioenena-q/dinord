import type { ApiLocale } from "../Reference/Locale.ts";

export interface IApiApplicationRoleConnectionMetadata {
	type: ApiApplicationRoleConnectionMetadataType;
	key: string;
	name: string;
	name_localizations?: ApiLocale; // TODO(wioenena) Check this type
	description: string;
	description_localizations?: ApiLocale; // TODO(wioenena) Check this type
}

export const enum ApiApplicationRoleConnectionMetadataType {
	INTEGER_LESS_THAN_OR_EQUAL = 1,
	INTEGER_GREATER_THAN_OR_EQUAL = 2,
	INTEGER_EQUAL = 3,
	INTEGER_NOT_EQUAL = 4,
	DATETIME_LESS_THAN_OR_EQUAL = 5,
	DATETIME_GREATER_THAN_OR_EQUAL = 6,
	BOOLEAN_EQUAL = 7,
	BOOLEAN_NOT_EQUAL = 8,
}
