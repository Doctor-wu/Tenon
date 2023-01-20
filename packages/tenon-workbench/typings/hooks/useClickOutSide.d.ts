declare type clickOutSideGetter = (ev: MouseEvent) => boolean;
export declare const getClickOutSideByParentClassName: (cls: string) => clickOutSideGetter;
export declare const useClickOutSide: (isClickOutSide: clickOutSideGetter, cb: Function) => AbortController;
export {};
