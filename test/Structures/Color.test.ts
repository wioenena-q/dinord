import { assert, assertEquals, assertObjectMatch, assertThrows } from 'https://deno.land/std/testing/asserts.ts';
import { Color } from '../../src/Structures/Color.ts';

Deno.test('Color.resolve() with DefaultColors', () => {
  assertEquals(Color.resolve('White'), 0xffffff);
});

Deno.test('Color.resolve() with hexadecimal string', () => {
  assertEquals(Color.resolve('#FFF'), 0xffffff);
  assertEquals(Color.resolve('#000'), 0x000000);
  assertEquals(Color.resolve('#fFfFfF'), 0xffffff);
});

Deno.test('Color.resolve() with rgb object', () => {
  assertEquals(Color.resolve({ r: 255, g: 255, b: 255 }), 0xffffff);
  assertEquals(Color.resolve({ r: 0, g: 0, b: 0 }), 0x000000);
});

Deno.test('Color.resolve() with not valid color', () => {
  assertThrows(
    () => {
      // @ts-expect-error - color is not a valid color
      Color.resolve(null);
    },
    TypeError,
    'null is not a valid color'
  );

  assertThrows(
    () => {
      // @ts-expect-error - color is not a valid color
      Color.resolve('a'.repeat(100));
    },
    Error,
    `Unknown color: ${'a'.repeat(100)}`
  );
});

Deno.test('Color.random()', () => {
  const random = Color.random();
  assert(random >= 0 && random <= 0xffffff);
});

Deno.test('Color.toHex()', () => {
  assertEquals(Color.toHex(Color.resolve('AntiqueWhite')).toUpperCase(), '#FAEBD7'); // with DefaultColors
  assertEquals(Color.toHex(0xffffff).toUpperCase(), '#FFFFFF'); // with number value
  assertEquals(Color.toHex(Color.resolve({ r: 255, g: 255, b: 255 })).toUpperCase(), '#FFFFFF'); // with rgb object
});

Deno.test('Color.toRGB()', () => {
  assertObjectMatch(Color.toRGB(Color.resolve('AntiqueWhite')), { r: 250, g: 235, b: 215 }); // with DefaultColors
  assertObjectMatch(Color.toRGB(0xffffff), { r: 255, g: 255, b: 255 }); // with number value
  assertObjectMatch(Color.toRGB(Color.resolve('#fff')), { r: 255, g: 255, b: 255 }); // with rgb object
});
