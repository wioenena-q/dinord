import { assertEquals, assertObjectMatch } from 'https://deno.land/std/testing/asserts.ts';
import {
  isArray,
  isBoolean,
  isFunction,
  isInstanceOf,
  isNumber,
  isObject,
  isString,
  toObject
} from '../../src/Utils/Utils.ts';

Deno.test('isArray', () => {
  assertEquals(isArray([1, 2, 3]), true);
  assertEquals(isArray(Array.from({ length: 10 })), true);
  assertEquals(isArray([...[1, 2, 3]]), true);
  assertEquals(isArray({}), false);
  assertEquals(isArray(1), false);
  assertEquals(isArray(true), false);
  assertEquals(
    isArray(() => {}),
    false
  );
});

Deno.test('isString', () => {
  assertEquals(isString(''), true);
  assertEquals(isString(1), false);
  assertEquals(isString({}), false);
  assertEquals(isString(true), false);
  assertEquals(
    isString(() => {}),
    false
  );
});

Deno.test('isNumber', () => {
  assertEquals(isNumber(1), true);
  assertEquals(isNumber(''), false);
  assertEquals(isNumber({}), false);
  assertEquals(isNumber(true), false);
  assertEquals(
    isNumber(() => {}),
    false
  );
});

Deno.test('isObject', () => {
  assertEquals(isObject({}), true);
  assertEquals(isObject([]), true);
  assertEquals(isObject(1), false);
  assertEquals(isObject(''), false);
  assertEquals(isObject(true), false);
  assertEquals(
    isObject(() => {}),
    false
  );

  class Class {}
  assertEquals(isObject(new Class()), true);
  assertEquals(isObject(Class), false);
});

Deno.test('isFunction', () => {
  assertEquals(
    isFunction(() => {}),
    true
  );
  assertEquals(
    isFunction(() => 1),
    true
  );
  assertEquals(
    isFunction(function () {}),
    true
  );
  assertEquals(isFunction(1), false);
  assertEquals(isFunction(''), false);
  assertEquals(isFunction({}), false);
  assertEquals(isFunction(true), false);
  class Class {}
  assertEquals(isFunction(Class), true);
  assertEquals(isFunction(new Class()), false);
});

Deno.test('isBoolean', () => {
  assertEquals(isBoolean(true), true);
  assertEquals(isBoolean(false), true);
  assertEquals(isBoolean(!!{}), true);
  assertEquals(isBoolean(1), false);
  assertEquals(isBoolean(''), false);
  assertEquals(isBoolean({}), false);
  assertEquals(
    isBoolean(() => {}),
    false
  );
});

Deno.test('isInstanceOf', () => {
  class Class {
    prop = 10;
  }
  assertEquals(isInstanceOf(new Class(), Class), true);
  assertEquals(isInstanceOf(Class, Class), false);
  assertEquals(isInstanceOf(1, Class), false);
  assertEquals(isInstanceOf('', Class), false);
  assertEquals(isInstanceOf({}, Class), false);
  assertEquals(isInstanceOf(true, Class), false);
  assertEquals(
    isInstanceOf(() => {}, Class),
    false
  );

  let v: unknown = {};

  if (!isInstanceOf(v, Class)) {
    // @ts-expect-error - not instance of Class
    v.prop;
  }
});

Deno.test('toObject', () => {
  class First {
    a = 10;
    b = [1, 2, 3];
    c = {
      a: 1
    };
    d = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ]);
    e = new Set([1, 2, 3]);
    f = new Second();

    toObject() {
      return toObject(this, Object.keys(this));
    }
  }

  class Second {
    a = 20;

    toObject() {
      return toObject(this, ['a']);
    }
  }

  const obj = new First();
  assertObjectMatch(obj.toObject(), {
    a: 10,
    b: [1, 2, 3],
    c: {
      a: 1
    },
    d: new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3]
    ]),
    e: new Set([1, 2, 3]),
    f: {
      a: 20
    }
  });
});
