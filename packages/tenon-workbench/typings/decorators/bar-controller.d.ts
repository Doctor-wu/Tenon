import { FootBarItemType, HeaderBarItemType, ToolBarItemType } from "../interfaces";
import { Ref } from "vue";
export declare type HeaderBarControllerResult = Promise<Partial<HeaderBarItemType>>;
export declare type ToolBarControllerResult = Promise<Partial<ToolBarItemType>>;
export declare type FootBarControllerResult = Promise<Partial<FootBarItemType>>;
export declare const UIControllerKey: unique symbol;
export declare const HeaderBarController: (name: any, deps?: Ref[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<HeaderBarControllerResult>>) => void;
export declare const ToolBarController: (name: any, deps?: Ref[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<ToolBarControllerResult>>) => void;
export declare const FootBarController: (name: any, deps?: Ref[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<FootBarControllerResult>>) => void;
