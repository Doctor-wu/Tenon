import { Bridge } from "@tenon/shared";
import { VNode } from "vue";
declare class DrawerServiceBase {
    bridge: Bridge<IDrawer>;
    layers: import("vue").Ref<string[]>;
    visible: import("vue").Ref<boolean>;
    private detectEmpty;
    show(): void;
    close(): void;
    attachLayer(layerName: string, renderer: () => VNode): void;
    replaceLayer(layerName: string, renderer: () => VNode): void;
    detachLayer(): void;
    clearLayer(): void;
}
export declare const DrawerService: symbol;
export interface IDrawer {
    attachLayer: (name: string, renderer: () => VNode) => void;
    clearLayer: () => void;
    detachLayer: () => void;
}
export declare class DrawerServiceCore {
    left: DrawerServiceBase;
    right: DrawerServiceBase;
}
export {};
