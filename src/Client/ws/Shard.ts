import { ToObject } from '../../Utils/Types.ts';
import { toObject } from '../../Utils/Utils.ts';

/**
 * @class
 * @implements {ToObject}
 */
export class Shard implements ToObject {
  /**
   * TODO: Implement
   * @returns {Record<string,unknown>}
   */
  toObject(): Record<string, unknown> {
    return toObject(this, []);
  }
}
