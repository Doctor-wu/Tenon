import { IComposeViewFeature } from '@/features/compose-view';
import { TenonEventManager } from './event-manager';
import { RuntimeTreeNode } from './data-structure/runtime-tree/runtime-tree';
import { IDynamicFeature, Inject, Loader, Service, awaitLoad, createServiceTag } from "@tenon/workbench";
import { IContext } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from './notification';
import { IRuntimeComponentTreeFeature } from '@/features/runtime-component-tree';
import { BaseMutation } from './mutations';

export const IDataEngine = createServiceTag('TenonDataEngine');

@Service({
  name: IDataEngine,
})
export class TenonDataEngine {
  runtimeRoot: RuntimeTreeNode;
  eventManager: TenonEventManager;

  constructor(
    @Inject(IContext) private context: TenonEditorContext,
  ) {
    console.log('TenonDataEngine init');
  }
}
