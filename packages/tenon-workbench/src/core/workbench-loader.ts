import { Subscribe } from "@tenon/shared";
import { WorkbenchEvents } from "./events";


export class WorkbenchLoader {
  eventEmitter!: Subscribe;
  load(el: HTMLElement) {
    this.eventEmitter.emit(
      WorkbenchEvents.Load,
      el,
    );
  }
}