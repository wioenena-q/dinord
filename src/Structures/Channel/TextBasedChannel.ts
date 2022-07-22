import { Snowflake } from '../../Utils/ApiTypes.ts';
import { INullable } from '../../Utils/Types.ts';

export interface ITextBasedChannel {
  lastMessageId: Snowflake | INullable<Snowflake>;
}
