import { IConstructor } from './Types.ts';

export class Utils extends null {
  public static getTimestampFromId(id: string): number {
    const bId = BigInt(id);
    return Number((bId >> 22n) + 1420070400000n);
  }
}
