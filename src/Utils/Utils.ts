export const getTimestampFromId = (id: string): number => {
  const bId = BigInt(id);
  return Number((bId >> 22n) + 1420070400000n);
};

export const isArray = (val: unknown): val is unknown[] =>
  isInstanceOf<Array<unknown>>(val, Array) && Array.isArray(val);

export const isString = (val: unknown): val is string => typeof val === 'string';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const isObject = <O = Record<string | number | symbol, unknown>>(
  val: unknown
): val is O => val !== null && typeof val === 'object';

export const isFunction = (val: unknown): val is (...args: never[]) => unknown =>
  typeof val === 'function';

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';

export const isInstanceOf = <T>(
  val: unknown,
  cls: { new (...args: never[]): unknown }
): val is T => val instanceof cls;

export const toObject = (target: any, keys: string[]) => {
  return keys.reduce((acc, key) => {
    const value = Reflect.get(target, key);
    if (value !== undefined) {
      if (isObject(value)) {
        if (isFunction(value.toObject)) {
          acc[key] = value.toObject();
        } else acc[key] = value;
      } else acc[key] = value;
    }
    return acc;
  }, {} as Record<string | number | symbol, unknown>);
};
