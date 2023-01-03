import { ProvideServiceTag, ServiceDecoratorTag } from "../services";
import { ActionControllerKey } from "./action-controller";
import { UIControllerKey } from "./bar-controller";
import { ServiceHandler } from "./service";

export const ControllerKeyName = Symbol('ControllerKeyName');

export const Controller: ({ name }) => ClassDecorator = ({ name }) => (target) => {
  target.prototype[ActionControllerKey] = target.prototype[ActionControllerKey] || {};
  target.prototype[UIControllerKey] = target.prototype[UIControllerKey] || {};
  target.prototype[ProvideServiceTag] = target.prototype[ProvideServiceTag] || new Set();
  target.prototype[ServiceDecoratorTag] = target.prototype[ServiceDecoratorTag] || new Map();
  target.prototype[ControllerKeyName] = name;
  ServiceHandler({ name })(target);
};
