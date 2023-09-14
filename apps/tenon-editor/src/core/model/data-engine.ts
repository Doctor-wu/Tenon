import { TenonEventManager } from './event-manager';
import { RuntimeTreeNode } from './data-structure/runtime-tree/runtime-tree';
import { IDynamicFeature, Inject, Loader, Service, awaitLoad } from "@tenon/workbench";
import { IContext, IDataEngine } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from '../notifications/model-notification';
import { Logger } from '@/utils/logger';
import { BaseMutation } from './mutations';
import { ServiceName, UndoRedoService } from '@/services';


@Service({
  name: IDataEngine,
})
export class TenonDataEngine {
  runtimeRoot: RuntimeTreeNode;
  eventManager: TenonEventManager;

  @Loader(IContext)
  private contextLoader: IDynamicFeature<TenonEditorContext>;

  get [IContext]() {
    return this.contextLoader.instance!;
  }

  constructor(
    @Inject(ServiceName.UndoRedoService) private undoRedoService: UndoRedoService,
  ) {
    Logger.log('TenonDataEngine init');
  }

  @awaitLoad(IContext)
  setRoot(root: RuntimeTreeNode) {
    this.runtimeRoot = root;
    this[IContext].fire(new ModelChangeNotification(this.runtimeRoot));
  }

  @awaitLoad(IContext)
  invoke(...mutations: BaseMutation[]) {
    mutations.forEach(mutation => {
      mutation.handle();
    });
    this.undoRedoService.pushUndo(mutations);
    this[IContext].fire(new ModelChangeNotification(this.runtimeRoot));
  }
}
