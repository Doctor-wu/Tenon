import { newable } from '@tenon/shared';

type SingletonType = <T extends { new(...args: any[]): any }>(cls: T) => T;

export const Singleton: SingletonType = <T extends newable<any, any>>(SingleCtor: T) => {
  let instance: any;
  return new Proxy(SingleCtor, {
    construct(target, argArray, newTarget) {
      if (!instance) instance = Reflect.construct(target, argArray, newTarget);
      return instance;
    },
  });
};
