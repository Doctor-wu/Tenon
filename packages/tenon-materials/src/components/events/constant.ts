export const TenonEventPrefix = 'tenon-event:';
export type TenonEvent<T extends string> = `${typeof TenonEventPrefix}${T}`;
export const createTenonEvent = <T extends string>(subName: T) => `${TenonEventPrefix}${subName}` as TenonEvent<T>;
