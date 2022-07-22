import { BaseGuildChannel } from './BaseGuildChannel.ts';
import type { IChannel } from '../../../Utils/ApiTypes.ts';
import type { Client } from '../../../Client/Client.ts';
import type { ITextBasedChannel } from '../../Channel/TextBasedChannel.ts';
import { Guild } from '../Guild.ts';
import { Debug } from '../../../Utils/dev.ts';

@Debug
export class GuildTextChannel extends BaseGuildChannel implements ITextBasedChannel {
  // #region Fields
  #topic: string;
  #nsfw: boolean;
  #rateLimitPerUser: number;
  #lastMessageId: string;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IChannel) {
    super(guild, data);
    this.#topic = data.topic!;
    this.#nsfw = data.nsfw ?? false;
    this.#rateLimitPerUser = data.rate_limit_per_user!;
    this.#lastMessageId = data.last_message_id!;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get topic() {
    return this.#topic;
  }

  public get nsfw() {
    return this.#nsfw;
  }

  public get rateLimitPerUser() {
    return this.#rateLimitPerUser;
  }

  public get lastMessageId() {
    return this.#lastMessageId;
  }
  // #endregion
}
