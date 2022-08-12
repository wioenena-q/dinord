export const getTimestampFromId = (id: string): number => {
  const bId = BigInt(id);
  return Number((bId >> 22n) + 1420070400000n);
};

export const isArray = (val: unknown): val is unknown[] => isInstanceOf(val, Array) && Array.isArray(val);

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const isObject = <O = Record<PropertyKey, unknown>>(val: unknown): val is O =>
  val !== null && typeof val === 'object';

export const isFunction = (val: unknown): val is (...args: unknown[]) => unknown => typeof val === 'function';

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

export const isInstanceOf = <T extends { new (...args: never[]): unknown }>(
  val: unknown,
  cls: T
): val is InstanceType<T> => val instanceof cls;

export const toObject = (target: any, keys: string[]): Record<PropertyKey, unknown> => {
  // https://stackoverflow.com/questions/33605775/es6-dynamic-class-names
  const o = new { [target.constructor.name]: class {} }[target.constructor.name]();

  for (const key of keys) {
    const value = Reflect.get(target, key);
    Object.defineProperty(o, key, {
      value: isFunction(value?.toObject) ? value.toObject() : value,
      enumerable: true
    });
  }

  return o as Record<PropertyKey, unknown>;
};

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
