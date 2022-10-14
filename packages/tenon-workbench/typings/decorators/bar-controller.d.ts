import { IHeaderBarItem, ToolBarConfigType } from "../configs";
export declare type HeaderBarControllerResult = Promise<Partial<IHeaderBarItem>>;
export declare type ToolBarControllerResult = Promise<Partial<ToolBarConfigType>>;
export declare const UIControllerKey: unique symbol;
export declare const HeaderBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<HeaderBarControllerResult>>) => void;
export declare const ToolBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<ToolBarControllerResult>>) => void;
