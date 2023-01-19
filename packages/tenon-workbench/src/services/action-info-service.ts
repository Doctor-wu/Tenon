import { Singleton } from "@tenon/shared";
import { WorkbenchEvents } from "../core";
import { ActionType, Service } from "../decorators";
import { EventEmitterCore } from "./event-emitter";
import { createServiceTag } from "./tag";

export enum InternalUIService {
  HeaderBar = 'HeaderBar',
  ToolBar = 'ToolBar',
  FootBar = 'FootBar',
  Drawer = 'Drawer',
};

export type CustomActionFrom = string;

export type ActionFrom = InternalUIService | CustomActionFrom;
export interface ActionInfo<Name = string, Action = ActionType, From = ActionFrom> {
  name: Name;
  action: Action;
  from: From;
};

export const ActionInfoService = createServiceTag('ActionInfo');

@Service({
  name: ActionInfoService,
})
@Singleton
export class ActionInfo<Name = string, Action = ActionType, From = ActionFrom> {
  info: ActionInfo<Name, Action, From> = {} as ActionInfo<Name, Action, From>;

  constructor(
    private eventEmitter: EventEmitterCore,
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
