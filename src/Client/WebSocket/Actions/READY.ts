import type { Client } from "../../Client.ts";
import type { IPayload } from "../../../Types/IPayload.ts";

export default function (client:Client, { d }:IPayload) {
    console.log(d);
}
