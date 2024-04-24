export interface IApiDevice {
	type: ApiDeviceType;
	id: string;
	vendor: IApiVendor;
	model: IApiModel;
	related: string[];
	echo_cancellation?: boolean;
	noise_suppression?: boolean;
	automatic_gain_control?: boolean;
	hardware_mute?: boolean;
}

export interface IApiVendor {
	name: string;
	url: string;
}

export interface IApiModel {
	name: string;
	url: string;
}

export const enum ApiDeviceType {
	AUDIO_INPUT = "audioinput",
	AUDIO_OUTPUT = "audiooutput",
	VIDEO_INPUT = "videoinput",
}
