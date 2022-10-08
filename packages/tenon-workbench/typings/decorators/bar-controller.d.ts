import { IHeaderBarItem, ToolBarConfigType } from "../configs";
export declare type UIControllerResult = Promise<Partial<IHeaderBarItem> | Partial<ToolBarConfigType>>;
export declare const UIControllerKey: unique symbol;
export declare const HeaderBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => void;
export declare const ToolBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => void;
