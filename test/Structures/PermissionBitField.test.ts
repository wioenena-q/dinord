import { assertEquals, assertThrows } from 'https://deno.land/std/testing/asserts.ts';
import { PermissionBitField } from '../../src/Structures/PermissionBitField.ts';

Deno.test('PermissionBitField.resolve() with flags', () => {
  assertEquals(PermissionBitField.resolve('AddReactions'), PermissionBitField.FLAGS.AddReactions);
});

Deno.test('PermissionBitField.resolve() invalid bits', () => {
  assertThrows(() => {
    // @ts-expect-error - invalid bitfield
    PermissionBitField.resolve(0x1);
  }, TypeError);
});

Deno.test('PermissionBitField.toArray()', () => {
  const bits = new PermissionBitField();
  bits.add(PermissionBitField.FLAGS.AddReactions);
  bits.add(PermissionBitField.FLAGS.ManageMessages);
  assertEquals(bits.toArray(), ['AddReactions', 'ManageMessages']);
});
