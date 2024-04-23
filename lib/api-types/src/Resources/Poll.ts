import { IApiEmoji } from "./Emoji.ts";

export interface IApiPoll {
	question: IApiPollMedia;
	answers: IApiPollAnswer[]; // TODO(wioenena) Check is array
	expiry: string;
	allow_multiselect: boolean;
	layout_type: ApiLayoutType;
	results?: IApiPollResults;
}

export interface IApiPollCreateRequest
	extends Pick<IApiPoll, "question" | "answers" | "layout_type"> {
	duration: number;
	allow_multiselect: boolean;
}

export const enum ApiLayoutType {
	DEFAULT = 1,
}

export interface IApiPollMedia {
	text?: string;
	emoji?: Partial<IApiEmoji>;
}

export interface IApiPollAnswer {
	answer_id: number;
	poll_media: IApiPollMedia;
}

export interface IApiPollResults {
	is_finalized: boolean;
	answer_counts: IApiPollAnswerCount[]; // TODO(wioenena) Check is array
}

export interface IApiPollAnswerCount {
	id: number;
	count: number;
	me_voted: boolean;
}
