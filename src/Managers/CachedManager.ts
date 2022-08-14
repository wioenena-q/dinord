import { Collection } from '../deps.ts';
import { defineReadonlyProperty } from '../Utils/Utils.ts';

/**
 * @class
 * @classdesc Base class for cache managers.
 */
export class CachedManager<K, V> {
  public declare readonly cache: Collection<K, V>;

  public constructor() {
    defineReadonlyProperty(this, 'cache', new Collection());
  }
}
