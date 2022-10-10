import { EventEmitterCore } from "./event-emitter";
export declare enum InternalUIService {
    HeaderBar = "HeaderBar",
    ToolBar = "ToolBar",
    FootBar = "FootBar"
}
export interface ActionInfo {
    name: string;
    action: string;
    from: InternalUIService;
}
export declare const ActionInfoService: symbol;
export declare class ActionInfo {
    private eventEmitter;
    info: ActionInfo;
    constructor(eventEmitter: EventEmitterCore);
}
