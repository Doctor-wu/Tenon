import { FootBarItemType, HeaderBarItemType, ToolBarItemType } from "../configs";
export declare type HeaderBarControllerResult = Promise<Partial<HeaderBarItemType>>;
export declare type ToolBarControllerResult = Promise<Partial<ToolBarItemType>>;
export declare type FootBarControllerResult = Promise<Partial<FootBarItemType>>;
export declare const UIControllerKey: unique symbol;
export declare const HeaderBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<HeaderBarControllerResult>>) => void;
export declare const ToolBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<ToolBarControllerResult>>) => void;
export declare const FootBarController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<FootBarControllerResult>>) => void;
