import { Inject, Singleton } from "@tenon/shared";
import { WorkbenchEvents } from "../core";
import { Service } from "../decorators";
import { EventEmitterCore, EventEmitterService } from "./event-emitter";
import { createServiceTag } from "./tag";

export enum InternalUIService {
  HeaderBar = 'HeaderBar',
  ToolBar = 'ToolBar',
  FootBar = 'FootBar',
  Custom = 'Custom',
};

export interface ActionInfo {
  name: string;
  action: string;
  from: InternalUIService;
};

export const ActionInfoService = createServiceTag('ActionInfo');

@Service({
  name: ActionInfoService,
})
@Singleton
export class ActionInfo {
  info: ActionInfo = {} as ActionInfo;

  constructor(
    @Inject(EventEmitterService) private eventEmitter: EventEmitterCore,
  ) {
    this.eventEmitter.on(
      WorkbenchEvents.emitAction,
      (actionInfo: ActionInfo) => {
        Object.assign(this.info, actionInfo);
      }
    );
    return this.info;
  }
}