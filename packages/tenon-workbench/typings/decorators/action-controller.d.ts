type ActionControllerType = (name: any, action: ActionType) => MethodDecorator;
export declare const ActionControllerKey: unique symbol;
export declare enum ActionType {
    onClick = "onClick",
    onActive = "onActive",
    onDeActive = "onDeActive"
}
export declare const ActionController: ActionControllerType;
export {};
