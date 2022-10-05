import { IHeaderBarItem } from "../core";
export declare type UIControllerResult = Promise<Partial<IHeaderBarItem>>;
export declare const UIControllerKey: unique symbol;
export declare const UIController: (name: any) => (target: any, propertyKey: any, desc: TypedPropertyDescriptor<() => Promise<UIControllerResult>>) => void;
