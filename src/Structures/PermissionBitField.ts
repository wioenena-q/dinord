import { PermissionFlagsBits } from '../deps.ts';
import { BitField, BitFieldResolvable } from './BitField.ts';

export interface PermissionBitField extends BitField<bigint> {
  add(...bits: PermissionBitFieldResolvable[]): this;
  remove(...bits: PermissionBitFieldResolvable[]): this;
  has(...bits: PermissionBitFieldResolvable[]): boolean;
  missing(...bits: PermissionBitFieldResolvable[]): PermissionBitField;
  eq(other: PermissionBitField): boolean;
  toArray(): PermissionBitFieldFlags[];
}

/**
 * @class
 * @classdesc Permission BitField for Discord permissions.
 */
export class PermissionBitField extends BitField<bigint> {
  public static readonly FLAGS = PermissionFlagsBits;
  public static readonly defaultBits: bigint = 0n;

  public constructor(...bits: PermissionBitFieldResolvable[]) {
    super(...bits);
  }

  public static resolve(bits: PermissionBitFieldResolvable): bigint {
    return super.resolve(bits) as bigint;
  }
}

export type PermissionBitFieldResolvable = BitFieldResolvable<PermissionBitFieldFlags, bigint>;
export type PermissionBitFieldFlags = keyof typeof PermissionBitField.FLAGS;
