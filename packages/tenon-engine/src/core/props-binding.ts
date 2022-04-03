
export interface ITenonPropsBinding<T = any> {
  addBinding: (fieldName: string, propsKey: string, value: any) => void;
  deleteBinding: (fieldName: string, propsKey: string) => void;
  hasBinding: (fieldName: string, propsKey: string) => boolean;
  getBinding: (fieldName: string, propsKey: string) => T | undefined;
  serialize: () => string;
}

export class TenonPropsBinding<T = any> implements ITenonPropsBinding<T>{
  public _bindings = new Map<string, T>();
  public _bindingKeys = new Set<string>();

  public makeKey(fieldName, propsKey) {
    return `${fieldName}@${propsKey}`;
  }

  addBinding(fieldName, propsKey, value) {
    const key = this.makeKey(fieldName, propsKey);
    this._bindingKeys.add(key);
    this._bindings.set(key, value);
  }

  deleteBinding(fieldName, propsKey) {
    const key = this.makeKey(fieldName, propsKey);
    this._bindingKeys.delete(key);
    this._bindings.delete(key);
  }

  setBinding(fieldName, propsKey, value) {
    const key = this.makeKey(fieldName, propsKey);
    this._bindings.set(key, value);
  }

  hasBinding(fieldName, propsKey) {
    const key = this.makeKey(fieldName, propsKey);
    return this._bindingKeys.has(key);
  }

  getBinding(fieldName, propsKey) {
    const key = this.makeKey(fieldName, propsKey);
    return this._bindings.get(key);
  }

  serialize() {
    const result = {};
    Array.from(this._bindings.entries()).forEach(([key, value]) => {
      result[key] = value;
    });
    return JSON.stringify(result);
  }

  static createInstanceByDeserialize(configStr) {
    const instance = new TenonPropsBinding();
    const config = JSON.parse(configStr);
    Object.keys(config).forEach(key => {
      instance._bindingKeys.add(key);
      instance._bindings.set(key, config[key]);
    });
    return instance;
  }
}