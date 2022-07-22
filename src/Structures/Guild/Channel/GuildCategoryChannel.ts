import { Collection } from '../../../deps.ts';
import { Snowflake } from '../../../Utils/ApiTypes.ts';
import { Debug, Todo } from '../../../Utils/dev.ts';
import { BaseGuildChannel } from './BaseGuildChannel.ts';

@Debug
@Todo
export class GuildCategoryChannel extends BaseGuildChannel {
  // #region Fields
  #childrens = new Collection<Snowflake, BaseGuildChannel>();
  // #endregion

  // #region Constructor

  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setters

  // #endregion
}
