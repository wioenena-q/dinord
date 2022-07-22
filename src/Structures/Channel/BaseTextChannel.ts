import { BaseChannel } from './BaseChannel.ts';
import type { IChannel, Snowflake } from '../../Utils/ApiTypes.ts';
import type { ITextBasedChannel } from './TextBasedChannel.ts';
import { Client } from '../../Client/Client.ts';

export class BaseTextChannel extends BaseChannel implements ITextBasedChannel {
  // #region Fields
  #lastMessageId: Snowflake;
  // #endregion

  // #region Constructor
  public constructor(client: Client, data: IChannel) {
    super(client, data);
    this.#lastMessageId = data.last_message_id!;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get lastMessageId() {
    return this.#lastMessageId;
  }
  // #endregion
}
