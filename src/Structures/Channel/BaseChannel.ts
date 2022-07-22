import { Base } from '../Base.ts';
import type { Client } from '../../Client/Client.ts';
import type { IChannel, Snowflake } from '../../Utils/ApiTypes.ts';
import type { ChannelTypes } from '../../Utils/Constants.ts';
import { Debug, Todo } from '../../Utils/dev.ts';
import { Eq } from '../../Utils/Types.ts';

@Debug
export class BaseChannel extends Base implements Eq<BaseChannel> {
  // #region Fields
  #id: Snowflake;
  #type: ChannelTypes;
  #flags: number;
  // #endregion

  // #region Constructor
  public constructor(client: Client, data: IChannel) {
    super(client);
    this.#id = data.id;
    this.#type = data.type;
    this.#flags = data.flags!;
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
  public eq(other: BaseChannel) {
    return false;
  }
  // #endregion

  // #region Getter & Setter
  public get id() {
    return this.#id;
  }

  public get type() {
    return this.#type;
  }

  public get flags() {
    return this.#flags;
  }
  // #endregion
}
