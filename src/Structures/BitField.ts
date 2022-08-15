import { Equal } from '../Utils/Types.ts';
import {
  defineReadonlyProperty,
  isArray,
  isBigInt,
  isInstanceOf,
  isKeyOf,
  isNumber,
  isString,
  toObject
} from '../Utils/Utils.ts';

/**
 * @class
 * @classdesc Base class for BitField based classes
 */
export class BitField<N extends number | bigint> implements Equal<BitField<N>> {
  /**
   * BitField default bits
   */
  public static readonly defaultBits: number | bigint = 0;
  /**
   * BitField flags
   */
  public static readonly FLAGS = Object.freeze({}) as Readonly<Record<string, number | bigint>>;
  private declare _bits: N;
  declare ['constructor']: typeof BitField;

  /**
   *
   * @param bits - BitField bits
   */
  public constructor(...bits: BitFieldResolvable<keyof typeof BitField.FLAGS, N>[]) {
    Object.defineProperty(this, '_bits', {
      value: bits ? this.constructor.resolve(bits) : (this.constructor.defaultBits as N),
      writable: true
    });
  }

  /**
   *
   * Add bits to this BitField
   * @param bits - Bits to add
   * @returns This BitField
   */
  public add(...bits: BitFieldResolvable<keyof typeof BitField.FLAGS, N>[]) {
    (this._bits as number) |= this.constructor.resolve(bits) as number;
    return this;
  }

  /**
   *
   * Remove bits from this BitField
   * @param bits - Bits to remove
   * @returns This BitField
   */
  public remove(...bits: BitFieldResolvable<keyof typeof BitField.FLAGS, N>[]) {
    (this._bits as number) &= ~this.constructor.resolve(bits) as number;
    return this;
  }

  /**
   * Check for bits in this BitField
   * @param bits - Bits to check for existence
   * @returns Whether this BitField has the bits
   */
  public has(...bits: BitFieldResolvable<keyof typeof BitField.FLAGS, N>[]) {
    const resolved = this.constructor.resolve(bits) as number;
    return ((this._bits as number) & resolved) === resolved;
  }

  /**
   * Get the missing bits in this BitField
   * @param bits - Target bits to check for missings
   * @returns Missing bits
   */
  public missing(...bits: N[]) {
    return new this.constructor<N>(...bits).remove(this._bits);
  }

  /**
   * Compares this BitField with other BitField
   * @param other - Other BitField to compare against
   * @returns Whether this BitField is equal to the other BitField
   */
  public eq(other: BitField<N>) {
    return this.bits === other.bits;
  }

  /**
   * Get flags of existing bits in this BitField
   * @returns Flags of bits that exist in this BitField
   */
  public toArray(): (keyof typeof BitField.FLAGS)[] {
    const allKeys = Object.keys(this.constructor.FLAGS) as (keyof typeof BitField.FLAGS)[];

    return allKeys.filter((key) => this.has(key));
  }

  /**
   *
   * Resolve bits
   * @param bits - Bits to resolve
   * @returns Resolved bits
   */
  public static resolve(bits: unknown): number | bigint {
    if (isNumber(bits) && isNumber(this.defaultBits)) return bits;
    else if (isBigInt(bits) && isBigInt(this.defaultBits)) return bits;
    else if (isInstanceOf(bits, this)) return bits.bits;
    else if (isString(bits) && isKeyOf(this.FLAGS, bits)) return this.FLAGS[bits];
    else if (isArray(bits))
      return bits.reduce((a: number, b) => (a |= this.resolve(b) as number), this.defaultBits as number);
    else
      throw new TypeError(
        `Expected ${this.name}, ${typeof this.defaultBits} or (${this.name}|${typeof this
          .defaultBits})[], got ${typeof bits}, bits: ${bits}`
      );
  }

  public [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(toObject(this, ['bits']), options);
  }

  /**
   * Returns this BitField's bits.
   */
  public get bits() {
    return this._bits;
  }
}

export type BitFieldResolvable<FK /* Flag keys */, N extends number | bigint> = FK | N;

defineReadonlyProperty(BitField, 'defaultBits', 0);
