import { TenonEventManager } from './event-manager';
import { RuntimeTreeNode } from './data-structure/runtime-tree/runtime-tree';
import { Inject, Service, createServiceTag } from "@tenon/workbench";
import { IContext } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from '../notifications/model-notification';
import { Logger } from '@/utils/logger';

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
    Logger.log('TenonDataEngine init');
  }

  setRoot(root: RuntimeTreeNode) {
    this.runtimeRoot = root;
    this.context.fire(new ModelChangeNotification(this.runtimeRoot));
  }
}
