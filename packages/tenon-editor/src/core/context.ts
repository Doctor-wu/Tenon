import {
  EventEmitterCore, EventEmitterService, Inject, Service, createSyncFeatureTag
} from "@tenon/workbench";
import { BaseNotification } from "./notification";

export const IContext = createSyncFeatureTag('tenon-editor-context');

@Service({
  name: IContext,
})
export class TenonEditorContext {

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
  }

  on<
    Notification extends any = '__base-notification',
    Type extends string = string
  >(
    type: Type,
    fn: (notification: Notification extends '__base-notification' ? BaseNotification<Type> : Notification) => any,
  ) {
    this.eventEmitter.on(type, fn);
  }

  fire<Notification extends BaseNotification>(notification: Notification) {
    this.eventEmitter.emit(notification.type, notification);
  }
}
