import { ServiceTag } from "./service"

export const InjectTag = Symbol('Inject');

export const Inject: (injectionName: any) => ParameterDecorator = (injectionName: string) => {
  return (target: any, propertyKey, parameterIndex) => {
    if (!target.prototype[ServiceTag]) {
      target.prototype[InjectTag] = target.prototype[InjectTag] || new Map<number, string>();
      target.prototype[InjectTag].set(parameterIndex, injectionName);
    } else {
      const deps = target.prototype[ServiceTag].deps;
      deps.set(parameterIndex, injectionName);
    }
  }
}