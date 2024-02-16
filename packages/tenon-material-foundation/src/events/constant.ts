export const TenonEventPrefix = 'tenon-event:';
export type TenonEvent<T extends string> = `${typeof TenonEventPrefix}${T}`;
export const createTenonEvent = <T extends string>(subName: T) => `${TenonEventPrefix}${subName}` as TenonEvent<T>;
// const TenonInternalEventPrefix = 'tenon-internal-event:';
// export type TenonInternalEvent<T extends string> = `${typeof TenonInternalEventPrefix}${T}`;
// export const createInternalTenonEvent = <T extends string>(subName: T) => `${TenonInternalEventPrefix}${subName}` as TenonInternalEvent<T>
