type ActionControllerType = (name: any, action: string) => MethodDecorator;

export const ActionControllerKey = Symbol('ActionController');

export const ActionController: ActionControllerType = (name: any, action: string) => {
  return (target, propertyKey, desc) => {
    const oldValue = desc.value;
    target[ActionControllerKey] = target[ActionControllerKey] || {};
    target[ActionControllerKey][name] = target[ActionControllerKey][name] || {};
    target[ActionControllerKey][name][action] = target[ActionControllerKey][name][action] || [];
    target[ActionControllerKey][name][action].push(oldValue);
  }
}