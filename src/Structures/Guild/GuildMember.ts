import { Collection } from '../../deps.ts';
import { IGuildMember, Snowflake } from '../../Utils/ApiTypes.ts';
import { Debug } from '../../Utils/dev.ts';
import { INullable } from '../../Utils/Types.ts';
import { User } from '../User.ts';
import { Guild } from './Guild.ts';
import { GuildRole } from './Role/GuildRole.ts';

@Debug
export class GuildMember {
  // #region Fields
  #guild: Guild;
  #user?: INullable<User>;
  #nick?: INullable<string>;
  #avatar?: INullable<string>;
  #roles = new Collection<Snowflake, GuildRole>();
  #joinedAt: number;
  #premiumSince?: INullable<number>;
  #deaf: boolean;
  #mute: boolean;
  #pending: boolean;
  #permissions?: INullable<string>;
  #communicationDisabledUntil?: INullable<number>;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IGuildMember) {
    this.#guild = guild;
    this.#user = data.user ? new User(this.#guild.client, data.user!) : null;
    this.#nick = data.nick ?? null;
    this.#avatar = data.avatar ?? null;
    this.#joinedAt = data.joined_at;
    this.#premiumSince = data.premium_since ?? null;
    this.#deaf = data.deaf;
    this.#mute = data.mute;
    this.#pending = data.pending ?? false;
    this.#permissions = data.permissions ?? null;
    this.#communicationDisabledUntil = data.communication_disabled_until ?? null;

    for (const roleId of data.roles) {
      this.#roles.set(roleId, guild.roles.get(roleId)!);
    }
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get guild() {
    return this.#guild;
  }

  public get user() {
    return this.#user;
  }

  public get nick() {
    return this.#nick;
  }

  public get avatar() {
    return this.#avatar;
  }

  public get roles() {
    return this.#roles;
  }

  public get joinedAt() {
    return this.#joinedAt;
  }

  public get premiumSince() {
    return this.#premiumSince;
  }

  public get deaf() {
    return this.#deaf;
  }

  public get mute() {
    return this.#mute;
  }

  public get pending() {
    return this.#pending;
  }

  public get permissions() {
    return this.#permissions;
  }

  public get communicationDisabledUntil() {
    return this.#communicationDisabledUntil;
  }
  // #endregion
}
