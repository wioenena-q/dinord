export enum Discord {
    GATEWAY = "wss://gateway.discord.gg/?v=9&encoding=json",
    API = "https://discord.com/api/v9",
    EPOCH = 1420070400000
}

export enum OPCodes {
    DISPATCH,
    HEARTBEAT,
    IDENTIFY,
    PRESENCE_UPDATE,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT,
    REQUEST_GUILD_MEMBERS,
    INVALID_SESSION,
    HELLO,
    HEARTBEAT_ACK
}

export enum ClientEvents {
    READY = "ready",
    GUILD_CREATE = "guildCreate"
}
