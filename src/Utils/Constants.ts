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
  UNKNOWN_OPCODE,
  DECODE_ERROR,
  NOT_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ALREADY_AUTHENTICATED,
  INVALID_SEQ = 4007,
  RATE_LIMITED,
  SESSION_TIMED_OUT,
  INVALID_SHARD,
  SHARDING_REQUIRED,
  INVALID_API_VERSION,
  INVALID_INTENTS,
  DISALLOWED_INTENTS
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

export const enum ChannelTypes {
  GUILD_TEXT = 0,
  DM,
  GUILD_VOICE,
  GROUP_DM,
  GUILD_CATEGORY,
  GUILD_NEWS,
  GUILD_NEWS_THREAD = 10,
  GUILD_PUBLIC_THREAD,
  GUILD_PRIVATE_THREAD,
  GUILD_STAGE_VOICE,
  GUILD_DIRECTORY,
  GUILD_FORUM
}

export const enum PermissionOverwriteType {
  ROLE,
  MEMBER
}
