import { EventEmitterCore } from "@tenon/workbench";
import { IFireOptions } from "./interface";
import { BaseNotification } from "./notifications/base-notification";

export class NotificationManager {
  private throttleMap = new Map<string | symbol, number>();
  private timerMap = new Map<string | symbol, ReturnType<typeof setTimeout>>();

  constructor(public eventEmitter: EventEmitterCore) { }

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
    return () => {
      this.eventEmitter.cancel(type, fn);
    };
  }

  once<
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
    this.eventEmitter.once(type, fn);
  }

  cancel<
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
    this.eventEmitter.cancel(type, fn);
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
