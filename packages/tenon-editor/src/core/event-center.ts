import {
  EventEmitterCore,
  EventEmitterService,
  Inject,
  Service,
  WorkbenchEvents,
} from "@tenon/workbench";
import { IContext, IEventCenter, TenonEditorContext } from ".";
import {
  DrawerNotification,
  LeftDrawerNotificationType,
  RightDrawerNotificationType,
} from "./notifications";

@Service({
  name: IEventCenter,
})
export class TenonEditorEventCenter {
  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
    @Inject(IContext) private context: TenonEditorContext
  ) {
    console.log("event manager", eventEmitter, context);
    this.wrapDrawerEvent();
  }

  wrapDrawerEvent() {
    this.eventEmitter.on(
      WorkbenchEvents.drawerChanged,
      ({ alignment, state, fromInternal }) => {
        if (fromInternal && !state) {
          const type = alignment === "left"
            ? LeftDrawerNotificationType.ClOSE_FROM_INTERNAL
            : RightDrawerNotificationType.ClOSE_FROM_INTERNAL;
          this.context.fire(
            new DrawerNotification(
              type,
              alignment,
            )
          );
        }
      }
    );
  }
}
