import { Base } from './Base.ts';

import type { APIEmoji } from 'https://deno.land/x/discord_api_types@0.37.2/v10.ts';
import type { Client } from '../Client/Client.ts';

export class Emoji extends Base {
  protected declare _name: string | null;

  public constructor(client: Client, data: APIEmoji) {
    super(client);

    this.patch(data);
  }

  public patch(data: APIEmoji) {
    this._name = data.name;
  }

  /**
   * TODO: Implement
   */
  public toJSON(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }

  /**
   * TODO: Implement
   */
  public toString(): string {
    throw new Error('Method not implemented.');
  }

  /**
   * Name of this emoji, if any
   */
  public get name() {
    return this._name;
  }
}
