import { assertThrows, assertObjectMatch } from 'https://deno.land/std/testing/asserts.ts';
import { ClientOptions } from '../../src/Options/mod.ts';

Deno.test('ClientOptions', () => {
  assertThrows(
    () => {
      // @ts-expect-error - parameters is missing
      new ClientOptions();
    },
    TypeError,
    'options must be an object'
  );

  assertThrows(
    () => {
      // @ts-expect-error - token is not defined
      new ClientOptions({});
    },
    TypeError,
    'token must be a string'
  );

  const clientOptions = new ClientOptions({ token: 'youramazingtokenhere' });
  assertObjectMatch(clientOptions.toObject(), { token: 'youramazingtokenhere' });
});
