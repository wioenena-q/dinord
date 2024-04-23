import { Snowflake } from "../mod.ts";

export const enum ApiComponentType {
	ActionRow = 1,
	Button = 2,
	StringSelect = 3,
	TextInput = 4,
	UserSelect = 5,
	RoleSelect = 6,
	MentionableSelect = 7,
	ChannelSelect = 8,
}

export interface IApiButton {
	type: ApiComponentType.Button;
	style: ApiButtonStyle;
	label?: string;
	emoji?: Partial<IApiEmoji>;
	custom_id?: string;
	url?: string;
	disabled?: boolean;
}

export interface IApiSelectMenu {
	type:
		| ApiComponentType.StringSelect
		| ApiComponentType.UserSelect
		| ApiComponentType.RoleSelect
		| ApiComponentType.MentionableSelect
		| ApiComponentType.ChannelSelect;
	custom_id: string;
	options?: IApiSelectOption[];
	channel_types?: ApiChannelType[];
	placeholder?: string;
	default_values?: IApiSelectDefaultValue[];
	min_values?: number;
	max_values?: number;
	disabled?: boolean;
}

export interface IApiSelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: Parti<IApiEmoji>;
	default?: boolean;
}

export interface IApiSelectDefaultValue {
	id: Snowflake;
	type: string;
}

export interface IApiSelectMenuResolved {} // TODO(wioenena) Implement this

export interface IApiTextInput {
	type: ApiComponentType.TextInput;
	custom_id: string;
	style: ApiTextInputStyle;
	label: string;
	min_length?: number;
	max_length?: number;
	required?: boolean;
	value?: string;
	placeholder?: string;
}

export const enum ApiTextInputStyle {
	Short = 1,
	Paragraph = 2,
}
