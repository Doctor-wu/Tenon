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
        headerBarConfig: HeaderBarConfig;
    }>;
    constructor(headerBarConfig: HeaderBarConfig);
    get headerBarConfig(): ({
        render: () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        name: string;
        type: IHeaderBarType.Info;
    } | {
        popupText?: string | undefined;
        iconName?: string | undefined;
        subConfigs?: any[] | undefined;
        render?: (() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>) | undefined;
        name: string;
        type: IHeaderBarType.Operator;
    })[];
    regisAction(name: any, action: string, cb: Function): void;
    emitAction(name: any, action: string, ...args: any[]): void;
    updateUIConfig(name: any, partial: Partial<IHeaderBarItem>): void;
}
