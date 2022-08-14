import { assertObjectMatch } from 'https://deno.land/std/testing/asserts.ts';
import { DiscordSnowflake } from '../../src/Structures/DiscordSnowflake.ts';

Deno.test('DiscordSnowflake.parseId()', () => {
  /**
   * @see {@link https://discord.com/developers/docs/reference#snowflakes}
   */
  const id = '175928847299117063';
  const parsed = DiscordSnowflake.parseId(id);

  assertObjectMatch(parsed, {
    timestamp: 1462015105796,
    workerId: 1,
    processId: 0,
    increment: 7
  });
});
