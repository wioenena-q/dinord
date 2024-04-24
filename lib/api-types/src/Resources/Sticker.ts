import type { Optional, Snowflake } from "../mod.ts";

export interface IApiSticker {
	id: Snowflake;
	pack_id?: Snowflake;
	name: string;
	description: Optional<string>;
	tags: string;
	asset?: string;
	type: ApiStickerType;
	format_type: ApiStickerFormatType;
	available?: boolean;
	guild_id?: Snowflake;
	user?: IApiUser;
	sort_value?: number;
}

export const enum ApiStickerType {
	STANDARD = 1,
	GUILD = 2,
}

export const enum ApiStickerFormatType {
	PNG = 1,
	APNG = 2,
	LOTTIE = 3,
	GIF = 4,
}

export interface IApiStickerItem {
	id: Snowflake;
	name: string;
	format_type: ApiStickerFormatType;
}

export interface IApiStickerPack {
	id: Snowflake;
	stickers: IApiSticker[];
	name: string;
	sku_id: Snowflake;
	cover_sticker_id?: Snowflake;
	description: string;
	banner_asset_id?: Snowflake;
}
