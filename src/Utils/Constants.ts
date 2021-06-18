export enum Discord {
    GATEWAY="wss://gateway.discord.gg/?v=9&encoding=json",
    API="https://discord.com/api/v9"
}

export enum OPCodes {
    DISPATCH,
    HEARTBEAT,
    IDENTIFY,
    PRESENCE_UPDATE,
    VOICE_STATE_UPDATE,
    RESUME,
    RECONNECT,
    REQUEST_GUILD_MEMBERS,
    INVALID_SESSION,
    HELLO,
    HEARTBEAT_ACK
}
