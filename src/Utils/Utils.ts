export const isArray = <T>(val: unknown): val is T[] => isInstanceOf(val, Array) && Array.isArray(val);

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

export const isBigInt = (val: unknown): val is bigint => typeof val === 'bigint';

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

export const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Add a non-writable property to the object
 * @param target - The target object
 * @param prop - Property key
 * @param value - Value
 * @param attrs - Attributes, if any
 */
export const defineReadonlyProperty = <T, P extends keyof T>(
  target: T,
  prop: P,
  value: T[P],
  attrs: PropertyDescriptor = {}
) => {
  Object.defineProperty(target, prop, {
    ...attrs,
    writable: false,
    value
  });
};
