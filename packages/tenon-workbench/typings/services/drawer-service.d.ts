import { Bridge } from "@tenon/shared";
import { VNode } from "vue";
import { EventEmitterCore } from "./event-emitter";
export declare enum DrawerDisplayType {
    Float = "float",
    Flow = "flow"
}
declare class DrawerServiceBase {
    bridge: Bridge<IDrawer>;
    layers: string[];
    visible: import("vue").Ref<boolean>;
    header: {
        showHeader?: boolean | undefined;
        showClose?: boolean | undefined;
    };
    alignment: 'left' | 'right';
    eventEmitter: EventEmitterCore;
    displayType: DrawerDisplayType;
    constructor(alignment: 'left' | 'right', eventEmitter: EventEmitterCore, displayType?: DrawerDisplayType);
    private detectEmpty;
    show(fromInternal?: boolean): void;
    close(fromInternal?: boolean): void;
    attachLayer(layerName: string, renderer: () => VNode): void;
    replaceLayer(layerName: string, renderer: () => VNode): void;
    detachLayer(name?: string): void;
    clearLayer(): void;
    setHeader(header: IDrawerHeader): void;
    setDisplayType(type: DrawerDisplayType): void;
}
export declare const DrawerService: symbol;
export interface IDrawer {
    attachLayer: (name: string, renderer: () => VNode) => void;
    clearLayer: () => void;
    detachLayer: (name?: string) => void;
    updateLayers: (layers: string[]) => void;
    updateDisplayType: (type: DrawerDisplayType) => void;
}
export interface IDrawerHeader {
    showHeader?: boolean;
    showClose?: boolean;
}
export declare class DrawerServiceCore {
    private eventEmitter;
    left: DrawerServiceBase;
    right: DrawerServiceBase;
    constructor(eventEmitter: EventEmitterCore);
}
export {};
