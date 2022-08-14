import { Base } from './Base.ts';

import type { GatewayReadyDispatchData } from '../../../deps.ts';

/**
 * @class
 * @classdesc The class that will handle the READY event
 */
export class ReadyEvent extends Base {
  public exec(data: GatewayReadyDispatchData) {}
}
