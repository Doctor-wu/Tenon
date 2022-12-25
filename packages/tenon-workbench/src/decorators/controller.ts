import { ProvideServiceTag, ServiceDecoratorTag } from "../services";
import { ActionControllerKey } from "./action-controller";
import { UIControllerKey } from "./bar-controller";

export const Controller: () => ClassDecorator = () => (target) => {
  target.prototype[ActionControllerKey] = target.prototype[ActionControllerKey] || {};
  target.prototype[UIControllerKey] = target.prototype[UIControllerKey] || {};
  target.prototype[ProvideServiceTag] = target.prototype[ProvideServiceTag] || new Set();
  target.prototype[ServiceDecoratorTag] = target.prototype[ServiceDecoratorTag] || new Map();
};
