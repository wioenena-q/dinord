import { Base } from './Base.ts';

import type { GatewayReadyDispatchData } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';

/**
 * @class
 * @classdesc The class that will handle the READY event
 */
export class ReadyEvent extends Base {
  public exec(data: GatewayReadyDispatchData) {}
}
