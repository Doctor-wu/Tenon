import { TenonEventManager } from './event-manager';
import { IDynamicFeature, Loader, Service, awaitLoad } from "@tenon/workbench";
import { IContext, IDataEngine } from '../interface';
import { TenonEditorContext } from '../context';
import { ModelChangeNotification } from '../notifications/model-notification';
import { Logger } from '@/utils/logger';
import { BaseMutation, ModelImpl, ModelHost } from '@tenon/engine';
import { InvokeMutationNotification } from '../notifications/mutation-notification';

@Service({
  name: IDataEngine,
})
export class TenonDataEngine<Model extends ModelImpl[ModelHost]> {
  type: Model['type'];
  root: Model;
  eventManager: TenonEventManager;

  @Loader(IContext)
  private contextLoader: IDynamicFeature<TenonEditorContext>;

  get context() {
    return this.contextLoader.instance!;
  }

  constructor() {
    Logger.log('TenonDataEngine init');
  }

  @awaitLoad(IContext)
  setRoot(root: Model) {
    this.type = root.type;
    this.root = root;
    this.context.fire(new ModelChangeNotification(this.root));
  }

  @awaitLoad(IContext)
  invoke(...mutations: BaseMutation[]) {
    this.invokeMutations(...mutations);
    this.context.fire(new InvokeMutationNotification(mutations));
  }

  /**
   * 不触发通知的 invoke
   * 目前仅用于 undo/redo
   * 因为 undo/redo 内部通过监听 InvokeMutations 通知来更新状态
   * 如果在 undo/redo 时触发通知，会导致 undo/redo 无法正常工作
   */
  invokeWithoutNotification(...mutations: BaseMutation[]) {
    this.invokeMutations(...mutations);
  }

  private invokeMutations(...mutations: BaseMutation[]) {
    mutations.forEach(mutation => {
      mutation.handle();
    });
    this.context.fire(new ModelChangeNotification(this.root));
  }
}
