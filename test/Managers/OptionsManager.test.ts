import { assertObjectMatch, assertThrows } from 'https://deno.land/std/testing/asserts.ts';
import { OptionsManager } from '../../src/Managers/mod.ts';
import { ClientOptions } from '../../src/Options/ClientOptions.ts';
import { WSOptions } from '../../src/Options/WSOptions.ts';

Deno.test('OptionsManager', () => {
  assertThrows(
    () => {
      // @ts-expect-error - arguments is missing
      new OptionsManager();
    },
    TypeError,
    'options must be an object'
  );

  assertThrows(
    () => {
      // @ts-expect-error - ws is not instance of WSOptions
      new OptionsManager({});
    },
    TypeError,
    'ws must be an instance of WSOptions'
  );

  assertThrows(
    () => {
      // @ts-expect-error - client is not instance of ClientOptions
      new OptionsManager({ ws: WSOptions.defaults({ intents: 0 }) });
    },
    TypeError,
    'client must be an instance of ClientOptions'
  );

  const optionsManager = new OptionsManager({
    ws: WSOptions.defaults({ intents: 0, compress: true }),
    client: new ClientOptions({ token: 'youramazingtokenhere' })
  });

  assertObjectMatch(optionsManager.toObject(), {
    ws: {
      largeThreshold: 50,
      intents: 0,
      compress: true,
      encoding: 'json'
    },
    client: {
      token: 'youramazingtokenhere'
    }
  });
});
