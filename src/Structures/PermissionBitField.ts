import { BitField } from './BitField.ts';

/**
 * @class
 * @classdesc Permission BitField for Discord permissions.
 * @extends {BitField<bigint>}
 */
export class PermissionBitField extends BitField<bigint> {
  public static readonly defaultBits = 0n;
}
