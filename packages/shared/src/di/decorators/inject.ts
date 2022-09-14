import { ServiceTag } from "./service"

export const InjectTag = Symbol('Inject');

export const Inject: (injectionName: any) => ParameterDecorator = (injectionName: string) => {
  return (target, propertyKey, parameterIndex) => {
    if (!target[ServiceTag]) {
      target[InjectTag] = target[InjectTag] || new Map<number, string>();
      target[InjectTag].set(parameterIndex, injectionName);
    } else {
      const deps = target[ServiceTag].deps;
      deps.set(parameterIndex, injectionName);
    }
  }
}