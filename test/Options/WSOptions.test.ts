import { WSOptions } from '../../src/Options/mod.ts';
import { assertThrows, assertObjectMatch } from 'https://deno.land/std/testing/asserts.ts';

Deno.test('WSOptions', () => {
  assertThrows(
    () => {
      // @ts-expect-error - parameters is missing
      new WSOptions();
    },
    TypeError,
    'WS options must be an object'
  );

  assertThrows(
    () => {
      // @ts-expect-error - parameters is not defined
      new WSOptions({});
    },
    TypeError,
    'largeThreshold must be a number'
  );

  assertThrows(
    () => {
      // @ts-expect-error - largeThreshold is not valid range
      new WSOptions({ largeThreshold: 49 });
    },
    RangeError,
    'largeThreshold must be between 50 and 250'
  );

  assertThrows(
    () => {
      // @ts-expect-error - largeThreshold is not valid range
      new WSOptions({ largeThreshold: 251 });
    },
    RangeError,
    'largeThreshold must be between 50 and 250'
  );

  assertThrows(
    () => {
      // @ts-expect-error - compress is not a boolean
      new WSOptions({ largeThreshold: 50, compress: 1 });
    },
    TypeError,
    'compress must be a boolean'
  );

  assertThrows(
    () => {
      // @ts-expect-error - encoding is not defined
      new WSOptions({ largeThreshold: 50, compress: false });
    },
    TypeError,
    'encoding must be a string'
  );

  assertThrows(
    () => {
      // @ts-expect-error - encoding is not "etf" or "json"
      new WSOptions({ largeThreshold: 50, compress: false, encoding: 'kawaii' });
    },
    Error,
    'encoding must be either "etf" or "json"'
  );

  assertThrows(
    () => {
      // @ts-expect-error - intents is not a number
      new WSOptions({ largeThreshold: 50, compress: false, encoding: 'json' });
    },
    TypeError,
    'intents must be a number'
  );

  const wsOptions = new WSOptions({
    largeThreshold: 90,
    compress: true,
    encoding: 'etf',
    intents: 1
  });

  assertObjectMatch(wsOptions.toObject(), {
    largeThreshold: 90,
    compress: true,
    encoding: 'etf',
    intents: 1
  });
});

Deno.test('WSOptions.defaults', () => {
  assertThrows(
    () => {
      // @ts-expect-error - options is not an object
      WSOptions.defaults();
    },
    TypeError,
    'options must be an object'
  );

  assertThrows(
    () => {
      // @ts-expect-error - options is not an object
      WSOptions.defaults(1);
    },
    TypeError,
    'options must be an object'
  );

  assertThrows(
    () => {
      // @ts-expect-error - intents is not a number
      WSOptions.defaults({});
    },
    TypeError,
    'intents must be a number'
  );

  const wsOptions = WSOptions.defaults({ intents: 1 });
  assertObjectMatch(wsOptions.toObject(), {
    largeThreshold: 50,
    compress: false,
    encoding: 'json',
    intents: 1
  });
});
