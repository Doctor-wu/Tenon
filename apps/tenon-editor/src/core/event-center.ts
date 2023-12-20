import {
  DrawerService,
  DrawerServiceCore,
  EventEmitterCore,
  EventEmitterService,
  Inject,
  Service,
  WorkbenchEvents,
} from "@tenon/workbench";
import { IContext, IEventCenter, TenonEditorContext } from ".";
import {
  DrawerDisplayTypeNotification,
  DrawerNotification,
  LeftDrawerNotificationType,
  RightDrawerNotificationType,
} from "./notifications";
import { fromEvent, throttleTime } from "rxjs";
import { WindowDisposeNotification, WindowResizeNotification } from "./notifications/common-notification";

@Service({
  name: IEventCenter,
})
export class TenonEditorEventCenter {
  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
    @Inject(IContext) private context: TenonEditorContext,
    @Inject(DrawerService) private drawerService: DrawerServiceCore,
  ) {
    this.initCommonEvent();
    this.wrapDrawerEvent();
    this.listenDrawerPin();
  }

  initCommonEvent() {
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(100, undefined, { leading: true }),
      )
      .subscribe(() => {
        this.context.fire(new WindowResizeNotification());
      });

    fromEvent(window, 'onbeforeunload')
      .subscribe(() => {
        this.context.fire(new WindowDisposeNotification());
      })
  }

  wrapDrawerEvent() {
    this.eventEmitter.on(
      WorkbenchEvents.drawerChanged,
      ({ alignment, state, fromInternal }) => {
        if (!state) {
          if (fromInternal) {
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
          const type = alignment === "left"
            ? LeftDrawerNotificationType.CLOSE_LEFT_DRAWER
            : RightDrawerNotificationType.CLOSE_RIGHT_DRAWER;
          this.context.fire(
            new DrawerNotification(
              type,
              alignment,
            )
          );
        } else {
          const type = alignment === "left"
            ? LeftDrawerNotificationType.OPEN_LEFT_DRAWER
            : RightDrawerNotificationType.OPEN_RIGHT_DRAWER;
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

  listenDrawerPin() {
    (['left', 'right'] as const).forEach((alignment) => {
      this.drawerService[alignment].bridge.register(
        'updateDisplayType',
        (type) => {
          this.context.fire(
            new DrawerDisplayTypeNotification(
              type,
              alignment,
            )
          );
        }
      );
    });
  }
}
