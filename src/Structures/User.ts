import type { Client } from '../Client/Client.ts';
import { Base } from './Base.ts';

export class User extends Base {
  public constructor(client: Client, data: unknown) {
    super(client);
  }
}
