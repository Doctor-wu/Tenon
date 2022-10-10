/**
 * 使用 @Inject__Service时需要使用这个装饰器装饰方法
 */
export declare const ProvideService: MethodDecorator;
/**
 * 需要与 @ProvideService 搭配使用
 */
export declare const InjectBarService: () => (target: any, propertyKey: any, propertyIndex: any) => void;
/**
 * 需要与 @ProvideService 搭配使用
 */
export declare const InjectContextService: () => (target: any, propertyKey: any, propertyIndex: any) => void;
/**
 * 需要与 @ProvideService 搭配使用
 */
export declare const InjectEventEmitterService: () => (target: any, propertyKey: any, propertyIndex: any) => void;
/**
 * 需要与 @ProvideService 搭配使用
 */
export declare const InjectDIService: () => (target: any, propertyKey: any, propertyIndex: any) => void;
/**
 * 需要与 @ProvideService 搭配使用
 */
export declare const InjectActionInfoService: () => (target: any, propertyKey: any, propertyIndex: any) => void;
