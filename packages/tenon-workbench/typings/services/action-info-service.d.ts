import { ActionType } from "../decorators";
import { EventEmitterCore } from "./event-emitter";
export declare enum InternalUIService {
    HeaderBar = "HeaderBar",
    ToolBar = "ToolBar",
    FootBar = "FootBar",
    Drawer = "Drawer",
    Custom = "Custom"
}
export interface ActionInfo<Name = string, Action = ActionType, From = InternalUIService> {
    name: Name;
    action: Action;
    from: From;
}
export declare const ActionInfoService: symbol;
export declare class ActionInfo<Name = string, Action = ActionType, From = InternalUIService> {
    private eventEmitter;
    info: ActionInfo<Name, Action, From>;
    constructor(eventEmitter: EventEmitterCore);
}
