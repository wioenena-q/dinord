import type { Client } from '../Client/Client.ts';
import { IUser, Snowflake } from '../Utils/ApiTypes.ts';
import { INullable } from '../Utils/Types.ts';
import { Utils } from '../Utils/Utils.ts';
import { Base } from './Base.ts';

export class User extends Base {
  // #region Props and type definitions
  #id: Snowflake;
  #username: string;
  #discriminator: string;
  #avatar?: string;
  #bot: boolean;
  #system: boolean;
  #mfaEnabled: boolean;
  #banner?: INullable<string>;
  #accentColor?: INullable<number>;
  #locale?: INullable<string>;
  #verified: boolean;
  #email?: string;
  #flags?: number;
  #premiumType?: INullable<number>;
  #publicFlags?: INullable<number>;
  // #endregion

  public constructor(client: Client, data: IUser) {
    // #region Handle props
    super(client);
    this.#id = data.id;
    this.#username = data.username;
    this.#discriminator = data.discriminator;
    this.#avatar = data.avatar;
    this.#bot = data.bot ?? false;
    this.#system = data.system ?? false;
    this.#mfaEnabled = data.mfa_enabled ?? false;
    this.#banner = data.banner ?? null;
    this.#accentColor = data.accent_color ?? null;
    this.#locale = data.locale ?? null;
    this.#verified = data.verified ?? false;
    this.#email = data.email;
    this.#flags = data.flags;
    this.#premiumType = data.premium_type ?? null;
    this.#publicFlags = data.public_flags ?? null;
    // #endregion
  }

  // #region Getters
  public get id() {
    return this.#id;
  }

  public get username() {
    return this.#username;
  }

  public get discriminator() {
    return this.#discriminator;
  }

  public get avatar() {
    return this.#avatar;
  }

  public get bot() {
    return this.#bot;
  }

  public get system() {
    return this.#system;
  }

  public get mfaEnabled() {
    return this.#mfaEnabled;
  }

  public get banner() {
    return this.#banner;
  }

  public get accentColor() {
    return this.#accentColor;
  }

  public get locale() {
    return this.#locale;
  }

  public get verified() {
    return this.#verified;
  }

  public get email() {
    return this.#email;
  }

  public get flags() {
    return this.#flags;
  }

  public get premiumType() {
    return this.#premiumType;
  }

  public get publicFlags() {
    return this.#publicFlags;
  }

  public get createdTimestamp() {
    return Utils.getTimestampFromId(this.#id);
  }

  public get createdAt() {
    return new Date(this.createdTimestamp);
  }
  // #endregion
}
