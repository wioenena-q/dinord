import { Tiger } from "../../deps.ts";
import { Discord } from "./Constants.ts";

/**
 *
 * The utility class.
 * @export
 * @class Util
 */
export class Util {
    /**
     *
     * The logger.
     * @static
     * @type {Tiger}
     * @memberof Util
     */
    public static Logger: Tiger = new Tiger();

    /**
     *
     * Getting the created timestamp from the id.
     * @static
     * @param {(string | number)} id
     * @returns {number}
     * @memberof Util
     */
    public static idToTimestamp(id: string | number): number {
        if (typeof id === "string")
            // eslint-disable-next-line radix
            id = parseInt(id);

        const binary = id.toString(2).padStart(64, "0").substring(0, 42);
        const decimal = parseInt(binary, 2);
        return new Date(decimal + Discord.EPOCH).getTime();
    }
}
