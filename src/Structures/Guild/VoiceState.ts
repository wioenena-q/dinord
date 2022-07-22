import type { IVoiceState, Snowflake } from '../../Utils/ApiTypes.ts';
import { Debug } from '../../Utils/dev.ts';
import { INullable } from '../../Utils/Types.ts';
import type { Guild } from './Guild.ts';
import { GuildMember } from './GuildMember.ts';

@Debug
export class VoiceState {
  // #region Fields
  #guild: Guild;
  #channelId?: INullable<Snowflake>;
  #userId: Snowflake;
  #member: GuildMember;
  #sessionId: string;
  #deaf: boolean;
  #mute: boolean;
  #selfDeaf: boolean;
  #selfMute: boolean;
  #selfStream: boolean;
  #selfVideo: boolean;
  #suppress: boolean;
  #requestToSpeakTimestamp;
  // #endregion

  // #region Constructor
  public constructor(guild: Guild, data: Partial<IVoiceState>) {
    this.#guild = guild;
    this.#channelId = data.channel_id;
    this.#userId = data.user_id!;
    this.#member = data.member as any;
    this.#sessionId = data.session_id!;
    this.#deaf = data.deaf ?? false;
    this.#mute = data.mute ?? false;
    this.#selfDeaf = data.self_deaf ?? false;
    this.#selfMute = data.self_mute ?? false;
    this.#selfStream = data.self_stream ?? false;
    this.#selfVideo = data.self_video ?? false;
    this.#suppress = data.suppress ?? false;
    this.#requestToSpeakTimestamp = data.request_to_speak_timestamp;
  }
  // #endregion

  // #region Methods
  // #endregion

  // #region Getter & Setter
  public get guild() {
    return this.#guild;
  }

  public get channelId() {
    return this.#channelId;
  }

  public get userId() {
    return this.#userId;
  }

  public get member() {
    return this.#member;
  }

  public get sessionId() {
    return this.#sessionId;
  }

  public get deaf() {
    return this.#deaf;
  }

  public get mute() {
    return this.#mute;
  }

  public get selfDeaf() {
    return this.#selfDeaf;
  }

  public get selfMute() {
    return this.#selfMute;
  }

  public get selfStream() {
    return this.#selfStream;
  }

  public get selfVideo() {
    return this.#selfVideo;
  }

  public get suppress() {
    return this.#suppress;
  }

  public get requestToSpeakTimestamp() {
    return this.#requestToSpeakTimestamp;
  }
  // #endregion
}
