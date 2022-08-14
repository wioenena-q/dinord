import { Role } from '../../Structures/Guild/Role.ts';
import { BaseManagerForGuild } from './BaseManagerForGuildManagers.ts';

import type { Snowflake } from 'https://deno.land/x/discord_api_types@0.37.2/globals.ts';
import { APIRole } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import { Color, ColorResolvable } from '../../Structures/Color.ts';
import { isString } from '../../Utils/Utils.ts';
import { URLManager } from '../URLManager.ts';

/**
 * @class
 * @classdesc Manager of guild roles.
 * @extends {BaseManagerForGuild<Snowflake, Role>}
 */
export class GuildRoleManager extends BaseManagerForGuild<Snowflake, Role> {
  public add(data: APIRole) {
    const exists = this.cache.get(data.id);

    if (exists) exists.patch(data);
    else this.cache.set(data.id, new Role(this.guild, data));
  }

  /**
   * Edit a role position.
   * @param role - Role whose position will change.
   * @param position - New position of the role.
   * @param reason - Reason for changing the position, if any.
   * @returns
   */
  public setPosition(role: GuildRoleResolvable, position: number, reason?: string) {
    const roleId = this.resolveId(role);
    if (!roleId) throw new Error('Role not found');
    if (position < 0) throw new Error('Role position must be positive');

    return this.guild.client.rest.patch(URLManager.guildRoles(this.guild.id), {
      body: JSON.stringify([
        {
          id: roleId,
          position: position
        }
      ]),
      headers: reason ? { 'X-Audit-Log-Reason': reason } : {}
    });
  }

  /**
   *
   * Edit a role.
   * @param role - Role to Edit.
   * @param data - Data to edit.
   * @param [reason] - Reason for editing, if any.
   */
  public edit(role: GuildRoleResolvable, data: RoleEditData, reason?: string) {
    const roleId = this.resolveId(role);
    if (!roleId) throw new Error('Role not found');

    const _data: Record<PropertyKey, unknown> = {};
    if ('name' in data) _data.name = data.name;
    if ('permissions' in data) _data.permissions = data.permissions; // TODO: expand feature
    if ('color' in data) _data.color = Color.resolve(data.color!);
    if ('hoist' in data) _data.hoist = data.hoist;
    if ('icon' in data) _data.icon = data.icon;
    if ('unicodeEmoji' in data) _data.unicode_emoji = data.unicodeEmoji;
    if ('mentionable' in data) _data.mentionable = data.mentionable;

    return this.guild.client.rest.patch(URLManager.guildRole(this.guild.id, roleId), {
      body: JSON.stringify(_data),
      headers: reason ? { 'X-Audit-Log-Reason': reason } : {}
    });
  }

  /**
   * Create a new role.
   * @param data - Data to create role with.
   * @param [reason] - Reason for creating, if any.
   */
  public create(data: RoleCreateData, reason?: string) {
    const _data: Record<PropertyKey, unknown> = {};
    if ('name' in data) _data.name = data.name;
    if ('permissions' in data) _data.permissions = data.permissions; // TODO: expand feature
    if ('color' in data) _data.color = Color.resolve(data.color!);
    if ('hoist' in data) _data.hoist = data.hoist;
    if ('icon' in data) _data.icon = data.icon;
    if ('unicodeEmoji' in data) _data.unicode_emoji = data.unicodeEmoji;
    if ('mentionable' in data) _data.mentionable = data.mentionable;

    return this.guild.client.rest.post(URLManager.guildRoles(this.guild.id), {
      body: JSON.stringify(_data),
      headers: reason ? { 'X-Audit-Log-Reason': reason } : {}
    });
  }

  /**
   *
   * Delete role.
   * @param role - Role to delete.
   * @param reason - Reason for deleting, if any.
   */
  public delete(role: GuildRoleResolvable, reason?: string) {
    const roleId = this.resolveId(role);
    if (!roleId) throw new Error('Role not found');
    this.cache.delete(roleId);
    return this.guild.client.rest.delete(URLManager.join(URLManager.guildRoles(this.guild.id), roleId), {
      headers: reason ? { 'X-Audit-Log-Reason': reason } : {}
    });
  }

  /**
   *
   * Resolve role object from role object or role id.
   * @param role - Role to resolve
   */
  public resolve(role: GuildRoleResolvable) {
    return this.cache.get(isString(role) ? role : role.id) ?? null;
  }

  /**
   *
   * Resolve role id from role object or role id.
   * @param role - Role to resolve
   */
  public resolveId(role: GuildRoleResolvable) {
    return this.resolve(role)?.id ?? null;
  }
}

/**
 * @typedef {Object} RoleEditData
 * @property {string?} [name] - Name of the role.
 * @property {ColorResolvable?} [color] - Color of the role.
 * @property {boolean?} [hoist] - Whether to display role members separately from online members.
 * @property {string?} [icon] - Image data for the role icon.
 * @property {string?} [unicodeEmoji] - Unicode emoji of the role
 * @property {boolean?} [mentionable] - Whether this role is mentionable.
 */
export interface RoleEditData {
  name?: string;
  permissions?: string;
  color?: ColorResolvable;
  hoist?: boolean;
  icon?: unknown /* TODO: change type */;
  unicodeEmoji?: string;
  mentionable?: boolean;
}

export type GuildRoleResolvable = Role | Snowflake;

/**
 * @typedef {Object} RoleCreateData
 * @property {string?} [name] - Name of the new role.
 * @property {ColorResolvable?} [color] - Color of the new role.
 * @property {boolean?} [hoist] - Whether to show this new role separately in the sidebar
 * @property {string?} [icon] - Image data for the icon for this new role.
 * @property {string?} [unicodeEmoji] - Unicode emoji of the new role
 * @property {boolean?} [mentionable] - Whether this new role is mentionable.
 */
export interface RoleCreateData {
  name?: string;
  permissions?: string;
  color?: ColorResolvable;
  hoist?: boolean;
  icon?: unknown | null /* TODO: change type */;
  unicodeEmoji?: string | null;
  mentionable?: boolean;
}
