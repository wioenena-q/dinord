import type { Client } from '../Client/Client.ts';
import { IUser, Snowflake } from '../Utils/ApiTypes.ts';
import { Debug, Todo } from '../Utils/dev.ts';
import { Eq, INullable } from '../Utils/Types.ts';
import { Utils } from '../Utils/Utils.ts';
import { Base } from './Base.ts';

@Debug
export class User extends Base implements Eq<User> {
  // #region Fields
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
  #email?: INullable<string>;
  #flags?: INullable<number>;
  #premiumType?: INullable<number>;
  #publicFlags?: INullable<number>;
  // #endregion

  // #region Constructor
  public constructor(client: Client, data: IUser) {
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
    this.#email = data.email ?? null;
    this.#flags = data.flags ?? null;
    this.#premiumType = data.premium_type ?? null;
    this.#publicFlags = data.public_flags ?? null;
  }
  // #endregion

  // #region Methods
  @Todo
  public override toJSON() {
    return {};
  }

  @Todo
  public override toString() {
    return '';
  }

  @Todo
  public eq(other: User) {
    return false;
  }

  // #endregion

  // #region Getter & Setter
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
