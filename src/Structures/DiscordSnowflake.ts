import { Snowflake } from '../deps.ts';

export class DiscordSnowflake extends null {
  public declare static readonly DISCORD_EPOCH: bigint;

  /**
   *
   * Parse a Discord snowflake ID
   * @param id - Discord snowflake id
   */
  public static parseId(id: Snowflake) {
    const _id = BigInt(id);
    return {
      timestamp: Number((_id >> 22n) + this.DISCORD_EPOCH),
      workerId: Number((_id & 0x3e0000n) >> 17n),
      processId: Number((_id & 0x1f000n) >> 12n),
      increment: Number(_id & 0xfffn)
    };
  }

  /**
   *
   * Return timestamp from a Discord snowflake ID
   * @param id - Discord snowflake id
   */
  public static getTimestampFromId(id: string) {
    return this.parseId(id).timestamp;
  }
}

Object.defineProperty(DiscordSnowflake, 'DISCORD_EPOCH', {
  value: 1420070400000n,
  writable: false
});

/**
 * @typedef {Object} ParsedSnowflake
 * @property {number} timestamp - Timestamp of snowflake
 * @property {number} workerId - Worker ID of snowflake
 * @property {number} processId - Process ID of snowflake
 * @property {number} increment - Increment of snowflake
 */
export interface ParsedSnowflake {
  timestamp: number;
  workerId: number;
  processId: number;
  increment: number;
}
