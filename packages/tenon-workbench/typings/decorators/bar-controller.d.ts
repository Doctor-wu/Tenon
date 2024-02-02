import { FootBarItemType, HeaderBarItemType, ToolBarItemType } from "../interfaces";
import { Ref, WatchSource } from "vue";
export type HeaderBarControllerResult = Promise<Partial<HeaderBarItemType>>;
export type ToolBarControllerResult = Promise<Partial<ToolBarItemType>>;
export type FootBarControllerResult = Promise<Partial<FootBarItemType>>;
export declare const UIControllerKey: unique symbol;
export declare const HeaderBarController: (name: any, deps?: Ref[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<HeaderBarControllerResult>>) => void;
export declare const ToolBarController: (name: any, deps?: WatchSource[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<ToolBarControllerResult>>) => void;
export declare const FootBarController: (name: any, deps?: Ref[]) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<(...args: any[]) => Promise<FootBarControllerResult>>) => void;
