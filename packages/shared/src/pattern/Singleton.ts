export const Singleton = (cls: { new(...args: any[]): any }) => {
  let instance: any;
  return class extends cls {
    constructor(...args: any[]) {
      super(...args);
      if (!instance) {
        instance = this;
      }
      return instance;
    }
  };
}