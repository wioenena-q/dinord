import { ITextBasedChannel } from '../../Channel/TextBasedChannel.ts';

export interface IGuildTextBasedChannel extends ITextBasedChannel {
  rateLimitPerUser: number;
}
