import { WorkbenchDIServiceCore } from '../services';
import { ControllerKeyName } from './controller';
import { FeatureTag } from './feature';
import { LoaderTag } from './loader';
import { ServiceNameKey } from './service';


type awaitLoadType = (...tags: FeatureTag[]) => MethodDecorator;

export const awaitLoad: awaitLoadType = (...tags: FeatureTag[]) => {
  return (target, propertyKey, desc) => {
    const di = new WorkbenchDIServiceCore();
    const oldInvoke = desc.value! as unknown as Function;
    desc.value = function (this: any, ...args) {
      return Promise.all(
        tags.map(tag => {
          return di.get(tag);
        }),
      ).then(async () => {
        for (let featureKey of Object.getOwnPropertySymbols(target[LoaderTag] || {})) {
          if (tags.includes(featureKey)) {
            await target[LoaderTag][featureKey].getInstance();
          }
        }
        return await oldInvoke.call(
          di.instances.get(getTargetName(target)) || this,
          ...args
        );
      });
    } as any;
  }
}

function getTargetName(prototype) {
  if (prototype[ServiceNameKey]) return prototype[ServiceNameKey];
  if (prototype[ControllerKeyName]) return prototype[ControllerKeyName];
}
