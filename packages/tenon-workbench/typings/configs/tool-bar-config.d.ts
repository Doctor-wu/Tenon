import { VNode } from "vue";
import { IListTree } from "./header-bar-config";
export interface IToolBarBaseConfig {
    name: any;
    flag: number;
    text?: string;
    hidden?: boolean;
    disabled?: boolean;
    popupText?: string;
    icon?: IToolBarIconConfig;
}
export interface IToolBarIconConfig {
    iconName?: string;
    iconRender?: () => VNode;
    iconSize?: number;
}
export interface IToolBarSwitchConfig extends IToolBarBaseConfig {
    switchStatus?: boolean;
}
export interface IToolBarButtonConfig extends IToolBarBaseConfig {
}
export interface IToolBarDropDownConfig extends IToolBarBaseConfig {
    listTree?: IListTree[];
    dropDownRender?: () => VNode;
    dropDownWidth?: string;
}
export declare type ToolBarConfigType = IToolBarButtonConfig & IToolBarSwitchConfig & IToolBarDropDownConfig;
export declare type ToolBarConfig = {
    config: ToolBarConfigType[][];
    alignment: 'left' | 'center' | 'right';
};
export declare const ToolBarFlag: {
    /** 开关作用 */
    Switch: number;
    /** 按钮作用 */
    Button: number;
    /** 下拉列表作用 */
    DropDown: number;
};
