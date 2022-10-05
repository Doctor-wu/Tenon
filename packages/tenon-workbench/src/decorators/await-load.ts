import { workbenchDIState } from '../core/di-state';
import { FeatureTag } from './feature';
import { LoaderTag } from './loader';


type awaitLoadType = (...tags: FeatureTag[]) => MethodDecorator;

export const awaitLoad: awaitLoadType = (...tags: FeatureTag[]) => {
  return (target, propertyKey, desc) => {
    const oldInvoke = desc.value! as unknown as Function;
    desc.value = function(...args) {
      Promise.all(
        tags.map(tag => {
          return workbenchDIState.get(tag);
        }),
      ).then(async () => {
        for (let featureKey of Object.getOwnPropertySymbols(target[LoaderTag] || {})) {
          if (tags.includes(featureKey)) {
            await target[LoaderTag][featureKey].getInstance();
          }
        }
        oldInvoke.call(target, ...args);
      });
    } as any;
  }
}