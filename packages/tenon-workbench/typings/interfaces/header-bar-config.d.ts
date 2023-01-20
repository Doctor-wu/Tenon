import { VNode } from "vue";
import { IconConfig } from "./icon";
import { IListTree } from "./list-tree";
export declare enum HeaderBarType {
    Info = "Info",
    Operator = "Operator"
}
export interface IHeaderBarBaseItem<BarType extends HeaderBarType> {
    name: any;
    type: BarType;
    hidden?: boolean;
    disabled?: boolean;
    style?: Record<string, string | number>;
}
export interface IHeaderBarInfoItem extends IHeaderBarBaseItem<HeaderBarType.Info> {
    render: () => VNode;
}
export interface IHeaderBarOperatorItem extends IHeaderBarBaseItem<HeaderBarType.Operator> {
    popupText?: string;
    icon?: IconConfig;
    listTree?: IListTree[];
    render?: () => VNode;
}
export declare type HeaderBarItemType = IHeaderBarInfoItem | IHeaderBarOperatorItem;
export declare type HeaderBarConfig = {
    config: HeaderBarItemType[];
};
