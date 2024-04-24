export const enum ApiEncryptionMode {
	Normal = "xsalsa20_poly1305",
	Suffix = "xsalsa20_poly1305_suffix",
	Lite = "xsalsa20_poly1305_lite",
}

export interface IApiVoicePacket {
	"Version+Flags": number;
	PayloadType: number;
	Sequence: number;
	Timestamp: number;
	SSRC: number;
	EncryptedAudio: unknown; // TODO(wioenena) Implement and check this type
}

export const enum ApiSpeaking {
	Microphone = 1 << 0,
	Soundshare = 1 << 1,
	Priority = 1 << 2,
}

export interface IApiIPDiscovery {
	Type: number;
	Length: number;
	SSRC: number;
	Address: number;
	Port: number;
}
