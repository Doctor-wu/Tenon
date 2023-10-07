import { VNode } from "vue";
import { IconConfig } from "./icon";
export declare enum FootBarAlignment {
    Left = "Left",
    Right = "Right"
}
export interface IFootBarItem {
    name: any;
    alignment: FootBarAlignment;
    popupText: string | ((config: IFootBarItem) => string);
    hidden?: boolean;
    icon?: IconConfig;
    text?: string;
    disabled?: boolean;
    render?: () => VNode;
}
export declare type FootBarItemType = IFootBarItem;
export declare type FootBarConfig = {
    config: FootBarItemType[];
};
