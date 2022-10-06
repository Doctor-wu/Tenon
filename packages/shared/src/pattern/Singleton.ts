import { newable } from '@tenon/shared';

type SingletonType = <T extends { new(...args: any[]): any }>(cls: T) => T;

export const Singleton: SingletonType = <T extends newable<any, any>>(cls: T) => {
  let instance: any;
  return class extends cls {
    constructor(...args: any[]) {
      super(...args);
      if (!instance) {
        instance = this;
      }
      return instance;
    };
  } as T;
};
