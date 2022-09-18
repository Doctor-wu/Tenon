import { UnwrapNestedRefs, VNode } from "vue";
export declare type HeaderBarConfig = IHeaderBarItem[];
export declare enum IHeaderBarType {
    Info = "Info",
    Operator = "Operator"
}
export interface IHeaderBarBaseItem<BarType extends IHeaderBarType> {
    name: string;
    type: BarType;
}
export interface IHeaderBarInfoItem extends IHeaderBarBaseItem<IHeaderBarType.Info> {
    render: () => VNode;
}
export interface IHeaderBarOperatorItem extends IHeaderBarBaseItem<IHeaderBarType.Operator> {
    popupText?: string;
    iconName?: string;
    subConfigs?: IHeaderBarOperatorItem[];
    render?: () => VNode;
}
export declare type IHeaderBarItem = IHeaderBarInfoItem | IHeaderBarOperatorItem;
export declare class BarConfig {
    actionMap: Map<any, {
        [props: string]: Function[];
    }>;
    config: UnwrapNestedRefs<{
        headerBarConfig: any;
    }>;
    constructor(headerBarConfig: HeaderBarConfig);
    get headerBarConfig(): any;
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, ...args: any[]): void;
}
