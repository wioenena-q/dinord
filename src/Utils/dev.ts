// The utility functions here are for the development phase.

import { IntentFlags } from 'https://raw.githubusercontent.com/wioenena-q/dinord-api-types/master/src/api/v10/Intents.ts';

export function allIntents() {
  return [
    IntentFlags.Guilds,
    IntentFlags.GuildMembers,
    IntentFlags.GuildBans,
    IntentFlags.GuildEmojisAndStickers,
    IntentFlags.GuildIntegrations,
    IntentFlags.GuildWebhooks,
    IntentFlags.GuildInvites,
    IntentFlags.GuildMessageReactions,
    IntentFlags.GuildMessageTyping,
    IntentFlags.DirectMessages,
    IntentFlags.DirectMessageReactions,
    IntentFlags.DirectMessageTyping,
    IntentFlags.MessageContent,
    IntentFlags.GuildScheduledEvents,
    IntentFlags.AutoModerationConfiguration,
    IntentFlags.AutoModerationExecution
  ].reduce((p, c) => p + c);
}
