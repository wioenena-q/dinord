import { Client } from "../Client/Client.ts";

export class BaseStructure {
  public constructor(public readonly client: Client) {}
}
