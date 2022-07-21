import { IRoleTags, Snowflake } from '../../Utils/ApiTypes.ts';
import { Debug } from '../../Utils/dev.ts';
import { INullable } from '../../Utils/Types.ts';
import { Role } from './Role.ts';

@Debug
export class RoleTags {
  // #region Props and type definitions
  #role: Role;
  #botId?: INullable<Snowflake>;
  #integrationId?: INullable<Snowflake>;
  #premiumSubscriber?: null;
  // #endregion

  public constructor(role: Role, data: IRoleTags) {
    // #region Handle props
    this.#role = role;
    this.#botId = data.bot_id ?? null;
    this.#integrationId = data.integration_id ?? null;
    this.#premiumSubscriber = data.premium_subscriber ?? null;
    // #endregion
  }

  // #region Getters
  public get role() {
    return this.#role;
  }

  public get botId() {
    return this.#botId;
  }

  public get integrationId() {
    return this.#integrationId;
  }

  public get premiumSubscriber() {
    return this.#premiumSubscriber;
  }
  // #endregion
}
