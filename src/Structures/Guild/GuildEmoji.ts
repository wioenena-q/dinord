import { defineReadonlyProperty, toObject } from '../../Utils/Utils.ts';
import { Emoji } from '../Emoji.ts';

import type { APIEmoji, Snowflake } from '../../deps.ts';
import { DiscordSnowflake } from '../DiscordSnowflake.ts';
import type { Guild } from './Guild.ts';

export class GuildEmoji extends Emoji {
  /**
   * Guild this emoji is in.
   */
  public declare readonly guild: Guild;
  /**
   * ID of this emoji.
   */
  public declare readonly id: Snowflake;
  /**
   * Created timestamp of this emoji.
   */
  public declare readonly createdTimestamp: number;

  protected declare _author: unknown | null; // TODO: Convert unknown to User
  protected declare _roles: Snowflake[];
  protected declare _requireColons: boolean;
  protected declare _managed: boolean;
  protected declare _animated: boolean;
  protected declare _available: boolean;

  public constructor(guild: Guild, data: APIEmoji) {
    super(guild.client, data);

    // Define readonly properties
    defineReadonlyProperty(this, 'guild', guild);
    defineReadonlyProperty(this, 'id', data.id!);
    defineReadonlyProperty(this, 'createdTimestamp', DiscordSnowflake.getTimestampFromId(this.id));

    this.patch(data);
  }

  public override patch(data: APIEmoji) {
    super.patch(data);
    this._roles = data.roles!;
    this._author = data.user ?? null;
    this._requireColons = data.require_colons!;
    this._managed = data.managed!;
    this._animated = data.animated!;
    this._available = data.available!;
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(
      toObject(this, ['guild', 'id', 'name', 'author', 'requireColons', 'managed', 'animated', 'available']),
      options
    );
  }

  /**
   * Roles allowed to use this emoji or null
   */
  public get roles() {
    return this.guild.roles.filter((r) => this._roles!.includes(r.id));
  }

  /**
   * User that created this emoji or null
   */
  public get author() {
    return this._author;
  }

  /**
   * Whether this emoji must be wrapped in colons
   */
  public get requireColons() {
    return this._requireColons;
  }

  /**
   * Whether this emoji is managed
   */
  public get managed() {
    return this._managed;
  }

  /**
   * Whether this emoji is animated
   */
  public get animated() {
    return this._animated;
  }

  /**
   * Whether this emoji can be used, may be false due to loss of Server Boosts
   */
  public get available() {
    return this._available;
  }
}
