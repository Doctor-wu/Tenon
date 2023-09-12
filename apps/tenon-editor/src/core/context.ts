import {
  EventEmitterCore,
  EventEmitterService,
  Inject,
  Service,
} from "@tenon/workbench";
import { BaseNotification } from "./notifications/base-notification";
import { IContext, IFireOptions } from "./interface";

@Service({
  name: IContext,
})
export class TenonEditorContext {
  private throttleMap = new Map<string | symbol, number>();
  private timerMap = new Map<string | symbol, ReturnType<typeof setTimeout>>();
  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore
  ) { }

  on<
    Notification extends any = "__base-notification",
    Type extends string | symbol = string
  >(
    type: Type,
    fn: (
      notification: Notification extends "__base-notification"
        ? BaseNotification<Type>
        : Notification
    ) => any
  ) {
    this.eventEmitter.on(type, fn);
  }

  fire<Notification extends BaseNotification<string | symbol>>(notification: Notification, options: IFireOptions = {}) {
    if (options.throttle) {
      // 节流
      const now = Date.now();
      const last = this.throttleMap.get(notification.type);
      if (last && now - last < options.throttle) {
        this.timerMap.get(notification.type)
          && clearTimeout(this.timerMap.get(notification.type)!);
        this.timerMap.set(notification.type, setTimeout(() => {
          this.fire(notification);
        }, options.throttle - (now - last)));
        return;
      } else {
        this.throttleMap.set(notification.type, now);
      }
    }
    this.eventEmitter.emit(notification.type, notification);
  }
}
