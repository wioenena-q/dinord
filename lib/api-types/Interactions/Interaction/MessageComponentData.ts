import { IApiResolvedData } from "./ResolvedData.ts";

export interface IApiMessageComponentData {
	custom_id: string;
	component_type: ApiComponentType;
	values?: IApiSelectOption[];
	resolved?: IApiResolvedData;
}
