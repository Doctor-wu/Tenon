import {
  EventEmitterCore,
  EventEmitterService,
  Inject,
  Service,
} from "@tenon/workbench";
import { IContext, IDataEngine, IRendererManager } from "./interface";
import { NotificationManager } from "./notification-manager";
import { type RendererManager } from "./renderer";
import { type TenonDataEngine } from "./model";
import { ModelImpl, ModelHost } from "@tenon/engine";

@Service({
  name: IContext,
})
export class TenonEditorContext extends NotificationManager {
  constructor(
    @Inject(EventEmitterService) public eventEmitter: EventEmitterCore,
    @Inject(IDataEngine) public dataEngine: TenonDataEngine<ModelImpl[ModelHost]>,
    @Inject(IRendererManager) public rendererManager: RendererManager,
  ) {
    super(eventEmitter);
  }
}
