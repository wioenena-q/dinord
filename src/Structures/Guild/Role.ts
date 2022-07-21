import { Base } from '../Base.ts';
import type { Client } from '../../Client/Client.ts';
import type { IRole, Snowflake } from '../../Utils/ApiTypes.ts';
import { INullable } from '../../Utils/Types.ts';
import { Guild } from './Guild.ts';
import { RoleTags } from './RoleTags.ts';
import { Debug } from '../../Utils/dev.ts';

@Debug
export class Role {
  // #region Props and type definitions
  #guild: Guild;
  #id: Snowflake;
  #name: string;
  #color: number;
  #hoist: boolean;
  #icon?: INullable<string>;
  #unicodeEmoji?: INullable<string>;
  #position: number;
  #permissions: string;
  #managed: boolean;
  #mentionable: boolean;
  #tags?: INullable<RoleTags>;
  // #endregion

  public constructor(guild: Guild, data: IRole) {
    // #region Handle props
    this.#guild = guild;
    this.#id = data.id;
    this.#name = data.name;
    this.#color = data.color;
    this.#hoist = data.hoist;
    this.#icon = data.icon ?? null;
    this.#unicodeEmoji = data.unicode_emoji ?? null;
    this.#position = data.position;
    this.#permissions = data.permissions;
    this.#managed = data.managed;
    this.#mentionable = data.mentionable;
    this.#tags = data.tags ? new RoleTags(this, data.tags) : null;
    // #endregion
  }

  // #region Getters
  public get guild() {
    return this.#guild;
  }

  public get id() {
    return this.#id;
  }

  public get name() {
    return this.#name;
  }

  public get color() {
    return this.#color;
  }

  public get hoist() {
    return this.#hoist;
  }

  public get icon() {
    return this.#icon;
  }

  public get unicodeEmoji() {
    return this.#unicodeEmoji;
  }

  public get position() {
    return this.#position;
  }

  public get permissions() {
    return this.#permissions;
  }

  public get managed() {
    return this.#managed;
  }

  public get mentionable() {
    return this.#mentionable;
  }

  public get tags() {
    return this.#tags;
  }
  // #endregion
}
