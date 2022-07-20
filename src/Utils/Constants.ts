export const WSS = 'wss://gateway.discord.gg/?v=10&encoding=json';
export const noop = () => {};

// Discord Gateway Opcodes. Ref https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes
export const enum OPCodes {
  DISPATCH,
  HEARTBEAT,
  IDENTIFY,
  PRESENCE_UPDATE,
  VOICE_STATE_UPDATE,
  RESUME = 0x6,
  RECONNECT,
  REQUEST_GUILD_MEMBERS,
  INVALID_SESSION,
  HELLO,
  HEARTBEAT_ACK
}

// Discord Gateway Close Event Codes. Ref https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes
export const enum GatewayCloseEventCodes {
  UNKNOWN_ERROR = 4000,
  UNKNOWN_OPCODE = 4001,
  DECODE_ERROR = 4002,
  NOT_AUTHENTICATED = 4003,
  AUTHENTICATION_FAILED = 4004,
  ALREADY_AUTHENTICATED = 4005,
  INVALID_SEQ = 4007,
  RATE_LIMITED = 4008,
  SESSION_TIMED_OUT = 4009,
  INVALID_SHARD = 4010,
  SHARDING_REQUIRED = 4011,
  INVALID_API_VERSION = 4012,
  INVALID_INTENTS = 4013,
  DISALLOWED_INTENTS = 4014
}

// Discord Gateway Intents. Ref https://discord.com/developers/docs/topics/gateway#gateway-intents
export const enum IntentFlags {
  GUILDS = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_BANS = 1 << 2,
  GUILD_EMOJIS_AND_STICKERS = 1 << 3,
  GUILD_INTEGRATIONS = 1 << 4,
  GUILD_WEBHOOKS = 1 << 5,
  GUILD_INVITES = 1 << 6,
  GUILD_VOICE_STATES = 1 << 7,
  GUILD_PRESENCES = 1 << 8,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  GUILD_MESSAGE_TYPING = 1 << 11,
  DIRECT_MESSAGES = 1 << 12,
  DIRECT_MESSAGE_REACTIONS = 1 << 13,
  DIRECT_MESSAGE_TYPING = 1 << 14,
  MESSAGE_CONTENT = 1 << 15,
  GUILD_SCHEDULED_EVENTS = 1 << 16,
  AUTO_MODERATION_CONFIGURATION = 1 << 20,
  AUTO_MODERATION_EXECUTION = 1 << 21,
  ALL = GUILDS |
    GUILD_MEMBERS |
    GUILD_BANS |
    GUILD_EMOJIS_AND_STICKERS |
    GUILD_INTEGRATIONS |
    GUILD_WEBHOOKS |
    GUILD_INVITES |
    GUILD_VOICE_STATES |
    GUILD_PRESENCES |
    GUILD_MESSAGES |
    GUILD_MESSAGE_REACTIONS |
    GUILD_MESSAGE_TYPING |
    MESSAGE_CONTENT |
    GUILD_SCHEDULED_EVENTS |
    AUTO_MODERATION_CONFIGURATION |
    AUTO_MODERATION_EXECUTION
}

export const enum ClientEvents {
  READY = 'ready',
  GUILD_CREATE = 'guildCreate',
  GUILD_DELETE = 'guildDelete'
}
