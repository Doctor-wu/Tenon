import { Bridge } from "@tenon/shared";
import { VNode } from "vue";
import { EventEmitterCore } from "./event-emitter";
declare class DrawerServiceBase {
    bridge: Bridge<IDrawer>;
    layers: import("vue").Ref<string[]>;
    visible: import("vue").Ref<boolean>;
    header: import("vue").Ref<{
        showHeader?: boolean | undefined;
        showClose?: boolean | undefined;
    }>;
    alignment: 'left' | 'right';
    eventEmitter: EventEmitterCore;
    constructor(alignment: 'left' | 'right', eventEmitter: EventEmitterCore);
    private detectEmpty;
    show(): void;
    close(): void;
    attachLayer(layerName: string, renderer: () => VNode): void;
    replaceLayer(layerName: string, renderer: () => VNode): void;
    detachLayer(): void;
    clearLayer(): void;
    setHeader(header: IDrawerHeader): void;
}
export declare const DrawerService: symbol;
export interface IDrawer {
    attachLayer: (name: string, renderer: () => VNode) => void;
    clearLayer: () => void;
    detachLayer: () => void;
}
export interface IDrawerHeader {
    showHeader?: boolean;
    showClose?: boolean;
}
export declare class DrawerServiceCore {
    private eventEmitter;
    constructor(eventEmitter: EventEmitterCore);
    left: DrawerServiceBase;
    right: DrawerServiceBase;
}
export {};
