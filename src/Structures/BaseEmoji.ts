import { Base } from "./Base.ts";
import type { BaseEmoji as IBaseEmoji } from "../Types/StructureTypes.ts";
import type { Client } from "../Client/Client.ts";

/**
 *
 * The main emoji structure.
 * @export
 * @class BaseEmoji
 * @extends {Base<IBaseEmoji>}
 */
export class BaseEmoji extends Base<IBaseEmoji> {
    protected name?: string | null;

    protected patch(_: unknown): void { }
}
