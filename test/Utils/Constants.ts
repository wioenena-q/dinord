import { assertEquals } from 'https://deno.land/std@0.149.0/testing/asserts.ts';
import {
  ChannelTypes,
  ClientEvents,
  GatewayCloseEventCodes,
  IntentFlags,
  OPCodes
} from '../../src/Utils/Constants.ts';

Deno.test('OPCodes', () => {
  assertEquals(OPCodes.DISPATCH, 0);
  assertEquals(OPCodes.HEARTBEAT, 1);
  assertEquals(OPCodes.IDENTIFY, 2);
  assertEquals(OPCodes.PRESENCE_UPDATE, 3);
  assertEquals(OPCodes.VOICE_STATE_UPDATE, 4);
  assertEquals(OPCodes.RESUME, 6);
  assertEquals(OPCodes.RECONNECT, 7);
  assertEquals(OPCodes.REQUEST_GUILD_MEMBERS, 8);
  assertEquals(OPCodes.INVALID_SESSION, 9);
  assertEquals(OPCodes.HELLO, 10);
  assertEquals(OPCodes.HEARTBEAT_ACK, 11);
});

Deno.test('GatewayCloseEventCodes', () => {
  assertEquals(GatewayCloseEventCodes.UNKNOWN_ERROR, 4000);
  assertEquals(GatewayCloseEventCodes.UNKNOWN_OPCODE, 4001);
  assertEquals(GatewayCloseEventCodes.DECODE_ERROR, 4002);
  assertEquals(GatewayCloseEventCodes.NOT_AUTHENTICATED, 4003);
  assertEquals(GatewayCloseEventCodes.AUTHENTICATION_FAILED, 4004);
  assertEquals(GatewayCloseEventCodes.ALREADY_AUTHENTICATED, 4005);
  assertEquals(GatewayCloseEventCodes.INVALID_SEQ, 4007);
  assertEquals(GatewayCloseEventCodes.RATE_LIMITED, 4008);
  assertEquals(GatewayCloseEventCodes.SESSION_TIMED_OUT, 4009);
  assertEquals(GatewayCloseEventCodes.INVALID_SHARD, 4010);
  assertEquals(GatewayCloseEventCodes.SHARDING_REQUIRED, 4011);
  assertEquals(GatewayCloseEventCodes.INVALID_API_VERSION, 4012);
  assertEquals(GatewayCloseEventCodes.INVALID_INTENTS, 4013);
  assertEquals(GatewayCloseEventCodes.DISALLOWED_INTENTS, 4014);
});

Deno.test('IntentFlags', () => {
  assertEquals(IntentFlags.GUILDS, 1 << 0);
  assertEquals(IntentFlags.GUILD_MEMBERS, 1 << 1);
  assertEquals(IntentFlags.GUILD_BANS, 1 << 2);
  assertEquals(IntentFlags.GUILD_EMOJIS_AND_STICKERS, 1 << 3);
  assertEquals(IntentFlags.GUILD_INTEGRATIONS, 1 << 4);
  assertEquals(IntentFlags.GUILD_WEBHOOKS, 1 << 5);
  assertEquals(IntentFlags.GUILD_INVITES, 1 << 6);
  assertEquals(IntentFlags.GUILD_VOICE_STATES, 1 << 7);
  assertEquals(IntentFlags.GUILD_PRESENCES, 1 << 8);
  assertEquals(IntentFlags.GUILD_MESSAGES, 1 << 9);
  assertEquals(IntentFlags.GUILD_MESSAGE_REACTIONS, 1 << 10);
  assertEquals(IntentFlags.GUILD_MESSAGE_TYPING, 1 << 11);
  assertEquals(IntentFlags.DIRECT_MESSAGES, 1 << 12);
  assertEquals(IntentFlags.DIRECT_MESSAGE_REACTIONS, 1 << 13);
  assertEquals(IntentFlags.DIRECT_MESSAGE_TYPING, 1 << 14);
  assertEquals(IntentFlags.MESSAGE_CONTENT, 1 << 15);
  assertEquals(IntentFlags.GUILD_SCHEDULED_EVENTS, 1 << 16);
  assertEquals(IntentFlags.AUTO_MODERATION_CONFIGURATION, 1 << 20);
  assertEquals(IntentFlags.AUTO_MODERATION_EXECUTION, 1 << 21);
  assertEquals(IntentFlags.ALL, 3248127);
});

Deno.test('ClientEvents', () => {
  assertEquals(ClientEvents.READY, 'ready');
  assertEquals(ClientEvents.GUILD_CREATE, 'guildCreate');
  assertEquals(ClientEvents.GUILD_DELETE, 'guildDelete');
});

Deno.test('ChannelTypes', () => {
  assertEquals(ChannelTypes.GUILD_TEXT, 0);
  assertEquals(ChannelTypes.DM, 1);
  assertEquals(ChannelTypes.GUILD_VOICE, 2);
  assertEquals(ChannelTypes.GROUP_DM, 3);
  assertEquals(ChannelTypes.GUILD_CATEGORY, 4);
  assertEquals(ChannelTypes.GUILD_NEWS, 5);
  assertEquals(ChannelTypes.GUILD_NEWS_THREAD, 10);
  assertEquals(ChannelTypes.GUILD_PUBLIC_THREAD, 11);
  assertEquals(ChannelTypes.GUILD_PRIVATE_THREAD, 12);
  assertEquals(ChannelTypes.GUILD_STAGE_VOICE, 13);
  assertEquals(ChannelTypes.GUILD_DIRECTORY, 14);
  assertEquals(ChannelTypes.GUILD_FORUM, 15);
});
