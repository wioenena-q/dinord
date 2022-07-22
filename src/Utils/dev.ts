// The utility functions here are for the development phase.

import { IConstructor } from './Types.ts';

const Debug = (constructor: IConstructor): any => {
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

function Todo(constructor: IConstructor): void;
function Todo(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
function Todo(target: any, propertyKey: string): void;
function Todo(...args: unknown[]): void {
  switch (args.length) {
    case 1: {
      const [constructor] = args as [IConstructor];
      console.log(`class ${constructor.name} is not yet implemented.`);
      break;
    }
    case 2: {
      const [target, propertyKey] = args as [any, string];
      console.log(`${target.constructor.name}.${propertyKey} is not yet implemented.`);
      break;
    }
    case 3: {
      const [target, propertyKey] = args as [any, string, PropertyDescriptor];
      console.log(
        `method ${target.constructor.name} -> ${propertyKey} is not yet implemented.`
      );
      break;
    }
  }
}

export { Todo, Debug };
