// The utility functions here are for the development phase.

export const Debug = <T extends { new (...args: any[]): any }>(
  constructor: T
) => {
  return class extends constructor {
    debug() {
      const o = {
        [constructor.name]: {}
      } as any;

      const keys = Reflect.ownKeys(constructor.prototype);
      for (const key of keys) {
        if (key === 'constructor') continue;
        const value = Reflect.get(this, key);
        o[constructor.name][key] = value;
      }
      console.log('%s %O', constructor.name, o[constructor.name]);
    }
  };
};
