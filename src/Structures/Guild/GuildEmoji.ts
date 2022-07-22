import type { IEmoji, Snowflake } from '../../Utils/ApiTypes.ts';
import { Debug } from '../../Utils/dev.ts';
import type { INullable } from '../../Utils/Types.ts';
import type { User } from '../User.ts';
import type { Guild } from './Guild.ts';

@Debug
export class GuildEmoji {
  // #region Fields
  #guild: Guild;
  #id?: INullable<Snowflake>;
  #name?: INullable<string>;
  #roles?: INullable<Snowflake[]>;
  #user?: INullable<User>;
  #requireColons: boolean;
  #managed: boolean;
  #animated: boolean;
  #available: boolean;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IEmoji) {
    this.#guild = guild;
    this.#id = data.id ?? null;
    this.#name = data.name ?? null;
    this.#roles = data.roles ?? null;
    this.#user = (data.user as any) ?? null;
    this.#requireColons = data.require_colons ?? false;
    this.#managed = data.managed ?? false;
    this.#animated = data.animated ?? false;
    this.#available = data.available ?? false;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get guild() {
    return this.#guild;
  }

  public get id() {
    return this.#id;
  }

  public get name() {
    return this.#name;
  }

  public get roles() {
    return this.#roles;
  }

  public get user() {
    return this.#user;
  }

  public get requireColons() {
    return this.#requireColons;
  }

  public get managed() {
    return this.#managed;
  }

  public get animated() {
    return this.#animated;
  }

  public get available() {
    return this.#available;
  }
  // #endregion
}
