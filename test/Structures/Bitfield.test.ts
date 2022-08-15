import { assert, assertEquals, assertThrows } from 'https://deno.land/std/testing/asserts.ts';
import { BitField } from '../../src/Structures/BitField.ts';

Deno.test('BitField.defaultBits', () => {
  assertEquals(BitField.defaultBits, 0);
});

Deno.test('BitField new instance', () => {
  const bitfield = new BitField();
  assertEquals(bitfield.bits, BitField.defaultBits);
});

Deno.test('BitField new instance with bits', () => {
  const bitfield = new BitField(1 << 0);
  assertEquals(bitfield.bits, 1 << 0);
});

Deno.test('BitField.add()', () => {
  const bitfield = new BitField();
  assertEquals(bitfield.bits, BitField.defaultBits);
  bitfield.add(0x1);
  assertEquals(bitfield.bits, 0x1);
  bitfield.add(0x2);
  assertEquals(bitfield.bits, 0x1 | 0x2);
});

Deno.test('BitField.remove()', () => {
  const bitfield = new BitField();
  bitfield.add(0x1, 0x2, 0x4, 0x8);
  assertEquals(bitfield.bits, 0x1 | 0x2 | 0x4 | 0x8);
  bitfield.remove(0x4, 0x8);
  assertEquals(bitfield.bits, 0x1 | 0x2);
  assert(!bitfield.has(0x4));
  assert(!bitfield.has(0x8));
});

Deno.test('BitField.missing()', () => {
  const bits = new BitField<number>(0x1, 0x2, 0x4, 0x8);
  assertEquals(bits.missing(0x1, 0x2, 0x4, 0x8, 0x10).bits, 0x10);
});

Deno.test('BitField.resolve()', () => {
  assertEquals(BitField.resolve(0x1), 0x1);
  assertEquals(BitField.resolve([0x1, 0x2, 0x4, 0x8]), 0xf);
  assertEquals(BitField.resolve(new BitField(0x1)), 0x1);
});

Deno.test('BitField.eq()', () => {
  const bits = new BitField(0x1, 0x2, 0x4, 0x8);
  assert(bits.eq(new BitField(0x1, 0x2, 0x4, 0x8)));
});

Deno.test('BitField.resolve() invalid bits', () => {
  assertThrows(() => {
    BitField.resolve(1n);
  }, TypeError);

  assertThrows(() => {
    BitField.resolve(null);
  }, TypeError);

  assertThrows(() => {
    BitField.resolve('');
  }, TypeError);

  assertThrows(() => {
    BitField.resolve([null]);
  }, TypeError);
});
