import { Equal } from '../Utils/Types.ts';
import { isInstanceOf, toObject } from '../Utils/Utils.ts';

export class BitField<N extends number | bigint = number> implements Equal<BitField<N>> {
  /**
   * BitField default bits
   */
  public static readonly defaultBits: number | bigint = 0;

  private declare _bits: N;

  declare ['constructor']: typeof BitField;

  /**
   *
   * @param bits - Initial bits
   */
  public constructor(...bits: N[]) {
    Object.defineProperty(this, '_bits', {
      value: bits.reduce<N>((a, c) => (a | c) as N, this.constructor.defaultBits as N),
      writable: true
    });
  }

  /**
   *
   * Add bits to this BitField
   * @param bits - Bits to set
   */
  public add(...bits: N[]) {
    for (const bit of bits) (this._bits as number) |= bit as number;
    return this;
  }

  /**
   *
   * Remove bits from this BitField
   * @param bits - Bits to removed
   */
  public remove(...bits: N[]) {
    for (const bit of bits) (this._bits as number) &= ~bit;
    return this;
  }

  /**
   *
   * Whether the specified bit is in this BitField
   * @param bit - Bit to check for existence
   */
  public has(bit: N) {
    return (this._bits & bit) === bit;
  }

  /**
   *
   * Checks if BitFields are equal
   * @param other - Other BitField to compare against
   */
  public eq(other: BitField<N> | number | bigint): boolean {
    return this._bits === (isInstanceOf(other, this.constructor) ? other.bits : other);
  }

  /**
   * Get the missing bits in the BitField
   * @param bits - Bits to check
   */
  public missing(...bits: N[]) {
    return new this.constructor<N>(...bits).remove(this._bits)._bits;
  }

  /**
   * Bits
   */
  public get bits() {
    return this._bits;
  }

  [Symbol.for('Deno.customInspect')](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return inspect(toObject(this, ['constructor', 'add', 'remove', 'has', 'eq', 'bits']), options);
  }
}
