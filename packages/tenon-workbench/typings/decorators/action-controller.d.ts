declare type ActionControllerType = (name: any, action: ActionType) => MethodDecorator;
export declare const ActionControllerKey: unique symbol;
export declare enum ActionType {
    onClick = "onClick"
}
export declare const ActionController: ActionControllerType;
export {};
