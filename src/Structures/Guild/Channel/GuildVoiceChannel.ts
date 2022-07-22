import { IChannel, Snowflake } from '../../../Utils/ApiTypes.ts';
import { INullable } from '../../../Utils/Types.ts';
import { Guild } from '../Guild.ts';
import { BaseGuildChannel } from './BaseGuildChannel.ts';
import { ITextBasedChannel } from '../../Channel/TextBasedChannel.ts';
import { Debug } from '../../../Utils/dev.ts';

@Debug
export class GuildVoiceChannel extends BaseGuildChannel implements ITextBasedChannel {
  // #region Fields
  #lastMessageId: INullable<Snowflake>;
  #bitrate: number;
  #userLimit: number;
  #rtcRegion?: INullable<string>;
  #videoQualityMode: number;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: IChannel) {
    super(guild, data);
    this.#lastMessageId = data.last_message_id ?? null;
    this.#bitrate = data.bitrate!;
    this.#userLimit = data.user_limit!;
    this.#rtcRegion = data.rtc_region ?? null;
    this.#videoQualityMode = data.video_quality_mode ?? 0;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get lastMessageId() {
    return this.#lastMessageId;
  }

  public get bitrate() {
    return this.#bitrate;
  }

  public get userLimit() {
    return this.#userLimit;
  }

  public get rtcRegion() {
    return this.#rtcRegion;
  }

  public get videoQualityMode() {
    return this.#videoQualityMode;
  }
  // #endregion
}
