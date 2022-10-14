import { ProvideService } from "../services";

type ActionControllerType = (name: any, action: ActionType) => MethodDecorator;

export const ActionControllerKey = Symbol('ActionController');

export enum ActionType {
  onClick = 'onClick',
  onActive = 'onActive',
  onDeActive = 'onDeActive',
}

export const ActionController: ActionControllerType = (name: any, action: ActionType) => {
  return (target, propertyKey, desc) => {
    ProvideService(target, propertyKey, desc);
    const oldValue: any = desc.value;
    target[ActionControllerKey] = target[ActionControllerKey] || {};
    target[ActionControllerKey][name] = target[ActionControllerKey][name] || {};
    target[ActionControllerKey][name][action] = target[ActionControllerKey][name][action] || [];
    target[ActionControllerKey][name][action].push(() => oldValue.call(target));
  }
}