export type arrayType<T extends any[]> = T extends (infer K)[] ? K : never;
