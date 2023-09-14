import {
  EventEmitterCore,
  EventEmitterService,
  Inject,
  Service,
} from "@tenon/workbench";
import { IContext, IDataEngine, IRendererManager, IStore } from "./interface";
import { NotificationManager } from "./notification-manager";
import { type RendererManager } from "./renderer";
import { type TenonDataEngine } from "./model";
import type { TenonEditorStore } from "./store";
import { ModelImpl, ModelType } from "@tenon/engine";

@Service({
  name: IContext,
})
export class TenonEditorContext extends NotificationManager {
  constructor(
    @Inject(EventEmitterService) public eventEmitter: EventEmitterCore,
    @Inject(IDataEngine) public dataEngine: TenonDataEngine<ModelImpl[ModelType]>,
    @Inject(IRendererManager) public rendererManager: RendererManager,
    @Inject(IStore) public store: TenonEditorStore,
  ) {
    super(eventEmitter);
  }
}
