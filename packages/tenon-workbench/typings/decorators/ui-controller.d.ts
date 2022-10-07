import { IHeaderBarItem, ToolBarConfigType } from "../configs";
export declare type UIControllerResult = Promise<Partial<IHeaderBarItem> | Partial<ToolBarConfigType>>;
export declare const UIControllerKey: unique symbol;
export declare const UIController: (name: any, bar: 'headerBarConfig' | 'toolBarConfig') => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => void;
