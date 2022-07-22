import { Collection } from '../../../deps.ts';
import { IChannel, Snowflake } from '../../../Utils/ApiTypes.ts';
import { Debug } from '../../../Utils/dev.ts';
import { INullable } from '../../../Utils/Types.ts';
import { BaseChannel } from '../../Channel/BaseChannel.ts';
import { Guild } from '../Guild.ts';
import { PermissionOverwrite } from './PermissionOverwrite.ts';

@Debug
export class BaseGuildChannel extends BaseChannel {
  // #region Fields
  #guild: Guild;
  #name: string;
  #position: number;
  #parentId: INullable<Snowflake>;
  #permissionOverwrites = new Collection<Snowflake, PermissionOverwrite>();
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IChannel) {
    super(guild.client, data);
    this.#guild = guild;
    this.#name = data.name!;
    this.#position = data.position!;
    this.#parentId = data.parent_id ?? null;
    for (const permissionOverwrite of data.permission_overwrites!) {
      this.#permissionOverwrites.set(
        permissionOverwrite.id,
        new PermissionOverwrite(permissionOverwrite)
      );
    }
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get guild() {
    return this.#guild;
  }

  public get name() {
    return this.#name;
  }

  public get position() {
    return this.#position;
  }

  public get parentId() {
    return this.#parentId;
  }

  public get permissionOverwrites() {
    return this.#permissionOverwrites;
  }
  // #endregion
}
