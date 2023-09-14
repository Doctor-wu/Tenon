import { TenonEventManager } from './event-manager';
import { IDynamicFeature, Inject, Loader, Service, awaitLoad } from "@tenon/workbench";
import { IContext, IDataEngine } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from '../notifications/model-notification';
import { Logger } from '@/utils/logger';
import { ServiceName, UndoRedoService } from '@/services';
import { BaseMutation, ModelImpl, ModelHost } from '@tenon/engine';


@Service({
  name: IDataEngine,
})
export class TenonDataEngine<Model extends ModelImpl[ModelHost]> {
  runtimeRoot: Model;
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
  setRoot(root: Model) {
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
