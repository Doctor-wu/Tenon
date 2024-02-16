export type arrayType<T extends any[]> = T extends (infer K)[] ? K : never;

export declare type newable<A extends unknown[] = unknown[], R = unknown> = { new(...args: A): R };

export type Dict<T> = Record<string, T>;

export type Disposer = () => void;
