import { Collection } from '../../deps.ts';
import { Guild } from '../../Structures/Guild/Guild.ts';

/**
 * @class
 * @classdesc Base manager for guild managers
 */
export abstract class BaseManagerForGuild<K, V> extends Collection<K, V> {
  #guild: Guild;

  public constructor(guild: Guild) {
    super();
    this.#guild = guild;
  }

  /**
   *
   * Adds a new item to the collection
   * @param {unknown} data - The data to create the object with
   */
  public abstract add(data: unknown): void;

  public get guild() {
    return this.#guild;
  }
}
