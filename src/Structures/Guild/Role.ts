import { defineReadonlyProperty, toObject } from '../../Utils/Utils.ts';
import { Base } from '../Base.ts';
import { Color, type ColorResolvable } from '../Color.ts';
import { DiscordSnowflake } from '../DiscordSnowflake.ts';
import { PermissionBitField } from '../PermissionBitField.ts';

import type { APIRole, Snowflake } from '../../deps.ts';
import type { RoleEditData } from '../../Managers/Guild/GuildRoleManager.ts';
import type { Guild } from './Guild.ts';

/**
 * @class
 * @classdesc Discord API Role structure
 * @extends {Base}
 */
export class Role extends Base {
  /**
   * Guild this role is in.
   */
  public declare readonly guild: Guild;
  /**
   * ID of this role.
   */
  public declare readonly id: Snowflake;
  /**
   * Created timestamp of this role.
   */
  public declare readonly createdTimestamp: number;
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
  protected declare _editable: boolean;

  public constructor(guild: Guild, data: APIRole) {
    super(guild.client);

    // Define readonly properties
    defineReadonlyProperty(this, 'guild', guild);
    defineReadonlyProperty(this, 'id', data.id);
    defineReadonlyProperty(this, 'createdTimestamp', DiscordSnowflake.getTimestampFromId(this.id));

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

    this._editable = this.id !== this.guild.id && !this._managed;
  }

  /**
   *
   * Set name of this role.
   * @param name - Name of the role.
   * @param [reason] - Reason for changing the name value, if any
   */
  public setName(name: string, reason?: string) {
    return this.edit({ name }, reason);
  }

  /**
   *
   * Set permissions of this role.
   * @param permissions - Permissions to set for the role.
   * @param [reason] - Reason for changing the permissions value, if any
   */
  public setPermissions(permissions: string, reason?: string) {
    return this.edit({ permissions }, reason);
  }

  /**
   *
   * Set color of this role.
   * @param color - Color to set for the role.
   * @param [reason] - Reason for changing the color value, if any
   */
  public setColor(color: ColorResolvable, reason?: string) {
    return this.edit({ color }, reason);
  }

  /**
   *
   * Set hoist of this role.
   * @param hoist - Whether the role should be displayed separately in the sidebar.
   * @param [reason] - Reason for changing the hoist value, if any
   * @returns
   */
  public setHoist(hoist: boolean, reason?: string) {
    return this.edit({ hoist }, reason);
  }

  /**
   *
   * Set icon of this role.
   * @param icon - Icon to set for the role.
   * @param [reason] - Reason for changing the icon value, if any
   */
  public setIcon(icon: unknown, reason?: string) {
    return this.edit({ icon }, reason);
  }

  /**
   *
   * Set unicode emoji of this role.
   * @param unicodeEmoji - Unicode emoji to set for the role.
   * @param [reason] - Reason for changing the unicode emoji value, if any
   */
  public setUnicodeEmoji(unicodeEmoji: string, reason?: string) {
    return this.edit({ unicodeEmoji }, reason);
  }

  /**
   *
   * Set mentionable of this role.
   * @param mentionable - Whether the role should be mentionable.
   * @param [reason] - Reason for changing the mentionable value, if any
   */
  public setMentionable(mentionable: boolean, reason?: string) {
    return this.edit({ mentionable }, reason);
  }

  /**
   *
   * Edit a role position.
   * @param position - Position to set for the role.
   * @param reason - Reason for changing the position value, if any
   */
  public setPosition(position: number, reason?: string) {
    return this.guild.roles.setPosition(this, position, reason);
  }

  /**
   *
   * Delete this role.
   */
  public delete() {
    return this.guild.roles.delete(this);
  }

  /**
   *
   * @param data - Data to be edited for the role.
   * @param [reason] - Reason for changing the data value, if any
   */
  public async edit(data: RoleEditData, reason?: string) {
    await this.guild.roles.edit(this, data, reason);
    return this;
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
    return Color.toHex(this._color);
  }

  public get RGBColor() {
    return Color.toRGB(this._color);
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

  /**
   * Whether this role is editable.
   */
  public get editable() {
    return this._editable;
  }
}

export interface RoleTags {
  botId?: Snowflake;
  integrationId?: Snowflake;
  premiumSubscriber?: null;
}
