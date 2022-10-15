import { VNode } from "vue";
import { IconConfig } from "./icon";
export declare enum FootBarAlignment {
    Left = "Left",
    Right = "Right"
}
export interface IFootBarItem {
    name: any;
    alignment: FootBarAlignment;
    popupText: string;
    hidden?: boolean;
    icon?: IconConfig;
    text?: string;
    render?: () => VNode;
}
export declare type FootBarItemType = IFootBarItem;
export declare type FootBarConfig = {
    config: FootBarItemType[];
};
