export const enum ApiGatewayOpcode {
	Dispatch = 0,
	Heartbeat = 1,
	Identify = 2,
	PresenceUpdate = 3,
	VoiceStateUpdate = 4,
	Resume = 6,
	Reconnect = 7,
	RequestGuildMembers = 8,
	InvalidSession = 9,
	Hello = 10,
	HeartbeatACK = 11,
}

export const enum ApiGatewayCloseEventCode {
	UnknownError = 4000,
	UnknownOpcode = 4001,
	DecodeError = 4002,
	NotAuthenticated = 4003,
	AuthenticationFailed = 4004,
	AlreadyAuthenticated = 4005,
	InvalidSeq = 4007,
	RateLimited = 4008,
	SessionTimedOut = 4009,
	InvalidShard = 4010,
	ShardingRequired = 4011,
	InvalidAPIVersion = 4012,
	InvalidIntent = 4013,
	DisallowedIntent = 4014,
}

export const enum ApiVoiceOpcode {
	Identify = 0,
	SelectProtocol = 1,
	Ready = 2,
	Heartbeat = 3,
	SessionDescription = 4,
	Speaking = 5,
	HeartbeatACK = 6,
	Resume = 7,
	Hello = 8,
	Resumed = 9,
	ClientDisconnect = 13,
}

export const enum ApiVoiceCloseEventCode {
	UnknownOpcode = 4001,
	FailedToDecodePayload = 4002,
	NotAuthenticated = 4003,
	AuthenticationFailed = 4004,
	AlreadyAuthenticated = 4005,
	SessionNoLongerValid = 4006,
	SessionTimeout = 4009,
	ServerNotFound = 4011,
	UnknownProtocol = 4012,
	Disconnected = 4014,
	VoiceServerCrashed = 4015,
	UnknownEncryptionMode = 4016,
}

export const enum ApiHTTPResponseCode {
	OK = 200,
	Created = 201,
	NoContent = 204,
	NotModified = 304,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	TooManyRequests = 429,
	GatewayUnavailable = 502,
	//ServerError	=5xx,
}

export const enum ApiRPCErrorCode {
	UnknownError = 1000,
	InvalidPayload = 4000,
	InvalidCommand = 4002,
	InvalidGuild = 4003,
	InvalidEvent = 4004,
	InvalidChannel = 4005,
	InvalidPermissions = 4006,
	InvalidClientID = 4007,
	InvalidOrigin = 4008,
	InvalidToken = 4009,
	InvalidUser = 4010,
	OAuth2Error = 5000,
	SelectChannelTimedOut = 5001,
	GET_GUILDTimedOut = 5002,
	SelectVoiceForceRequired = 5003,
	CaptureShortcutAlreadyListening = 5004,
}

export const enum ApiRPCCloseEventCode {
	InvalidClientID = 4000,
	InvalidOrigin = 4001,
	RateLimited = 4002,
	TokenRevoked = 4003,
	InvalidVersion = 4004,
	InvalidEncoding = 4005,
}
