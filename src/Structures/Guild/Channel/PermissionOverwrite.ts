import { IPermissionOverwrite, Snowflake } from '../../../Utils/ApiTypes.ts';
import { PermissionOverwriteType } from '../../../Utils/Constants.ts';
import { Debug, Todo } from '../../../Utils/dev.ts';

@Debug
@Todo
export class PermissionOverwrite {
  // #region Fields
  #id: Snowflake;
  #type: PermissionOverwriteType;
  #allow: string;
  #deny: string;
  // #endregion

  // #region Constructor
  public constructor(data: IPermissionOverwrite) {
    this.#id = data.id;
    this.#type = data.type;
    this.#allow = data.allow;
    this.#deny = data.deny;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get id() {
    return this.#id;
  }

  public get type() {
    return this.#type;
  }

  public get allow() {
    return this.#allow;
  }

  public get deny() {
    return this.#deny;
  }
  // #endregion
}
