import { Base } from '../Base.ts';

import type { APIRole, Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import { toObject } from '../../Utils/Utils.ts';
import { PermissionBitField } from '../PermissionBitField.ts';
import { Guild } from './Guild.ts';

/**
 * @class
 * @classdesc Discord API Role structure
 * @extends {Base}
 */
export class Role extends Base {
  private declare _guild: Guild;
  /**
   * ID of this role.
   */
  public readonly id!: Snowflake;
  protected declare _name: string;
  protected declare _color: number;
  protected declare _hoist: boolean;
  protected declare _icon: string | null;
  protected declare _unicodeEmoji: string | null;
  protected declare _position: number;
  protected declare _permissions: PermissionBitField;
  protected declare _managed: boolean;
  protected declare _mentionable: boolean;
  protected declare _tags: Readonly<RoleTags> | null;

  public constructor(guild: Guild, data: APIRole) {
    super(guild.client);

    Object.defineProperties(this, {
      id: { value: data.id },
      _guild: { value: guild }
    });

    this.patch(data);
  }

  /**
   * TODO: Implement
   * @param data - API Role data
   */
  public patch(data: APIRole): void {
    this._name = data.name;
    this._color = data.color;
    this._hoist = data.hoist;
    this._icon = data.icon ?? null;
    this._unicodeEmoji = data.unicode_emoji ?? null;
    this._position = data.position;
    this._permissions = new PermissionBitField(BigInt(data.permissions));
    this._managed = data.managed;
    this._mentionable = data.mentionable;
    if ('tags' in data) {
      const tags: RoleTags = {};
      if ('bot_id' in data.tags!) tags.botId = data.tags.bot_id;
      if ('integration_id' in data.tags!) tags.integrationId = data.tags.integration_id;
      if ('premium_subscriber' in data.tags!) tags.premiumSubscriber = data.tags.premium_subscriber;
      this._tags = Object.freeze(tags);
    } else this._tags = null;
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(
      toObject(this, [
        'guild',
        'id',
        'name',
        'color',
        'hoist',
        'icon',
        'unicodeEmoji',
        'position',
        'permissions',
        'managed',
        'mentionable',
        'tags'
      ]),
      options
    );
  }

  /**
   * TODO: Implement
   */
  public toJSON(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Implement
   */
  public toString(): string {
    throw new Error('Method not implemented.');
  }

  /**
   * Guild this role is in.
   */
  public get guild() {
    return this._guild;
  }

  /**
   * Name of the this role.
   */
  public get name() {
    return this._name;
  }

  /**
   * Color of the this role.
   */
  public get color() {
    return this._color;
  }

  /**
   * Hex color of the this role.
   */
  public get hexColor() {
    return `#${this._color.toString(16).padStart(6, '0')}`;
  }

  /**
   * Whether to display role members separately from online members.
   */
  public get hoist() {
    return this._hoist;
  }

  /**
   * The icon hash of the role, if any.
   */
  public get icon() {
    return this._icon;
  }

  /**
   * Unicode emoji of the role, if any.
   */
  public get unicodeEmoji() {
    return this._unicodeEmoji;
  }

  /**
   * Position of the role.
   */
  public get position() {
    return this._position;
  }

  /**
   * Permissions of this role.
   */
  public get permissions() {
    return this._permissions;
  }

  /**
   * Whether this role is managed by an integration.
   */
  public get managed() {
    return this._managed;
  }

  /**
   * Whether this role is mentionable.
   */
  public get mentionable() {
    return this._mentionable;
  }

  /**
   * Tags of this role.
   */
  public get tags() {
    return this._tags;
  }
}

export interface RoleTags {
  botId?: Snowflake;
  integrationId?: Snowflake;
  premiumSubscriber?: null;
}
