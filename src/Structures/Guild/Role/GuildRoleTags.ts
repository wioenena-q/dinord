import { IRoleTags, Snowflake } from '../../../Utils/ApiTypes.ts';
import { Debug } from '../../../Utils/dev.ts';
import { INullable } from '../../../Utils/Types.ts';

@Debug
export class GuildRoleTags {
  // #region Fields
  #botId?: INullable<Snowflake>;
  #integrationId?: INullable<Snowflake>;
  #premiumSubscriber?: null;
  // #endregion

  // #region Constructor
  public constructor(data: IRoleTags) {
    this.#botId = data.bot_id ?? null;
    this.#integrationId = data.integration_id ?? null;
    this.#premiumSubscriber = data.premium_subscriber ?? null;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
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
