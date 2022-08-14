import { defineReadonlyProperty, toObject } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';

import type { APISticker, Snowflake, StickerFormatType, StickerType } from '../../deps.ts';
import { DiscordSnowflake } from '../DiscordSnowflake.ts';
import type { Guild } from './Guild.ts';

export class GuildSticker extends Base {
  /**
   * Guild ID this sticker is in.
   */
  public declare readonly guildId: Snowflake;
  /**
   * Guild this sticker is in.
   */
  public declare readonly guild: Guild;
  /**
   * Sticker ID.
   */
  public declare readonly id: Snowflake;
  /**
   * Created timestamp of this sticker.
   */
  public declare readonly createdTimestamp: number;
  protected declare _packId: Snowflake | null;
  protected declare _name: string;
  protected declare _description: string | null;
  protected declare _tags: string;
  protected declare _type: StickerType;
  protected declare _formatType: StickerFormatType;
  protected declare _available: boolean;
  protected declare _user: unknown | null; // TODO: Convert unknown to User
  protected declare _sortValue: number | null;

  public constructor(guild: Guild, data: APISticker) {
    super(guild.client);

    // Define readonly properties
    defineReadonlyProperty(this, 'id', data.id);
    defineReadonlyProperty(this, 'guildId', data.guild_id!);
    defineReadonlyProperty(this, 'guild', guild);
    defineReadonlyProperty(this, 'createdTimestamp', DiscordSnowflake.getTimestampFromId(this.id));

    this.patch(data);
  }

  public patch(data: APISticker): void {
    this._packId = data.pack_id ?? null;
    this._name = data.name;
    this._description = data.description;
    this._tags = data.tags;
    this._type = data.type;
    this._formatType = data.format_type;
    this._available = data.available ?? false;
    this._user = data.user ?? null;
    this._sortValue = data.sort_value ?? null;
  }

  /**
   * TODO: Implement
   */
  public toJSON() {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Implement
   */
  public toString() {
    throw new Error('Method not implemented.');
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(
      toObject(this, [
        'guildId',
        'guild',
        'id',
        'packId',
        'name',
        'description',
        'tags',
        'type',
        'formatType',
        'available',
        'user',
        'sortValue'
      ]),
      options
    );
  }

  /**
   * For standard stickers, id of the pack the sticker is from.
   */
  public get packId() {
    return this._packId;
  }

  /**
   * Name of this sticker.
   */
  public get name() {
    return this._name;
  }

  /**
   * Description of this sticker.
   */
  public get description() {
    return this._description;
  }

  /**
   * 	Autocomplete/Suggestion tags for the sticker. (max 200 characters)
   */
  public get tags() {
    return this._tags;
  }

  /**
   * Type of this sticker.
   */
  public get type() {
    return this._type;
  }

  /**
   * Format type of this sticker.
   */
  public get formatType() {
    return this._formatType;
  }

  /**
   * Whether this guild sticker can be used, may be false due to loss of Server Boosts.
   */
  public get available() {
    return this._available;
  }

  /**
   * The user that uploaded the guild sticker.
   */
  public get user() {
    return this._user;
  }

  /**
   * The standard sticker's sort order within its pack
   */
  public get sortValue() {
    return this._sortValue;
  }
}
