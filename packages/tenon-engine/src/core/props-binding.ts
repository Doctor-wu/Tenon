import { cloneDeep } from "lodash";
import { TenonComponent } from "./component";
import { PropsBindingStaticHooksKey, TenonPropsBindingStaticHook } from "./hooks/props-binding-static";

export interface ITenonPropsBinding<T = any> {
  tenonComponent: TenonComponent;
  addBinding: (fieldName: string, propsKey: string, value: any) => void;
  setBinding: (fieldName: string, propsKey: string, value: any) => void;
  deleteBinding: (fieldName: string, propsKey: string) => void;
  hasBinding: (fieldName: string, propsKey: string) => boolean;
  getBinding: (fieldName: string, propsKey: string) => T | undefined;
  serialize: () => string;
  clone: (tenonComponent: TenonComponent) => ITenonPropsBinding<T>;
}

export class TenonPropsBinding<T = any> implements ITenonPropsBinding<T>{
  public _bindings = new Map<string, T>();
  public _bindingKeys = new Set<string>();

  public makeKey(fieldName, propsKey) {
    return `${fieldName}@${propsKey}`;
  }

  public extractKey(key: string) {
    return key.split('@');
  }

  public static staticHook: TenonPropsBindingStaticHook = new TenonPropsBindingStaticHook();

  public tenonComponent: TenonComponent;

  constructor(tenonComponent: TenonComponent) {
    this.tenonComponent = tenonComponent;
  }

  clone(tenonComponent: TenonComponent): TenonPropsBinding<T> {
    const cloneInstance = new TenonPropsBinding(tenonComponent);
    Array.from(this._bindingKeys.keys()).forEach(key => {
      const [fieldName, propsKey] = this.extractKey(key);
      cloneInstance.addBinding(fieldName, propsKey, this._bindings.get(key));
    });
    return cloneInstance;
  }

  addBinding(fieldName, propsKey, value) {
    const key = this.makeKey(fieldName, propsKey);
    this._bindingKeys.add(key);
    this._bindings.set(key, value);
    TenonPropsBinding.staticHook.executeHook(
      PropsBindingStaticHooksKey.afterAddingBinding, this.tenonComponent,
      fieldName,
      propsKey,
      value,
    );
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

  static createInstanceByDeserialize(configStr, tenonComponent: TenonComponent) {
    const instance = new TenonPropsBinding(tenonComponent);
    const config = JSON.parse(configStr);
    Object.keys(config).forEach(key => {
      const [fieldName, propsKey] = key.split('@');
      instance.addBinding(fieldName, propsKey, config[key]);
    });
    return instance;
  }
}