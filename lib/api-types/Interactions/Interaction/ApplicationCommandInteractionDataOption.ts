export interface IApiApplicationCommandInteractionDataOption {
	name: string;
	type: ApiApplicationCommandOptionType;
	value?: string | number | boolean;
	options?: IApiApplicationCommandInteractionDataOption[];
	focused?: boolean;
}
