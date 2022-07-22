import { IChannel, Snowflake } from '../../../Utils/ApiTypes.ts';
import { INullable } from '../../../Utils/Types.ts';
import { BaseChannel } from '../../Channel/BaseChannel.ts';
import { Guild } from '../Guild.ts';
import { IGuildTextBasedChannel } from './GuildTextBasedChannel.ts';

export class GuildThreadChannel extends BaseChannel implements IGuildTextBasedChannel {
  // #region Fields
  #lastMessageId: INullable<Snowflake>;
  #rateLimitPerUser: number;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IChannel) {
    super(guild.client, data);
    this.#lastMessageId = data.last_message_id ?? null;
    this.#rateLimitPerUser = data.rate_limit_per_user!;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get lastMessageId() {
    return this.#lastMessageId;
  }

  public get rateLimitPerUser() {
    return this.#rateLimitPerUser;
  }
  // #endregion
}
