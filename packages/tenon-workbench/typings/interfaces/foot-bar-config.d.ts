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
export type FootBarItemType = IFootBarItem;
export type FootBarConfig = {
    config: FootBarItemType[];
};
